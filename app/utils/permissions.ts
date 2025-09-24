import { User } from 'firebase/auth';
import { UserData, ExtendedUserData, UserLimits, ReadOnlyCaseMetadata } from '~/types';
import paths from '~/config/config.json';
import { getUserApiKey } from './auth';

const USER_WORKER_URL = paths.user_worker_url;
const MAX_CASES_REVIEW = paths.max_cases_review;
const MAX_FILES_PER_CASE_REVIEW = paths.max_files_per_case_review;

export interface UserUsage {
  currentCases: number;
  currentFiles: number;
}

export interface UserSessionValidation {
  valid: boolean;
  reason?: string;
}

export interface PermissionResult {
  allowed: boolean;
  reason?: string;
}

export interface CaseMetadata {
  caseNumber: string;
  createdAt: string;
}

/**
 * Get user data from KV store
 */
export const getUserData = async (user: User): Promise<UserData | null> => {
  try {
    const apiKey = await getUserApiKey();
    const response = await fetch(`${USER_WORKER_URL}/${user.uid}`, {
      method: 'GET',
      headers: {
        'X-Custom-Auth-Key': apiKey
      }
    });

    if (response.ok) {
      return await response.json() as UserData;
    }
    
    if (response.status === 404) {
      return null; // User not found
    }
    
    throw new Error('Failed to fetch user data');
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Get user limits based on their permission status
 */
export const getUserLimits = (userData: UserData): UserLimits => {
  if (userData.permitted) {
    return {
      maxCases: Infinity, // No limit for permitted users
      maxFilesPerCase: Infinity // No limit for permitted users
    };
  } else {
    return {
      maxCases: MAX_CASES_REVIEW, // Use config value for review users
      maxFilesPerCase: MAX_FILES_PER_CASE_REVIEW // Use config value for review users
    };
  }
};

/**
 * Get current usage counts for a user
 */
export const getUserUsage = async (user: User): Promise<UserUsage> => {
  try {
    const userData = await getUserData(user);
    if (!userData) {
      return { currentCases: 0, currentFiles: 0 };
    }

    const currentCases = userData.cases?.length || 0;
    
    // If we need file count for a specific case, we'd need to fetch that from the data worker
    // For now, we'll return 0 as we'll check this in the specific upload function
    const currentFiles = 0;

    return {
      currentCases,
      currentFiles
    };
  } catch (error) {
    console.error('Error getting user usage:', error);
    return { currentCases: 0, currentFiles: 0 };
  }
};

/**
 * Create a new user in the KV store
 */
export const createUser = async (
  user: User, 
  firstName: string, 
  lastName: string, 
  company: string,
  permitted: boolean = false
): Promise<UserData> => {
  try {
    const userData: UserData = {
      uid: user.uid,
      email: user.email,
      firstName,
      lastName,
      company,
      permitted,
      cases: [],
      readOnlyCases: [],
      createdAt: new Date().toISOString()
    };

    const apiKey = await getUserApiKey();
    const response = await fetch(`${USER_WORKER_URL}/${user.uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Auth-Key': apiKey
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create user data: ${response.status} ${response.statusText}`);
    }

    return userData;
  } catch (error) {
    console.error('Error creating user data:', error);
    throw error;
  }
};

/**
 * Check if user can create a new case
 */
export const canCreateCase = async (user: User): Promise<{ canCreate: boolean; reason?: string }> => {
  try {
    const userData = await getUserData(user);
    if (!userData) {
      return { canCreate: true }; // New users can create their first case
    }

    const limits = getUserLimits(userData);
    const usage = await getUserUsage(user);

    if (usage.currentCases >= limits.maxCases) {
      return {
        canCreate: false,
        reason: `Read-Only Account: Case creation disabled`
      };
    }

    return { canCreate: true };
  } catch (error) {
    console.error('Error checking case creation permission:', error);
    return { canCreate: false, reason: 'Unable to verify permissions. Please try again.' };
  }
};

/**
 * Check if user can upload a file to a case
 */
export const canUploadFile = async (user: User, currentFileCount: number): Promise<{ canUpload: boolean; reason?: string }> => {
  try {
    const userData = await getUserData(user);
    if (!userData) {
      return { canUpload: false, reason: 'User data not found.' };
    }

    const limits = getUserLimits(userData);

    if (currentFileCount >= limits.maxFilesPerCase) {
      return {
        canUpload: false,
        reason: `Read-Only Account: File uploads disabled`
      };
    }

    return { canUpload: true };
  } catch (error) {
    console.error('Error checking file upload permission:', error);
    return { canUpload: false, reason: 'Unable to verify permissions. Please try again.' };
  }
};

/**
 * Get a user-friendly description of their current limits
 */
export const getLimitsDescription = async (user: User): Promise<string> => {
  try {
    const userData = await getUserData(user);
    if (!userData) {
      return `Account limits: ${MAX_CASES_REVIEW} case, ${MAX_FILES_PER_CASE_REVIEW} files per case`;
    }

    const limits = getUserLimits(userData);
    
    if (userData.permitted) {
      return '';
    } else {
      return `Read-Only Account: Case review only.`;
    }
  } catch (error) {
    console.error('Error getting limits description:', error);
    return 'Unable to determine account limits';
  }
};

// ============================================================================
// ENHANCED CENTRALIZED FUNCTIONS
// ============================================================================

/**
 * Validate user session with comprehensive checks
 * Ensures user exists, has valid authentication, and passes basic security checks
 */
export const validateUserSession = async (user: User): Promise<UserSessionValidation> => {
  try {
    // Basic user object validation
    if (!user || !user.uid) {
      return { valid: false, reason: 'Invalid user session: No user ID' };
    }

    if (!user.email) {
      return { valid: false, reason: 'Invalid user session: No email address' };
    }

    // Check if user data exists in the system
    const userData = await getUserData(user);
    if (!userData) {
      return { valid: false, reason: 'User not found in system database' };
    }

    // Verify email consistency
    if (userData.email !== user.email) {
      return { valid: false, reason: 'Email mismatch between session and database' };
    }

    return { valid: true };
    
  } catch (error) {
    console.error('Error validating user session:', error);
    return { valid: false, reason: 'Session validation failed due to system error' };
  }
};

/**
 * Centralized user data update with built-in API key management and validation
 * Handles all user data modifications through a single secure interface
 */
export const updateUserData = async (user: User, updates: Partial<UserData>): Promise<UserData> => {
  try {
    // Validate user session first
    const sessionValidation = await validateUserSession(user);
    if (!sessionValidation.valid) {
      throw new Error(`Session validation failed: ${sessionValidation.reason}`);
    }

    // Get current user data
    const currentUserData = await getUserData(user);
    if (!currentUserData) {
      throw new Error('Cannot update user data: User not found');
    }

    // Merge updates with current data
    const updatedUserData = {
      ...currentUserData,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Perform the update with API key management
    const apiKey = await getUserApiKey();
    const response = await fetch(`${USER_WORKER_URL}/${user.uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Auth-Key': apiKey
      },
      body: JSON.stringify(updatedUserData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update user data: ${response.status} - ${errorText}`);
    }

    return await response.json() as UserData;
    
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

/**
 * Get user's cases with centralized error handling and API key management
 */
export const getUserCases = async (user: User): Promise<CaseMetadata[]> => {
  try {
    const userData = await getUserData(user);
    if (!userData || !userData.cases) {
      return [];
    }

    return userData.cases;
    
  } catch (error) {
    console.error('Error fetching user cases:', error);
    return [];
  }
};

/**
 * Get user's read-only cases with centralized error handling
 */
export const getUserReadOnlyCases = async (user: User): Promise<ReadOnlyCaseMetadata[]> => {
  try {
    const userData = await getUserData(user) as ExtendedUserData;
    if (!userData || !userData.readOnlyCases) {
      return [];
    }

    return userData.readOnlyCases;
    
  } catch (error) {
    console.error('Error fetching user read-only cases:', error);
    return [];
  }
};

/**
 * Check if user has permitted status with caching and error handling
 */
export const isUserPermitted = async (user: User): Promise<boolean> => {
  try {
    const userData = await getUserData(user);
    return userData?.permitted || false;
    
  } catch (error) {
    console.error('Error checking user permitted status:', error);
    return false; // Fail closed for security
  }
};

/**
 * Check if user can access a specific case (either owned or read-only)
 */
export const canAccessCase = async (user: User, caseNumber: string): Promise<PermissionResult> => {
  try {
    // Validate inputs
    if (!caseNumber || typeof caseNumber !== 'string') {
      return { allowed: false, reason: 'Invalid case number provided' };
    }

    // Validate user session
    const sessionValidation = await validateUserSession(user);
    if (!sessionValidation.valid) {
      return { allowed: false, reason: sessionValidation.reason };
    }

    const userData = await getUserData(user);
    if (!userData) {
      return { allowed: false, reason: 'User data not found' };
    }

    // Check owned cases
    if (userData.cases && userData.cases.some(c => c.caseNumber === caseNumber)) {
      return { allowed: true };
    }

    // Check read-only cases
    const extendedUserData = userData as ExtendedUserData;
    if (extendedUserData.readOnlyCases && extendedUserData.readOnlyCases.some(c => c.caseNumber === caseNumber)) {
      return { allowed: true };
    }

    return { allowed: false, reason: 'Case not found in user access list' };
    
  } catch (error) {
    console.error('Error checking case access permission:', error);
    return { allowed: false, reason: 'Permission check failed due to system error' };
  }
};

/**
 * Check if user can modify a specific case (only owned cases, not read-only)
 */
export const canModifyCase = async (user: User, caseNumber: string): Promise<PermissionResult> => {
  try {
    // Validate inputs
    if (!caseNumber || typeof caseNumber !== 'string') {
      return { allowed: false, reason: 'Invalid case number provided' };
    }

    // Check if user is permitted to make modifications
    const isPermitted = await isUserPermitted(user);
    if (!isPermitted) {
      return { allowed: false, reason: 'Read-Only Account: Modifications not allowed' };
    }

    // Check if user owns the case
    const userData = await getUserData(user);
    if (!userData || !userData.cases) {
      return { allowed: false, reason: 'User has no cases' };
    }

    const ownedCase = userData.cases.find(c => c.caseNumber === caseNumber);
    if (!ownedCase) {
      return { allowed: false, reason: 'Case not found in owned cases' };
    }

    return { allowed: true };
    
  } catch (error) {
    console.error('Error checking case modification permission:', error);
    return { allowed: false, reason: 'Permission check failed due to system error' };
  }
};

/**
 * Higher-order function for consistent error handling in user data operations
 * Wraps operations with session validation and standardized error patterns
 */
export const withUserDataOperation = <T>(
  operation: (userData: UserData, user: User) => Promise<T>
) => async (user: User): Promise<T> => {
  try {
    // Validate user session
    const sessionValidation = await validateUserSession(user);
    if (!sessionValidation.valid) {
      throw new Error(`Operation failed: ${sessionValidation.reason}`);
    }

    // Get user data
    const userData = await getUserData(user);
    if (!userData) {
      throw new Error('Operation failed: User data not found');
    }

    // Execute the operation
    return await operation(userData, user);
    
  } catch (error) {
    console.error('User data operation failed:', error);
    throw error;
  }
};

/**
 * Add a case to user's case list with validation and conflict checking
 */
export const addUserCase = async (user: User, caseData: CaseMetadata): Promise<void> => {
  try {
    const userData = await getUserData(user);
    if (!userData) {
      throw new Error('Cannot add case: User data not found');
    }

    // Initialize cases array if it doesn't exist
    if (!userData.cases) {
      userData.cases = [];
    }

    // Check for duplicate case numbers
    const existingCase = userData.cases.find(c => c.caseNumber === caseData.caseNumber);
    if (existingCase) {
      throw new Error(`Case ${caseData.caseNumber} already exists`);
    }

    // Add the new case
    userData.cases.push(caseData);

    // Update user data
    await updateUserData(user, { cases: userData.cases });
    
  } catch (error) {
    console.error('Error adding case to user:', error);
    throw error;
  }
};

/**
 * Remove a case from user's case list with validation
 */
export const removeUserCase = async (user: User, caseNumber: string): Promise<void> => {
  try {
    const userData = await getUserData(user);
    if (!userData || !userData.cases) {
      throw new Error('Cannot remove case: No cases found');
    }

    // Find and remove the case
    const filteredCases = userData.cases.filter(c => c.caseNumber !== caseNumber);
    
    if (filteredCases.length === userData.cases.length) {
      throw new Error(`Case ${caseNumber} not found`);
    }

    // Update user data
    await updateUserData(user, { cases: filteredCases });
    
  } catch (error) {
    console.error('Error removing case from user:', error);
    throw error;
  }
};