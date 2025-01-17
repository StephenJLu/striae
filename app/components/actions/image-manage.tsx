import { User } from 'firebase/auth';
import paths from '~/config/config.json';
import { 
  getImageApiKey,
  getDataApiKey,
  getAccountHash 
} from '~/utils/auth';

const WORKER_URL = paths.data_worker_url;
const IMAGE_URL = paths.image_worker_url;


interface CaseData {
    files?: FileData[];
    [key: string]: unknown;
  }
interface FileData {
  id: string;
  originalFilename: string;
  uploadedAt: string;
}

interface ApiResponse {
  files: FileData[];
}

interface ImageUploadResponse {
  success: boolean;
  result: {
    id: string;
  };
}

export const fetchFiles = async (user: User, caseNumber: string): Promise<FileData[]> => {
  const apiKey = await getDataApiKey();
  const response = await fetch(`${WORKER_URL}/${user.uid}/${caseNumber}/data.json`, {
    headers: { 'X-Custom-Auth-Key': apiKey }
  });
  const data = (await response.json()) as ApiResponse;
  return data.files || [];
};

export const uploadFile = async (
  user: User, 
  caseNumber: string, 
  file: File, 
  onProgress?: (progress: number) => void
): Promise<FileData> => {
  const imagesApiToken = await getImageApiKey();
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', async () => {
      if (xhr.status === 200) {
        try {
          const imageData = JSON.parse(xhr.responseText) as ImageUploadResponse;
          if (!imageData.success) throw new Error('Upload failed');

          const newFile: FileData = {
            id: imageData.result.id,
            originalFilename: file.name,
            uploadedAt: new Date().toISOString()
          };

          // Update case data
          const apiKey = await getDataApiKey();
          const response = await fetch(`${WORKER_URL}/${user.uid}/${caseNumber}/data.json`, {
            headers: { 'X-Custom-Auth-Key': apiKey }
          });
          const existingData = await response.json() as CaseData;

          const updatedData = {
            ...existingData,
            files: [...(existingData.files || []), newFile]
          };

          await fetch(`${WORKER_URL}/${user.uid}/${caseNumber}/data.json`, {
            method: 'PUT',
            headers: {
              'X-Custom-Auth-Key': apiKey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          });

          resolve(newFile);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Upload failed'));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Upload failed')));

    xhr.open('POST', IMAGE_URL);
    xhr.setRequestHeader('Authorization', `Bearer ${imagesApiToken}`);
    xhr.send(formData);
  });
};

export const deleteFile = async (user: User, caseNumber: string, fileId: string): Promise<void> => {
  const imagesApiToken = await getImageApiKey();
  await fetch(`${IMAGE_URL}/${fileId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${imagesApiToken}`
    }
  });

  const apiKey = await getDataApiKey();
  
  // Get full case data
  const response = await fetch(`${WORKER_URL}/${user.uid}/${caseNumber}/data.json`, {
    headers: { 'X-Custom-Auth-Key': apiKey }
  });
  const existingData = await response.json() as CaseData;

  // Create updated data preserving existing fields

  const updatedData: CaseData = {
    ...existingData,
    files: (existingData.files || []).filter((f: FileData) => f.id !== fileId)
  };

  await fetch(`${WORKER_URL}/${user.uid}/${caseNumber}/data.json`, {
    method: 'PUT', 
    headers: {
      'X-Custom-Auth-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  });
};

/**
 * Get signed image URL from Image Delivery service
 */

const DEFAULT_VARIANT = 'striae';
interface ImageDeliveryConfig {
  accountHash: string;
}

const getImageConfig = async (): Promise<ImageDeliveryConfig> => {
  const accountHash = await getAccountHash();
  return { accountHash };
};


export const getImageUrl = async (fileData: FileData): Promise<string> => {
  const { accountHash } = await getImageConfig();  
  const imagesApiToken = await getImageApiKey();
  const imageDeliveryUrl = `https://imagedelivery.net/${accountHash}/${fileData.id}/${DEFAULT_VARIANT}`;
  
  const workerResponse = await fetch(`${IMAGE_URL}/${imageDeliveryUrl}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${imagesApiToken}`,
      'Accept': 'text/plain'
    }
  });
  
  if (!workerResponse.ok) throw new Error('Failed to get signed image URL');
  
  const signedUrl = await workerResponse.text();
  if (!signedUrl.includes('sig=') || !signedUrl.includes('exp=')) {
    throw new Error('Invalid signed URL returned');
  }
  
  return signedUrl;
};