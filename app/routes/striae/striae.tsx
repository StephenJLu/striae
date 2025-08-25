import { User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Sidebar } from '~/components/sidebar/sidebar';
import { Toolbar } from '~/components/toolbar/toolbar';
import { Canvas } from '~/components/canvas/canvas';
import { getImageUrl } from '~/components/actions/image-manage';
import { getNotes } from '~/components/actions/notes-manage';
import { getUserApiKey } from '~/utils/auth';
import paths from '~/config/config.json';
import styles from './striae.module.css';

interface StriaePage {
  user: User;    
}

interface FileData {
  id: string;
  originalFilename: string;
  uploadedAt: string;
}

interface AnnotationData {
  leftCase: string;
  rightCase: string;
  leftItem: string;
  rightItem: string;
  caseFontColor: string;
  classType: 'Bullet' | 'Cartridge Case' | 'Other';
  customClass?: string;
  classNote: string;
  indexType: 'number' | 'color';
  indexNumber?: string;
  indexColor?: string;
  supportLevel: 'ID' | 'Exclusion' | 'Inconclusive';
  hasSubclass?: boolean;
  additionalNotes: string;
}

export const Striae = ({ user }: StriaePage) => {
  // Image and error states
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedFilename, setSelectedFilename] = useState<string>();
  const [imageId, setImageId] = useState<string>();
  const [error, setError] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState(false);

  // User states
  const [userCompany, setUserCompany] = useState<string>('');
  const [userFirstName, setUserFirstName] = useState<string>('');

  // Case management states - All managed here
  const [currentCase, setCurrentCase] = useState<string>('');
  const [files, setFiles] = useState<FileData[]>([]);
  const [caseNumber, setCaseNumber] = useState('');
  const [successAction, setSuccessAction] = useState<'loaded' | 'created' | 'deleted' | null>(null);
  const [showNotes, setShowNotes] = useState(false);

  // Annotation states
  const [activeAnnotations, setActiveAnnotations] = useState<Set<string>>(new Set());
  const [annotationData, setAnnotationData] = useState<AnnotationData | null>(null);
  const [annotationRefreshTrigger, setAnnotationRefreshTrigger] = useState(0);


   useEffect(() => {
    // Set clear.jpg when case changes or is cleared
    setSelectedImage('/clear.jpg');
    setError(undefined);
    setImageLoaded(false);
  }, [currentCase]);

  // Fetch user company data when component mounts
  useEffect(() => {
    const fetchUserCompany = async () => {
      try {
        const apiKey = await getUserApiKey();
        const response = await fetch(`${paths.user_worker_url}/${user.uid}`, {
          headers: {
            'X-Custom-Auth-Key': apiKey
          }
        });
        
        if (response.ok) {
          const userData = await response.json() as { company?: string; firstName?: string };
          setUserCompany(userData.company || '');
          setUserFirstName(userData.firstName || '');
        }
      } catch (err) {
        console.error('Failed to load user company:', err);
      }
    };
    
    if (user?.uid) {
      fetchUserCompany();
    }
  }, [user?.uid]);

  const handleCaseChange = (caseNumber: string) => {
    setCurrentCase(caseNumber);
    setAnnotationData(null);
  };

  // Handler for toolbar annotation selection
  const handleToolSelect = (toolId: string, active: boolean) => {
    setActiveAnnotations(prev => {
      const next = new Set(prev);
      if (active) {
        next.add(toolId);
      } else {
        next.delete(toolId);
      }
      return next;
    });
  };  

  // Function to refresh annotation data (called when notes are saved)
  const refreshAnnotationData = () => {
    setAnnotationRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    // Cleanup function to clear image when component unmounts
    return () => {
      setSelectedImage(undefined);
      setSelectedFilename(undefined);
      setError(undefined);
      setImageLoaded(false);
    };
  }, []); // Empty dependency array means this runs only on mount/unmount

  // Load annotation data when imageId changes
  useEffect(() => {
    const loadAnnotationData = async () => {
      if (!imageId || !currentCase) {
        setAnnotationData(null);
        return;
      }

      try {
        const notes = await getNotes(user, currentCase, imageId);
        if (notes) {
          setAnnotationData({
            leftCase: notes.leftCase || '',
            rightCase: notes.rightCase || '',
            leftItem: notes.leftItem || '',
            rightItem: notes.rightItem || '',
            caseFontColor: notes.caseFontColor || '#FFDE21',
            classType: notes.classType || 'Other',
            customClass: notes.customClass,
            classNote: notes.classNote || '',
            indexType: notes.indexType || 'number',
            indexNumber: notes.indexNumber,
            indexColor: notes.indexColor,
            supportLevel: notes.supportLevel || 'Inconclusive',
            hasSubclass: notes.hasSubclass,
            additionalNotes: notes.additionalNotes || ''
          });
        } else {
          setAnnotationData(null);
        }
      } catch (error) {
        console.error('Failed to load annotation data:', error);
        setAnnotationData(null);
      }
    };

    loadAnnotationData();
  }, [imageId, currentCase, user, annotationRefreshTrigger]);


  const handleImageSelect = async (file: FileData) => {  
  if (file?.id === 'clear') {
    setSelectedImage('/clear.jpg');
    setSelectedFilename(undefined);
    setImageId(undefined);
    setImageLoaded(false);
    setAnnotationData(null);
    setError(undefined);
    return;
  }

  if (!file?.id) {
    setError('Invalid file selected');
    return;
  }

  try {
      setError(undefined);
      setSelectedImage(undefined);
      setSelectedFilename(undefined);
      setImageLoaded(false);
    
    const signedUrl = await getImageUrl(file);
    if (!signedUrl) throw new Error('No URL returned');

    setSelectedImage(signedUrl);
      setSelectedFilename(file.originalFilename);
      setImageId(file.id); 
      setImageLoaded(true);

  } catch (err) {
    setError('Failed to load image. Please try again.');
    console.error('Image selection error:', err);
    setSelectedImage(undefined);
    setSelectedFilename(undefined);
  }
};

  return (
    <div className={styles.appContainer}>
     <Sidebar 
        user={user} 
        onImageSelect={handleImageSelect}
        imageId={imageId}
        onCaseChange={handleCaseChange}
        currentCase={currentCase}
        setCurrentCase={setCurrentCase}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        files={files}
        setFiles={setFiles}
        caseNumber={caseNumber}
        setCaseNumber={setCaseNumber}
        error={error ?? ''}
        setError={setError}
        successAction={successAction}
        setSuccessAction={setSuccessAction}
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        onAnnotationRefresh={refreshAnnotationData}
      />
      <main className={styles.mainContent}>
        <div className={styles.canvasArea}>
          <div className={styles.toolbarWrapper}>
            <Toolbar 
              onToolSelect={handleToolSelect}              
            />
          </div>
          <Canvas 
            imageUrl={selectedImage} 
            filename={selectedFilename}
            company={userCompany}
            firstName={userFirstName}
            error={error ?? ''}
            activeAnnotations={activeAnnotations}
            annotationData={annotationData}
          />
        </div>
      </main>
    </div>
  );
};