# iOS Deployment Guide for RJCC Church Management System

Complete guide to deploying the RJCC Church Management app to the Apple App Store.

## Prerequisites

1. **macOS Computer** - Required for iOS development
2. **Xcode 14+** - Download from Mac App Store
3. **Apple Developer Account** - $99/year (https://developer.apple.com)
4. **CocoaPods** - Dependency manager for iOS
5. **Node.js & pnpm** - Already installed

---

## Step 1: Install Xcode and Tools

### Install Xcode
```bash
# Download Xcode from Mac App Store
# Or via command line:
xcode-select --install
```

### Install CocoaPods
```bash
sudo gem install cocoapods
```

### Verify Installation
```bash
xcode-select -p
pod --version
```

---

## Step 2: Initialize iOS Project

Run these commands in your project root:

```bash
# Build web app
pnpm run build

# Initialize Capacitor (if not done)
npx cap init "RJCC Church" "org.rjcc.churchmanagement"

# Add iOS platform
npx cap add ios

# Sync web app to iOS
npx cap sync ios
```

This creates an `ios` folder with your Xcode project.

---

## Step 3: Configure App Icons

### Create App Icons

You need icons in these sizes for iOS:
- 20x20 (iPhone Notification)
- 29x29 (iPhone Settings)
- 40x40 (iPhone Spotlight)
- 60x60 (iPhone App)
- 76x76 (iPad App)
- 83.5x83.5 (iPad Pro)
- 1024x1024 (App Store)

**Recommended Tools:**
- https://www.appicon.co/
- https://makeappicon.com/
- Figma with export settings

### Add Icons to Xcode

1. Open Xcode:
   ```bash
   npx cap open ios
   ```

2. In Xcode, navigate to:
   - Select **App** target
   - Go to **General** tab
   - Click **App Icons and Launch Images**
   - Click **AppIcon** in Assets.xcassets

3. Drag and drop your icon files into the correct size slots

---

## Step 4: Configure Signing & Capabilities

### Set Bundle Identifier

1. In Xcode, select **App** target
2. Go to **General** tab
3. Verify Bundle Identifier: `org.rjcc.churchmanagement`

### Configure Signing

1. Go to **Signing & Capabilities** tab
2. Check **Automatically manage signing**
3. Select your **Team** (Apple Developer account)
4. Xcode will automatically create provisioning profiles

### Add Capabilities (Optional)

If using camera for QR scanning:
1. Click **+ Capability**
2. Add **Camera**
3. Update `Info.plist` with camera usage description

---

## Step 5: Update Info.plist

Add required permissions and settings:

```xml
<key>NSCameraUsageDescription</key>
<string>RJCC Church needs camera access to scan QR codes for attendance.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>RJCC Church needs photo access to set profile pictures.</string>

<key>UIRequiresFullScreen</key>
<false/>

<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleLightContent</string>
```

---

## Step 6: Configure Launch Screen

### Custom Splash Screen

1. In Xcode, go to `App > App > Assets.xcassets`
2. Create **Splash** image set
3. Add your splash screen images:
   - 1x (320x568)
   - 2x (750x1334)
   - 3x (1242x2208)

4. Update `LaunchScreen.storyboard` if needed

---

## Step 7: Build and Test

### Test on Simulator

```bash
# Open in Xcode
npx cap open ios

# Select iPhone simulator from device menu
# Click Run (▶) button
```

### Test on Real Device

1. Connect iPhone/iPad via USB
2. Trust computer on device
3. In Xcode, select your device from device menu
4. Click Run (▶)
5. If prompted, trust developer on device:
   - Settings > General > VPN & Device Management
   - Trust your developer account

---

## Step 8: Archive for App Store

### Create Archive

1. In Xcode, select **Any iOS Device** as target
2. Go to **Product > Archive**
3. Wait for archive to complete
4. **Organizer** window will open

### Validate Archive

1. In Organizer, select your archive
2. Click **Validate App**
3. Choose distribution options:
   - App Store Connect
   - Automatic signing
   - Include symbols
4. Click **Validate**
5. Fix any issues reported

---

## Step 9: Upload to App Store Connect

### Create App in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Click **My Apps** > **+** > **New App**
3. Fill in details:
   - Platform: iOS
   - Name: RJCC Church Management
   - Primary Language: English
   - Bundle ID: org.rjcc.churchmanagement
   - SKU: RJCC-CHURCH-001

### Upload Build

1. In Xcode Organizer, select archive
2. Click **Distribute App**
3. Choose **App Store Connect**
4. Select upload options:
   - Upload
   - Automatically manage signing
   - Include symbols
5. Click **Upload**
6. Wait for processing (10-30 minutes)

---

## Step 10: Complete App Store Listing

### Required Information

#### App Information
- **Name:** RJCC Church Management
- **Subtitle:** Complete Church & Ministry Management
- **Category:** Primary - Productivity, Secondary - Lifestyle

#### Privacy Policy
- **URL:** Required (create and host online)

#### App Description
```
RJCC Church Management - Comprehensive ministry management for Resurrected Jesus Christ Church.

FEATURES:
✝️ Member & Family Management
📊 Advanced Demographics & Analytics
👥 New Believer Tracking & Follow-up
📱 QR Code Attendance System
💰 Financial & Giving Management
📅 Event Management & Ticketing
📧 Communication & Messaging
📈 Detailed Reports & Analytics
🌐 Offline-First Functionality
🏢 Multi-Campus Support

PERFECT FOR:
• Church Administrators
• Pastors & Ministry Leaders
• Multi-Campus Churches
• Crusade & Event Management

WORKS EVERYWHERE:
Full offline support - register members, track attendance, and record giving without internet. Data syncs automatically when connected.

SECURE & PRIVATE:
Encrypted data with role-based access control.

Built for modern ministry management.
```

#### Keywords
```
church management, ministry, attendance, members, giving, church app, offline church, ministry tools
```

### Screenshots

Required screenshots for:
- **iPhone 6.7"** (iPhone 14 Pro Max) - At least 2
- **iPhone 5.5"** (iPhone 8 Plus) - At least 2
- **iPad Pro 12.9"** - At least 2

**Screenshot Sizes:**
- iPhone 6.7": 1290x2796
- iPhone 5.5": 1242x2208
- iPad Pro 12.9": 2048x2732

**What to Screenshot:**
1. Dashboard with statistics
2. Member management screen
3. Attendance QR scanner
4. Demographics charts
5. Events calendar

---

## Step 11: Submit for Review

### Version Information
- **Version:** 1.0.0
- **Build:** 1
- **Copyright:** © 2026 Resurrected Jesus Christ Church

### Age Rating
1. Complete questionnaire
2. Recommended: 4+ (No objectionable content)

### Review Information
- **Contact:** Provide email and phone
- **Notes:** "Church management application for internal ministry use"

### Submit
1. Click **Add for Review**
2. Click **Submit to App Store**
3. Review typically takes 24-48 hours

---

## Step 12: App Updates

When making changes:

```bash
# 1. Update version in ios/App/App.xcodeproj
# Info.plist > CFBundleShortVersionString = "1.1.0"
# Info.plist > CFBundleVersion = "2"

# 2. Rebuild web app
pnpm run build

# 3. Sync to iOS
npx cap sync ios

# 4. Open Xcode
npx cap open ios

# 5. Archive and upload (repeat Steps 8-11)
```

**Version Numbering:**
- **Version (CFBundleShortVersionString):** User-facing (1.0.0, 1.1.0, 2.0.0)
- **Build (CFBundleVersion):** Must increment with every upload (1, 2, 3...)

---

## Quick Commands Reference

```bash
# Build web app
pnpm run build

# Sync to iOS
pnpm run build:ios

# Open Xcode
pnpm run ios

# Full workflow
pnpm run build && npx cap sync ios && npx cap open ios
```

---

## Troubleshooting

### "No provisioning profiles found"
**Solution:**
1. Sign in to Xcode with Apple ID
2. Xcode > Preferences > Accounts
3. Select team > Manage Certificates
4. Click + and create iOS Development Certificate

### "Code signing error"
**Solution:**
1. Clean build folder: Product > Clean Build Folder
2. Delete derived data: Xcode > Preferences > Locations
3. Restart Xcode

### "Archive validation failed"
**Solution:**
1. Check bundle identifier matches App Store Connect
2. Ensure version number is higher than previous
3. Verify all required icons are present

### "Missing compliance"
**Solution:**
When asked about encryption during upload:
- Select "No" if not using custom encryption
- Most apps don't need this

---

## iOS-Specific Features

### Safe Area Support
The app already supports iPhone notch/Dynamic Island:
```css
.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Dark Mode
Automatically adapts to iOS system theme.

### Status Bar
Configured for black background to match app theme.

---

## Publishing Checklist

- [ ] Xcode installed and configured
- [ ] Apple Developer account active
- [ ] App icons created (all sizes)
- [ ] Bundle ID configured
- [ ] Code signing set up
- [ ] Camera permissions added (if needed)
- [ ] Launch screen configured
- [ ] Tested on real device
- [ ] App Store Connect listing complete
- [ ] Screenshots uploaded
- [ ] Privacy policy created
- [ ] Build archived and validated
- [ ] Uploaded to App Store Connect
- [ ] Submitted for review

---

## Important Notes

1. **Apple Review:** Can take 24-72 hours
2. **Rejection Handling:** Read feedback carefully, fix issues, resubmit
3. **TestFlight:** Use for beta testing before public release
4. **Version Control:** Always increment build number
5. **Certificates:** Back up signing certificates and provisioning profiles

---

## TestFlight Beta Testing (Optional)

Before public release:

1. Upload build to App Store Connect
2. Go to TestFlight tab
3. Add internal/external testers
4. Share beta link with church staff
5. Collect feedback
6. Fix issues
7. Upload new build if needed

---

## Cost Summary

- **Apple Developer Program:** $99/year
- **macOS Computer:** If you don't have one
- **Total Annual Cost:** $99 + hardware

---

## Support Resources

- Apple Developer: https://developer.apple.com
- Capacitor iOS Docs: https://capacitorjs.com/docs/ios
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Xcode Documentation: https://developer.apple.com/xcode/

---

**Your iOS app is ready for the App Store! 🍎**

For Android deployment, see [ANDROID_DEPLOYMENT.md](./ANDROID_DEPLOYMENT.md).
