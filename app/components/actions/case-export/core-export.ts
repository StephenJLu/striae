import { User } from 'firebase/auth';
import { AnnotationData, CaseExportData, AllCasesExportData, ExportOptions } from '~/types';
import { fetchFiles } from '../image-manage';
import { getNotes } from '../notes-manage';
import { checkExistingCase, validateCaseNumber, listCases } from '../case-manage';
import { getUserExportMetadata } from './metadata-helpers';

/**
 * Export all cases for a user
 */
export async function exportAllCases(
  user: User,
  options: ExportOptions = {},
  onProgress?: (current: number, total: number, caseName: string) => void
): Promise<AllCasesExportData> {
  const {
    includeMetadata = true
  } = options;

  try {
    // Get user export metadata
    const userMetadata = await getUserExportMetadata(user);
    
    // Get list of all cases for the user
    const caseNumbers = await listCases(user);
    
    if (!caseNumbers || caseNumbers.length === 0) {
      throw new Error('No cases found for user');
    }

    const exportedCases: CaseExportData[] = [];
    let totalFiles = 0;
    let totalAnnotations = 0;
    let totalConfirmations = 0;
    let totalConfirmationsRequested = 0;
    let casesWithFiles = 0;
    let casesWithAnnotations = 0;
    let casesWithoutFiles = 0;
    let lastModified: string | undefined;
    let earliestAnnotationDate: string | undefined;
    let latestAnnotationDate: string | undefined;

    // Export each case
    for (let i = 0; i < caseNumbers.length; i++) {
      const caseNumber = caseNumbers[i];
      
      // Report progress
      if (onProgress) {
        onProgress(i + 1, caseNumbers.length, caseNumber);
      }

      try {
        const caseExport = await exportCaseData(user, caseNumber, options);
        exportedCases.push(caseExport);

        // Update totals
        totalFiles += caseExport.metadata.totalFiles;
        
        if (caseExport.metadata.totalFiles > 0) {
          casesWithFiles++;
        } else {
          casesWithoutFiles++;
        }

        // Count annotations and confirmations
        const caseAnnotations = caseExport.files.filter(f => f.hasAnnotations).length;
        if (caseAnnotations > 0) {
          casesWithAnnotations++;
          totalAnnotations += caseAnnotations;
        }

        // Count confirmations
        if (caseExport.summary?.filesWithConfirmations) {
          totalConfirmations += caseExport.summary.filesWithConfirmations;
        }
        if (caseExport.summary?.filesWithConfirmationsRequested) {
          totalConfirmationsRequested += caseExport.summary.filesWithConfirmationsRequested;
        }

        // Track latest modification
        if (caseExport.summary?.lastModified) {
          if (!lastModified || caseExport.summary.lastModified > lastModified) {
            lastModified = caseExport.summary.lastModified;
          }
        }

        // Track annotation date range across all cases
        if (caseExport.summary?.earliestAnnotationDate) {
          if (!earliestAnnotationDate || caseExport.summary.earliestAnnotationDate < earliestAnnotationDate) {
            earliestAnnotationDate = caseExport.summary.earliestAnnotationDate;
          }
        }
        if (caseExport.summary?.latestAnnotationDate) {
          if (!latestAnnotationDate || caseExport.summary.latestAnnotationDate > latestAnnotationDate) {
            latestAnnotationDate = caseExport.summary.latestAnnotationDate;
          }
        }

      } catch (error) {
        // Get case creation date even for failed exports
        let caseCreatedDate = new Date().toISOString(); // fallback
        try {
          const existingCase = await checkExistingCase(user, caseNumber);
          if (existingCase?.createdAt) {
            caseCreatedDate = existingCase.createdAt;
          }
        } catch {
          // Use fallback date if case lookup fails
        }

        // Create a placeholder entry for failed exports
        exportedCases.push({
          metadata: {
            caseNumber,
            caseCreatedDate,
            exportDate: new Date().toISOString(),
            ...userMetadata,
            striaeExportSchemaVersion: '1.0',
            totalFiles: 0
          },
          files: [],
          summary: {
            filesWithAnnotations: 0,
            filesWithoutAnnotations: 0,
            totalBoxAnnotations: 0,
            exportError: error instanceof Error ? error.message : 'Unknown error'
          }
        });
        casesWithoutFiles++;
      }
    }

    const allCasesExport: AllCasesExportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        ...userMetadata,
        striaeExportSchemaVersion: '1.0',
        totalCases: caseNumbers.length,
        totalFiles,
        totalAnnotations,
        totalConfirmations,
        totalConfirmationsRequested
      },
      cases: exportedCases
    };

    if (includeMetadata) {
      allCasesExport.summary = {
        casesWithFiles,
        casesWithAnnotations,
        casesWithoutFiles,
        lastModified,
        earliestAnnotationDate,
        latestAnnotationDate
      };
    }

    // Report completion
    if (onProgress) {
      onProgress(caseNumbers.length, caseNumbers.length, 'Export completed!');
    }
    
    return allCasesExport;

  } catch (error) {
    console.error('Export all cases failed:', error);
    throw new Error(`Failed to export all cases: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Export case data with files and annotations
 */
export async function exportCaseData(
  user: User,
  caseNumber: string,
  options: ExportOptions = {}
): Promise<CaseExportData> {
  const {
    includeMetadata = true
  } = options;

  // Get user export metadata
  const userMetadata = await getUserExportMetadata(user);

  // Validate case number format
  if (!validateCaseNumber(caseNumber)) {
    throw new Error('Invalid case number format');
  }

  // Check if case exists
  const existingCase = await checkExistingCase(user, caseNumber);
  if (!existingCase) {
    throw new Error(`Case "${caseNumber}" does not exist`);
  }

  try {
    // Fetch all files for the case
    const files = await fetchFiles(user, caseNumber);
    
    if (!files || files.length === 0) {
      throw new Error(`No files found for case: ${caseNumber}`);
    }

    // Collect file data with annotations
    const filesWithAnnotations: CaseExportData['files'] = [];
    let filesWithAnnotationsCount = 0;
    let totalBoxAnnotations = 0;
    let filesWithConfirmationsCount = 0;
    let filesWithConfirmationsRequestedCount = 0;
    let lastModified: string | undefined;
    let earliestAnnotationDate: string | undefined;
    let latestAnnotationDate: string | undefined;

    for (const file of files) {
      let annotations: AnnotationData | undefined;
      let hasAnnotations = false;

      try {
        annotations = await getNotes(user, caseNumber, file.id) || undefined;
        
        // Check if file has any annotation data beyond just defaults
        hasAnnotations = !!(annotations && (
          annotations.additionalNotes ||
          annotations.classNote ||
          annotations.customClass ||
          annotations.leftCase ||
          annotations.rightCase ||
          annotations.leftItem ||
          annotations.rightItem ||
          annotations.supportLevel ||
          annotations.classType ||
          (annotations.boxAnnotations && annotations.boxAnnotations.length > 0)
        ));

        if (hasAnnotations) {
          filesWithAnnotationsCount++;
          if (annotations?.boxAnnotations) {
            totalBoxAnnotations += annotations.boxAnnotations.length;
          }
          
          // Track confirmation data
          if (annotations?.confirmationData) {
            filesWithConfirmationsCount++;
          }
        }
        
        // Track confirmation requests separately (regardless of other annotations)
        if (annotations?.includeConfirmation) {
          filesWithConfirmationsRequestedCount++;
        }
          
        // Track last modified (only for files with annotations)
        if (hasAnnotations && annotations?.updatedAt) {
          if (!lastModified || annotations.updatedAt > lastModified) {
            lastModified = annotations.updatedAt;
          }
          
          // Track annotation date range
          if (!earliestAnnotationDate || annotations.updatedAt < earliestAnnotationDate) {
            earliestAnnotationDate = annotations.updatedAt;
          }
          if (!latestAnnotationDate || annotations.updatedAt > latestAnnotationDate) {
            latestAnnotationDate = annotations.updatedAt;
          }
        }
      } catch (error) {
        // Continue without annotations for this file
      }

      filesWithAnnotations.push({
        fileData: file,
        annotations,
        hasAnnotations
      });
    }

    // Build export data
    const exportData: CaseExportData = {
      metadata: {
        caseNumber,
        caseCreatedDate: existingCase.createdAt,
        exportDate: new Date().toISOString(),
        ...userMetadata,
        striaeExportSchemaVersion: '1.0',
        totalFiles: files.length
      },
      files: filesWithAnnotations,
      ...(includeMetadata && {
        summary: {
          filesWithAnnotations: filesWithAnnotationsCount,
          filesWithoutAnnotations: files.length - filesWithAnnotationsCount,
          totalBoxAnnotations,
          filesWithConfirmations: filesWithConfirmationsCount,
          filesWithConfirmationsRequested: filesWithConfirmationsRequestedCount,
          lastModified,
          earliestAnnotationDate,
          latestAnnotationDate
        }
      })
    };

    return exportData;

  } catch (error) {
    console.error('Case export failed:', error);
    throw new Error(`Failed to export case ${caseNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}