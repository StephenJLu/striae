# 🔫 Striae - A Firearms Examiner's Comparison Companion

## 🌐 Application URL
**[Live App: https://www.striae.org](https://www.striae.org)**

## 📚 Documentation
**[Striae Documentation](https://docs.stephenjlu.com/docs-stephenjlu/striae-overview/striae-overview)**

## 💬 Contact & Support
**[Striae Support](https://www.striae.org/support)**

---

## 📋 Changelog

### [2025-08-23] - Latest Release

#### ✨ Feature Additions

- Annotations display completed!

#### 🔒 Security Enhancements

- **Security** - Replaced Cloudflare Zero Trust with registration password gateway
- **Security** - Removed Google-linked sign-in
- **Security** - Corrected Manage Profile to verify new email addresses before updating from old email address
- **Security** - Added an inactivity timer to automatically sign user out after certain period of inactivity

#### 🐛 Bug Fixes

- **Function Bug** - Renaming cases bug: Saved notes did not transfer over to the new case number correctly. This operation was fixed.
- **Function Bug** - Clear canvas on image delete: Clear the canvas of any images when a single file is deleted.

#### 🎨 Interface Improvements

- **Interface** - Added a "Rename/Delete Case" button to hide critical functions behind an extra gateway

#### 🔧 Minor Updates

- Multiple wording and interface adjustments

---

### [2025-08-17] - Earlier Release

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

### [2025-08-10] - Development Update

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
