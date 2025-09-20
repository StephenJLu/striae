import { useState, useCallback } from 'react';
import { BoxAnnotation } from '~/types';
import styles from './box-annotations.module.css';

interface BoxAnnotationsProps {
  imageRef: React.RefObject<HTMLImageElement | null>;
  annotations: BoxAnnotation[];
  onAnnotationsChange: (annotations: BoxAnnotation[]) => void;
  isAnnotationMode: boolean;
  annotationColor: string;
  className?: string;
}

interface DrawingState {
  isDrawing: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

interface LabelDialogState {
  isVisible: boolean;
  annotationId: string | null;
  x: number;
  y: number;
  label: string;
}

export const BoxAnnotations = ({
  imageRef,
  annotations,
  onAnnotationsChange,
  isAnnotationMode,
  annotationColor,
  className
}: BoxAnnotationsProps) => {
  const [drawingState, setDrawingState] = useState<DrawingState>({
    isDrawing: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  });

  const [labelDialog, setLabelDialog] = useState<LabelDialogState>({
    isVisible: false,
    annotationId: null,
    x: 0,
    y: 0,
    label: ''
  });

  // Get relative coordinates from mouse event
  const getRelativeCoordinates = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current) return { x: 0, y: 0 };
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    return { x, y };
  }, [imageRef]);

  // Handle mouse down - start drawing
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start drawing if in annotation mode and not clicking on an existing box
    if (!isAnnotationMode || !imageRef.current) return;
    
    // Check if clicking on an existing annotation
    const target = e.target as HTMLElement;
    if (target.classList.contains(styles.savedAnnotationBox)) {
      return; // Don't start drawing if clicking on an existing box
    }
    
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = getRelativeCoordinates(e);
    
    setDrawingState({
      isDrawing: true,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y
    });
  }, [isAnnotationMode, getRelativeCoordinates, imageRef]);

  // Handle mouse move - update current drawing box
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drawingState.isDrawing || !isAnnotationMode) return;
    
    e.preventDefault();
    const { x, y } = getRelativeCoordinates(e);
    
    setDrawingState(prev => ({
      ...prev,
      currentX: x,
      currentY: y
    }));
  }, [drawingState.isDrawing, isAnnotationMode, getRelativeCoordinates]);

  // Handle mouse up - complete drawing and save annotation
  const handleMouseUp = useCallback(() => {
    if (!drawingState.isDrawing || !isAnnotationMode) return;
    
    const { startX, startY, currentX, currentY } = drawingState;
    
    // Calculate box dimensions
    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    
    // Only save if box has meaningful size (at least 1% of image)
    if (width > 1 && height > 1) {
      const newAnnotation: BoxAnnotation = {
        id: `box-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        x,
        y,
        width,
        height,
        color: annotationColor,
        timestamp: new Date().toISOString()
      };
      
      // Save the annotation immediately
      const updatedAnnotations = [...annotations, newAnnotation];
      onAnnotationsChange(updatedAnnotations);
      
      // Show label dialog positioned near the annotation
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const dialogX = rect.left + (x / 100) * rect.width;
        const dialogY = rect.top + (y / 100) * rect.height;
        
        setLabelDialog({
          isVisible: true,
          annotationId: newAnnotation.id,
          x: dialogX,
          y: dialogY,
          label: ''
        });
      }
    }
    
    setDrawingState({
      isDrawing: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    });
  }, [drawingState, isAnnotationMode, annotationColor, annotations, onAnnotationsChange, imageRef]);

  // Remove a box annotation
  const removeBoxAnnotation = useCallback((annotationId: string) => {
    onAnnotationsChange(annotations.filter(annotation => annotation.id !== annotationId));
  }, [annotations, onAnnotationsChange]);

  // Handle right-click to remove annotation
  const handleAnnotationRightClick = useCallback((e: React.MouseEvent, annotationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeBoxAnnotation(annotationId);
  }, [removeBoxAnnotation]);

  // Handle label confirmation
  const handleLabelConfirm = useCallback(() => {
    if (!labelDialog.annotationId) return;
    
    const updatedAnnotations = annotations.map(annotation => 
      annotation.id === labelDialog.annotationId 
        ? { ...annotation, label: labelDialog.label.trim() || undefined }
        : annotation
    );
    
    onAnnotationsChange(updatedAnnotations);
    setLabelDialog({ isVisible: false, annotationId: null, x: 0, y: 0, label: '' });
  }, [labelDialog, annotations, onAnnotationsChange]);

  // Handle label cancellation
  const handleLabelCancel = useCallback(() => {
    setLabelDialog({ isVisible: false, annotationId: null, x: 0, y: 0, label: '' });
  }, []);

  // Handle label input change
  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelDialog(prev => ({ ...prev, label: e.target.value }));
  }, []);

  // Handle Enter key in label input
  const handleLabelKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLabelConfirm();
    } else if (e.key === 'Escape') {
      handleLabelCancel();
    }
  }, [handleLabelConfirm, handleLabelCancel]);

  // Render current drawing box (while dragging)
  const renderCurrentDrawingBox = () => {
    if (!drawingState.isDrawing) return null;
    
    const { startX, startY, currentX, currentY } = drawingState;
    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    
    return (
      <div
        className={styles.drawingBox}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${width}%`,
          height: `${height}%`,
          border: `2px solid ${annotationColor}`,
          backgroundColor: 'transparent'
        }}
      />
    );
  };

  // Render saved box annotations
  const renderSavedAnnotations = () => {
    // Only show existing box annotations when in box annotation mode
    if (!isAnnotationMode) return null;
    
    return annotations.map((annotation) => (
      <div
        key={annotation.id}
        className={styles.savedAnnotationBox}
        style={{
          left: `${annotation.x}%`,
          top: `${annotation.y}%`,
          width: `${annotation.width}%`,
          height: `${annotation.height}%`,
          border: `2px solid ${annotation.color}`,
          backgroundColor: 'transparent',
          pointerEvents: 'auto' // Always allow interactions with saved boxes
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          removeBoxAnnotation(annotation.id);
        }}
        onContextMenu={(e) => handleAnnotationRightClick(e, annotation.id)}
        title={`${annotation.label ? `Label: ${annotation.label}\n` : ''}Double-click or right-click to remove`}
      >
        {annotation.label && (
          <div className={styles.annotationLabel}>
            {annotation.label}
          </div>
        )}
      </div>
    ));
  };

  // Render label input dialog
  const renderLabelDialog = () => {
    if (!labelDialog.isVisible) return null;
    
    return (
      <div
        className={styles.labelDialog}
        style={{
          position: 'fixed',
          left: `${labelDialog.x}px`,
          top: `${labelDialog.y}px`,
          zIndex: 1000
        }}
      >
        <div className={styles.labelDialogContent}>
          <div className={styles.labelDialogTitle}>Add Label (Optional)</div>
          <div className={styles.labelDialogNote}>
            Note: Labels are for organization only and will not appear in PDF reports.
          </div>
          <input
            type="text"
            value={labelDialog.label}
            onChange={handleLabelChange}
            onKeyDown={handleLabelKeyDown}
            placeholder="Enter label..."
            className={styles.labelInput}
            autoFocus
          />
          <div className={styles.labelDialogButtons}>
            <button
              onClick={handleLabelConfirm}
              className={styles.labelConfirmButton}
            >
              Confirm
            </button>
            <button
              onClick={handleLabelCancel}
              className={styles.labelCancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div 
        className={`${styles.boxAnnotationsOverlay} ${className || ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          cursor: isAnnotationMode ? 'crosshair' : 'default',
          pointerEvents: isAnnotationMode ? 'auto' : 'none' // Only allow interactions in annotation mode
        }}
      >
        {renderSavedAnnotations()}
        {renderCurrentDrawingBox()}
      </div>
      {renderLabelDialog()}
    </>
  );
};