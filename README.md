# 🔫 Striae - A Firearms Examiner's Comparison Companion

## 🌐 Application URL

**[Live App](https://www.striae.org)**

## 📚 Documentation

**[Striae Documentation](https://developers.striae.org/striae-dev/get-started/document-index)**

## 💬 Contact & Support

**[Striae Support](https://www.striae.org/support)**

**[Striae on Discord](https://discord.gg/ESUPhTPwHx)**

---

## 📋 Changelog

## [2025-09-06] - *[Release v0.9.06-beta](https://github.com/striae-org/striae/releases/tag/v0.9.06-beta)*

- **Installation & Setup Improvements** - Comprehensive installation guide and simplified setup process
- **Worker Infrastructure Enhancements** - Security hardening and configuration portability improvements
- **UI/UX Enhancements** - Added homepage about section, improved mobile responsiveness, and enhanced authentication components
- **Security & Data Management** - Free email domain filtering and enhanced authentication security measures
- **Community & Project Management** - Patreon integration, GitHub issue templates, and Code of Conduct
- **Bug Fixes & Optimizations** - PostCSS fixes, configuration improvements, and dependency updates
- **Developer Experience** - Enhanced documentation, worker optimizations, and deployment script improvements

## [2025-09-01] - *[Release v0.9.0-beta](https://github.com/striae-org/striae/releases/tag/v0.9.0)*

- Global CSS corrections and cleanup
- Numerous code cleanups and adjustments
- Created a footer modal component for in-app support (main app is now a single-screen interface)
- Refactored sidebar components to reduce redundancy and improve maintainability
- Created user's guide documentation

## [2025-08-26] - *Pre-Beta Release*

## 🔐 Authentication & Security Enhancements

### Multi-Factor Authentication (MFA)

- ✅ **Complete MFA system** with phone-based verification

### Login System Improvements

- ✅ **Simplified login process (email & password only)** with better error handling

---

## 🎨 UI/UX Improvements

### Visual Enhancements

- ✅ **Firefox compatibility** - Fixed text color issues
- ✅ **Consistent branding** - Logo links across all landing pages
- ✅ **Professional icons** - Replaced emoji in password fields with custom SVG icons
- ✅ **Improved form interactions** and visual feedback

---

## 📄 PDF Generation & Reporting

### New PDF Functionality

- ✅ **Complete PDF generation system**
- ✅ **Dynamic filename generation** for reports
- ✅ **Toast notifications** for PDF generation status
- ✅ **Enhanced button components** for PDF actions and status

---

## 📋 Content & Legal Updates

### Documentation

- ✅ **Simplified Terms & Conditions and Privacy Policy Sheets**
- ✅ **Compliance updates** for data control terms

---

## 🐛 Bug Fixes & Optimizations

### Canvas & Annotation System

- ✅ **Memory management** - Cleanup on component unmount
- ✅ **State management** - Clear displays on case/image changes
- ✅ **Improved interaction handling**

### General Improvements

- ✅ **Index labeling** to include numbers OR letters
- ✅ **Notes display** fixes
- ✅ **Form enhancements**
- ✅ **Link corrections** across application

---

## 📊 Development Statistics

- **94 commits** in 4 days
- **7 major feature areas** enhanced
- **3 new components** created
- **1 new worker module** implemented

---

## 🎯 Key Highlights

| Feature | Impact | Status |
|---------|--------|--------|
| **MFA Implementation** | 🔒 Major security enhancement | ✅ Complete |
| **PDF Generation** | 📄 New core functionality | ✅ Complete |
| **UI Modernization** | 🎨 Better user experience | ✅ Complete |
| **Worker Infrastructure** | ⚡ Performance & scalability | ✅ Complete |
| **Code Quality** | 🛡️ SSR compatibility & error handling | ✅ Complete |

---

## [2025-08-23]

#### ✨ Feature Additions

- Annotations display completed!

#### 🔒 Security Enhancements

- Replaced Cloudflare Zero Trust with registration password gateway
- Removed Google-linked sign-in
- Corrected Manage Profile to verify new email addresses before updating from old email address
- Added an inactivity timer to automatically sign user out after certain period of inactivity

#### 🐛 Bug Fixes

- Renaming cases bug: Saved notes did not transfer over to the new case number correctly. This operation was fixed.
- Clear canvas on image delete: Clear the canvas of any images when a single file is deleted.

#### 🎨 Interface Improvements

- Added a "Rename/Delete Case" button to hide critical functions behind an extra gateway

#### 🔧 Minor Updates

- Multiple wording and interface adjustments

---

## [2025-08-17]

#### ✅ Added

- Cloudflare Zero Access Gateway integration for enhanced security and streamlined authentication.
- Minor description/wording updates throughout the app for clarity.
- Various code corrections and minor bug fixes for reliability.

#### 🚧 Planned

- Annotations display on the canvas
- Conversion to Adobe PDF

#### ✅ Stable Features

- Firebase Authentication methods
- Case management
- File upload & management
- Notes creation & management

---

## [2025-08-10] - Development Update

#### ⚠️ Development Status

**Striae Development Indefinitely Suspended**

Some of you know that at the end of 2024, I’d been working on a personal project close to my heart — Striae, a Firearms Examiner’s Comparison Companion.

The goal was simple but powerful: give firearms examiners a secure, organized way to upload bullet and cartridge case comparison images, link them to specific cases, and make notations directly tied to each image.

#### ✅ Core Features Built

- User login & account management
- Case management for organized workflows
- Upload images tied to cases
- Make and store notations linked to each specific image

#### 🔒 Security Measures Implemented

- 🔐 Firebase Authentication for login and admin management
- 🔐 Encryption in transit and at rest
- 🔐 Data segregation/isolation
- 🔐 Controlled access & monitoring

#### 🔮 Future Outlook

Unfortunately, a few significant life upheavals forced me to pause development before reaching the printing tools and live display functions I had envisioned.

Rather than let it fade away in a private, closed folder, I’ve opened the code archive to the public. Every project that I had built in the previous few years has been founded on the principle of contributing to the public good. My hope is that someone with the skills and interest might pick up where I left off — improve it, adapt it, and maybe even take Striae further than I imagined. If that sounds like you (or you know someone who'd be interested), the code is now available for anyone to view and build upon. If circumstances allow, I may resume development in the future and take this to the finish line.
