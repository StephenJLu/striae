export type ExportFormat = 'json' | 'csv';

// Shared CSV headers for all tabular exports
export const CSV_HEADERS = [
  'File ID',
  'Original Filename',
  'Upload Date',
  'Has Annotations',
  'Left Case',
  'Right Case',
  'Left Item',
  'Right Item',
  'Case Font Color',
  'Class Type',
  'Custom Class',
  'Class Note',
  'Index Type',
  'Index Number',
  'Index Color',
  'Support Level',
  'Has Subclass',
  'Include Confirmation',
  'Confirmation Status',
  'Confirming Examiner Name',
  'Confirming Examiner Badge ID',
  'Confirming Examiner Email',
  'Confirming Examiner Company',
  'Confirmation ID',
  'Confirmation Timestamp',
  'Confirmation Date (ISO)',
  'Total Box Annotations',
  'Box ID',
  'Box X',
  'Box Y',
  'Box Width',
  'Box Height',
  'Box Color',
  'Box Label',
  'Box Timestamp',
  'Additional Notes',
  'Last Updated'
];

/**
 * Helper function to format date for filename using user's local timezone
 */
export function formatDateForFilename(date: Date): string {
  // Use local timezone instead of UTC
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}