
## Table of Contents

- [Key Features](#key-features)
- [Getting Started with Case Management](#getting-started-with-case-management)
  - [Accessing Case Management](#accessing-case-management)
  - [Understanding Case Numbers](#understanding-case-numbers)
  - [Creating a New Case](#creating-a-new-case)
  - [Case Number Validation](#case-number-validation)
  - [What Happens When You Create a Case](#what-happens-when-you-create-a-case)
- [Loading Existing Cases](#loading-existing-cases)
  - [Quick Load Methods](#quick-load-methods)
- [File Management](#file-management)
  - [Supported File Types](#supported-file-types)
  - [Upload Process](#upload-process)
  - [Features and Restrictions](#features-and-restrictions)
  - [Case Organization & Status Indicators](#case-organization--status-indicators)
- [Case Data Export](#case-data-export)
  - [Overview](#overview)
  - [Export Formats Available](#export-formats-available)
  - [Accessing Export Functions](#accessing-export-functions)
  - [Single Case Export](#single-case-export)
    - [How to Export One Case](#how-to-export-one-case)
    - [What's Included in Single Case Exports](#whats-included-in-single-case-exports)
    - [File Naming Convention](#file-naming-convention)
  - [Bulk Export (All Cases)](#bulk-export-all-cases)
    - [How to Export All Cases](#how-to-export-all-cases)
    - [What's Included in Bulk Exports](#whats-included-in-bulk-exports)
    - [Progress Tracking](#progress-tracking)
    - [File Formats for Bulk Export](#file-formats-for-bulk-export)
  - [Export Options and Features](#export-options-and-features)
    - [Format Selection Guide](#format-selection-guide)
    - [Data Completeness](#data-completeness)
  - [Export Best Practices](#export-best-practices)
    - [Before Exporting](#before-exporting)
    - [During Export](#during-export)
    - [After Export](#after-export)
  - [Troubleshooting Export Issues](#troubleshooting-export-issues)
    - [Common Export Problems](#common-export-problems)
    - [Export Recovery](#export-recovery)
- [Case Import and Review System](#case-import-and-review-system)
  - [Overview](#overview-1)
  - [Understanding Read-Only Cases](#understanding-read-only-cases)
  - [How to Import a Case for Review](#how-to-import-a-case-for-review)
  - [Working with Imported Cases](#working-with-imported-cases)
  - [Managing Review Cases](#managing-review-cases)
  - [Import Best Practices](#import-best-practices)
  - [Troubleshooting Import Issues](#troubleshooting-import-issues)
- [Advanced Operations: Rename & Delete Cases](#advanced-operations-rename--delete-cases)
  - [Renaming a Case](#renaming-a-case)
  - [Deleting a Case](#deleting-a-case)
- [List All Cases](#list-all-cases)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
  - [Error Recovery Features](#error-recovery-features)
  - [Manual Recovery Steps](#manual-recovery-steps)
- [Best Practices for File & Case Management](#best-practices-for-file--case-management)
- [Quick Reference Commands](#quick-reference-commands)
- [File & Case Number Requirements](#file--case-number-requirements)

***

## Key Features

* **Individual Case Organization:** Each case keeps its own images and data separate and secure.

* **Smart Case Sorting:** Cases are sorted using alphanumeric order for easy browsing.

* **File Management:** Upload, view, and delete images within each case.

* **Case Operations:** Rename or delete your cases whenever needed.

* **Data Export:** Export individual cases or all cases with comprehensive annotation data in multiple formats (JSON, CSV, Excel).

* **Case Import & Review:** Import complete case packages (ZIP files) for secure peer review and collaboration with read-only protection.

***

## Getting Started with Case Management

### Accessing Case Management

* Log in to Striae with your authenticated account.

* Find the **Case Management Panel** on the left sidebar.

* Use the **Case Input Field** to enter case numbers.

* Click **Load/Create** to open an existing case or create a new one.

* Use **List All Cases** to browse all your cases sorted by number and letter.

***

### Understanding Case Numbers

* Format: Use letters (A-Z), numbers (0-9), and hyphens (-) only.

* Maximum length: 25 characters.

* Examples:

  * 2025-001

  * CASE-123

  * HOMICIDE-2025-JAN-15

  * CYBER-FRAUD-001

***

### Creating a New Case

1. Type your desired case number in the input field.

2. Click **Load/Create Case**.

   * If the case exists, it loads automatically.

   * If new, a fresh case is created.

3. Confirmation appears: “Case \[number] created successfully!”

### Case Number Validation

* ✅ Valid examples: 2025-001, CASE123, TEST-CASE-A1

* ❌ Invalid examples: case\@123 (special characters), overly long numbers

***

### What Happens When You Create a Case

* A case file structure is created in the system.

* Your personal case list is updated.

* File storage is set up for image uploads.

* Annotation tools and notes are activated for the case.

***

## Loading Existing Cases

### Quick Load Methods

* **Direct Input:** Enter the exact case number and click **Load/Create**.

* **Browse All Cases:** Click **List All Cases** to open a modal showing your cases with pagination and smart sorting. Select a case to enter it quickly.

***

## File Management

### Supported File Types

* PNG, JPEG/JPG, GIF, WEBP, SVG

### Upload Process

1. Select or load a case.

2. Click **Upload Image** to pick files.

3. Files get validated (max 10MB, supported format).

4. Watch the upload progress percentage.

5. Files are processed and appear in the file list.

### Features and Restrictions

* Max file size: 10 MB each.

* Secure cloud storage.

* Click a file to view, use the “×” button to delete with confirmation.

* Error messages appear for invalid formats or size issues and disappear automatically.

***

### Case Organization & Status Indicators

* No case selected: “Create or select a case to view files”

* Empty case: “No files found for \[case-number]”

* Active case: Displays case number and number of files

* Loading: Shows “Loading...” during operations

***

## Case Data Export

### Overview

Striae allows you to export your case data for backup, statistical analysis, or auditing purposes. You can export individual cases or all your cases at once, with complete annotation data included.

### Export Formats Available

* **JSON Format:** Structured data format ideal for technical analysis and data processing
* **CSV Format:** Spreadsheet-compatible format for individual cases with all annotation details
* **Excel Format:** Multi-worksheet Excel files for bulk exports with summary and individual case sheets

**Note:** When you choose to include images with any export format, the system automatically packages everything in a ZIP file containing both the data files and all original images.

### Accessing Export Functions

1. Load any case or stay on the main case management screen
2. Look for the **Export** button in the case management panel
3. Click **Export** to open the export modal

***

### Single Case Export

#### How to Export One Case

1. **Enter Case Number:** Type the case number you want to export in the input field
2. **Choose Format:** Select JSON or CSV/Excel format using the toggle buttons
3. **Include Images (Optional):** Check the "Include Images" box to automatically package all original case images with the data in a ZIP file
4. **Click Export:** Press the green "Export Case Data" button
5. **Download:** Your browser will automatically download the export file (single format file or ZIP package with images)

#### What's Included in Single Case Exports

**Complete Case Information:**

* Case number and export metadata
* Export date and user information
* Total file count and summary statistics

**Detailed File Data:**

* File IDs and original filenames
* Upload dates and file information
* Complete annotation data for each file

**Comprehensive Annotation Details (22 data fields):**

* Case identifiers (Left Case, Right Case, Left Item, Right Item)
* Visual elements (Case Font Color, Index Type, Index Number, Index Color)
* Classifications (Class Type, Custom Class, Class Note, Support Level)
* Options (Has Subclass, Include Confirmation)
* Box annotations with coordinates, colors, timestamps, and labels
* Additional notes and last updated timestamps

#### File Naming Convention

* **JSON:** `striae-case-[CASE-NUMBER]-export-[DATE].json`
* **CSV:** `striae-case-[CASE-NUMBER]-detailed-[DATE].csv`
* **With Images:** `striae-case-[CASE-NUMBER]-complete-[DATE].zip` (when "Include Images" is checked)

***

### Bulk Export (All Cases)

#### How to Export All Cases

1. **Open Export Modal:** Click the Export button from the case management panel
2. **Choose Format:** Select JSON for structured data or CSV/Excel for spreadsheet format
3. **Click Export All:** Press the blue "Export All Cases" button
4. **Monitor Progress:** Watch the real-time progress bar showing which case is being processed
5. **Download:** When complete, your export file will download automatically

#### What's Included in Bulk Exports

**Summary Information:**

* Total number of cases and files
* Export statistics and metadata
* Cases with and without annotations
* Overall annotation counts

**Individual Case Details:**

* Complete data for each case (same as single case export)
* Error handling for any failed case exports
* Last modified dates and export status

#### Progress Tracking

* **Real-time Updates:** See which case is currently being processed
* **Progress Bar:** Visual indicator showing completion percentage
* **Case Counter:** "Exporting case X of Y: [Case Name]" display
* **Error Handling:** Failed cases are noted but don't stop the export process

#### File Formats for Bulk Export

**JSON Format:**

* **File:** `striae-all-cases-export-[DATE].json`
* **Structure:** Single JSON file with all case data organized hierarchically

**Excel Format:**

* **File:** `striae-all-cases-detailed-[DATE].xlsx`
* **Structure:** Multi-worksheet Excel file with:
  * **Summary Sheet:** Overview of all cases with export statistics
  * **Individual Case Sheets:** One worksheet per case with complete annotation details
  * **Error Sheets:** Separate worksheets for any failed case exports

***

### Export Options and Features

#### Format Selection Guide

**Choose JSON When:**

* You need structured data for technical analysis
* Working with databases or programming tools
* Require complete data hierarchy and relationships
* Need the most compact file size

**Choose CSV When:**

* Exporting a single case for spreadsheet analysis
* Need human-readable tabular format
* Working with data analysis tools like Excel, Google Sheets, or R
* Want all 22 annotation fields in organized columns

**Choose Excel (Bulk) When:**

* Exporting all cases for comprehensive analysis
* Need organized worksheets for different cases
* Want summary statistics and individual case details
* Prefer Excel's built-in analysis and formatting tools

**Choose to Include Images When:**

* Need complete case documentation including all original images
* Sharing comprehensive evidence packages with auditors, colleagues, or legal teams
* Archiving cases for long-term storage with full documentation
* Requiring both structured data and visual evidence in a single package
* Want the most complete and self-contained case export available

#### Data Completeness

All export formats include identical data:

* Complete annotation information (all 22 fields)
* Box annotation details with coordinates and visual properties
* Case metadata and file information
* Export tracking and error information
* Timestamps and user attribution

***

### Export Best Practices

#### Before Exporting

* **Verify Case Data:** Ensure all annotations and notes are saved
* **Check File Names:** Confirm case numbers are correct
* **Choose Appropriate Format:** Select the format that best fits your analysis needs
* **Stable Connection:** Ensure reliable internet connection for bulk exports

#### During Export

* **Monitor Progress:** Watch the progress indicator for bulk exports
* **Avoid Interruption:** Don't close the browser or navigate away during export
* **Large Case Sets:** Be patient with bulk exports of many cases

#### After Export

* **Verify Downloads:** Check that files downloaded correctly to your computer
* **Backup Files:** Store export files in secure, backed-up locations
* **File Organization:** Use clear folder structures for exported data
* **Data Security:** Handle exported files according to your organization's data policies

***

### Troubleshooting Export Issues

#### Common Export Problems

**"No files found for case" Error:**

* Verify the case number is spelled correctly
* Ensure the case exists and has been created
* Check that you have permission to access the case

**Export Progress Stuck:**

* Check your internet connection
* Wait for the current case to complete processing
* Refresh the page if the export appears frozen

**Download Not Starting:**

* Check browser's download settings and permissions
* Ensure popup blockers aren't preventing downloads
* Try using a different browser if issues persist

**Large File Export Slow:**

* Bulk exports with many cases take time to process
* Consider exporting smaller batches if you have hundreds of cases
* Use a stable, high-speed internet connection

**Export with Images Taking Long:**

* Exports with images may take several minutes depending on image count and size
* Monitor the progress indicator for download status and ZIP creation progress  
* Ensure stable internet connection for downloading all case images
* Large cases with many high-resolution images will naturally take longer

**Some Images Missing from Export:**

* Check the error log included in the ZIP file for details about failed image downloads
* Network connectivity issues may prevent some images from downloading
* Retry the export if many images failed to download
* Contact support if specific images consistently fail to download

#### Export Recovery

* **Failed Single Case:** Retry the export after checking the case number
* **Failed Bulk Export:** The system will continue processing other cases even if some fail
* **Incomplete Downloads:** Re-run the export to get a fresh file
* **Browser Issues:** Clear browser cache or try an incognito/private window

***

## Case Import and Review System

### Overview

The Case Import and Review System allows you to securely import complete case packages (ZIP files) created by other examiners for peer review and collaboration. Imported cases are automatically protected with read-only access to ensure data integrity while enabling comprehensive review of all case materials.

**Key Benefits:**
* **Secure Collaboration:** Review complete cases from colleagues without risk of accidental modification
* **Complete Case Access:** All original images, annotations, and notes are preserved and accessible
* **Metadata Preservation:** Original export information, analyst details, and timestamps are maintained
* **Easy Management:** Simple import process with automatic organization and cleanup

### Understanding Read-Only Cases

When you import a case for review:

* **Read-Only Protection:** Imported cases cannot be modified, ensuring original data integrity
* **Complete Access:** You can view all images, annotations, notes, and case data exactly as the original analyst created them
* **Separate Organization:** Review cases are kept separate from your regular cases for clear organization
* **Original Metadata:** All original case information including export date, original analyst, and case history is preserved

**Important Security Features:**
* You cannot import cases that you originally created (system prevents conflicts)
* Only one review case can be active at a time to maintain focus and organization
* All import operations are tracked with timestamps and validation

### How to Import a Case for Review

**Step 1: Access the Import Feature**
* Open the Case Management Panel on the left sidebar
* Look for the **"Import Case"** button
* Click the button to open the import modal

**Step 2: Select Your ZIP File**
* Choose **"Select ZIP File"** to browse your computer for the case package
* The system accepts ZIP files exported from Striae with complete case data
* The ZIP file must *not* be modified after export (except for renaming)

**Step 3: Confirm Import**
* Click **"Import"** to begin the import process
* Monitor the progress indicator as the system:
  - Clears the current loaded case (if any)
  - Extracts and validates case data
  - Uploads all images to secure storage
  - Imports annotations and notes
  - Sets up read-only access protections

**Step 4: Access Your Review Case**
* Once import completes, the case automatically loads for review
* All images, annotations, and notes are immediately accessible
* Use normal navigation to review all case materials

### Working with Imported Cases

**Viewing Case Data:**
* Navigate through images using standard controls
* View all annotations including box annotations, classifications, and notes using the toolbar
* Generate a PDF report with selected annotations for wet signatures or offline review

**Read-Only Interface:**
* All editing controls are automatically disabled for imported cases
* You can view but cannot modify annotations, notes, or case information
* Image uploads and file management are restricted
* Case rename and delete operations are prevented

**Navigation:**
* Use the Case Management Panel to see current review case status
* The interface clearly indicates when you're viewing a read-only imported case
* Return to your regular cases by loading a different case number

### Managing Review Cases

**Current Review Case:**
* Only one review case can be active at a time
* The current review case is shown in the Case Management Panel
* Case number is displayed with read-only indicator

**Replacing a Review Case:**
* To import a new case when one is already loaded, use the "Clear" option
* Or choose to automatically replace when importing a new case
* The system safely removes the previous review case data

**Removing Review Cases:**
* Click **"Clear"** to remove the imported case from your account
* This action only removes the case from your review list; it doesn't affect the original case data
* All associated imported data (images, annotations) is safely cleaned up from your account

### Import Best Practices

**Before Importing:**
* Verify the ZIP file is from a trusted source and contains the case you intend to review
* Ensure you have sufficient time to complete the review process
* Clear any current review case if you need to import a different one

**During Import:**
* Keep the browser window open during the import process
* Monitor progress indicators and respond to any prompts
* Allow sufficient time for large cases with many high-resolution images

**While Reviewing:**
* Take notes externally if you need to document your review findings
* Use the complete case data to conduct thorough peer review
* Remember that all viewing is read-only; no changes can be made to the original case

**After Review:**
* Clear the review case when your analysis is complete
* Communicate findings to the original analyst through your preferred communication channels
* Consider exporting your own cases using the same process for reciprocal review

### Troubleshooting Import Issues

**Common Import Problems:**

**ZIP File Not Recognized:**
* Ensure the file is a valid ZIP archive exported from Striae
* Check that the file hasn't been modified or corrupted during transfer
* Verify the ZIP contains the required case data files

**Import Fails with Error:**
* Check that you're not trying to import a case you originally created
* Verify your internet connection is stable during the import process

**Images Not Loading:**
* Large images may take time to process and upload
* Check network connectivity if image upload appears stalled
* Retry the import if the process was interrupted

**Case Data Appears Incomplete:**
* Verify the original export included all necessary data
* Check with the original analyst if case data seems missing
* Re-import the case if the first attempt was incomplete or request a new export

**Performance Issues:**
* Large cases with many high-resolution images may take longer to import
* Close other browser tabs to free up memory during import
* Consider importing during off-peak hours for better performance

**Import Recovery:**
* **Failed Import:** Clear any partial import data and retry with a fresh ZIP file
* **Corrupted Data:** Re-download the case package from the original source
* **Incomplete Cases:** Contact the original analyst for a fresh export
* **Browser Issues:** Clear browser cache or try an incognito/private window

***

## Advanced Operations: Rename & Delete Cases

### Renaming a Case

* Click **Rename/Delete Case**

* Enter a new case number

* The system validates and transfers all files and notes to the new case automatically

* Old case data is fully removed

### Deleting a Case

* Deletion is permanent and cannot be undone!

* Confirm before final deletion

* Removes case record, all files, notes, and system data completely

***

## List All Cases

* Use **List All Cases** to see and browse every case.

* Cases are sorted intelligently: numbers first, then letters.

* Pagination (10 per page) helps navigate large lists.

* Click any case to enter it quickly.

***

## Troubleshooting Common Issues

* **“Invalid case number format”**\
  Use letters, numbers, and hyphens only; remove spaces and special characters.

* **“Case already exists”** when renaming\
  Choose a different name or load the existing case.

* **File loading failures**\
  Check internet connection, refresh, or contact support.

* **Upload failed**\
  Verify file size (\<10MB), file type, connection; try again.

* **File size too large**\
  Compress or resize images; request limit increase if needed.

***

### Error Recovery Features

* Error messages auto-clear.

* Uploads can be retried immediately.

* Operations maintain data integrity.

### Manual Recovery Steps

* Refresh the page.

* Log out and back in.

* Clear browser cache.

* Contact support for persistent issues.

***

## Best Practices for File & Case Management

* Name files clearly and descriptively.

* Upload files in annotation order.

* Clean up unused or duplicate files regularly.

* Keep your own file backups outside Striae.

* Log out after finishing for privacy.

* Manage large cases by splitting or compressing files.

* Upload large files during off-peak times for better speed.

* Use modern browsers and maintain strong internet connections.

***

## Quick Reference Commands

| **Action**           | **How To**                                                      |
| -------------------- | --------------------------------------------------------------- |
| Create/Load Case     | Enter case number → Click **Load/Create Case**                 |
| Browse Cases         | Click **List All Cases**                                       |
| Upload File          | Load case → Click **Upload Image** → Choose file               |
| Delete File          | Click "×" next to filename → Confirm                           |
| Export Single Case   | Enter case number → Choose format → Click **Export Case Data** |
| Export with Images | Enter case number → Choose format → Check "Include Images" → Click **Export Case Data** |
| Export All Cases     | Choose format → Click **Export All Cases** → Monitor progress  |
| Rename Case          | Expand case actions → Enter new name → Click **Rename**        |
| Delete Case          | Expand case actions → Click **Delete Case** → Confirm          |

***

## File & Case Number Requirements

* File types: PNG, JPEG, GIF, WEBP, SVG

* Max file size: 10 MB

* Case numbers: A-Z, 0-9, hyphens only; max 25 characters; no spaces or special characters

***

*Need additional help? Don't hesitate to reach out to our [support team](https://www.striae.org/support). We're here to ensure you have secure and seamless access to Striae's features.*
