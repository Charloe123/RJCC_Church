# 📱 Complete Mobile Deployment Guide
### RJCC Church Management System - iOS & Android

This guide covers deploying your church management app to both **Google Play Store** (Android) and **Apple App Store** (iOS).

---

## 🚀 Quick Start

### One-Time Setup

```bash
# Install dependencies
pnpm install

# Build web application
pnpm run build

# Initialize Capacitor with both platforms
pnpm run init:capacitor
```

This will:
- Initialize Capacitor
- Add Android platform
- Add iOS platform
- Create native project folders

---

## 📱 Platform-Specific Guides

### Android Deployment
**📄 See:** [ANDROID_DEPLOYMENT.md](./ANDROID_DEPLOYMENT.md)

**Requirements:**
- Android Studio
- JDK 17+
- Google Play Console account ($25 one-time)

**Quick Build:**
```bash
pnpm run build:android
cd android && ./gradlew bundleRelease
```

### iOS Deployment
**📄 See:** [IOS_DEPLOYMENT.md](./IOS_DEPLOYMENT.md)

**Requirements:**
- macOS computer
- Xcode 14+
- Apple Developer account ($99/year)

**Quick Build:**
```bash
pnpm run build:ios
npx cap open ios
# Then archive in Xcode
```

---

## 🎯 Development Workflow

### Making Code Changes

When you update React code:

```bash
# 1. Build web app
pnpm run build

# 2. Sync to both platforms
npx cap sync

# 3. Test on Android
pnpm run android

# 4. Test on iOS (macOS only)
pnpm run ios
```

### Available Scripts

```bash
# Build web app only
pnpm run build

# Build & sync to Android
pnpm run build:android

# Build & sync to iOS
pnpm run build:ios

# Build & sync to both
pnpm run build:mobile

# Open Android Studio
pnpm run android

# Open Xcode (macOS)
pnpm run ios
```

---

## 📦 Project Structure

```
rjcc-church-management/
├── src/                    # React application
│   ├── app/
│   │   ├── components/
│   │   └── pages/
│   └── styles/
├── public/                 # App icons & assets
├── dist/                   # Built web app (after build)
├── android/                # Android native project
│   └── app/
│       ├── src/
│       └── build.gradle
├── ios/                    # iOS native project (macOS)
│   └── App/
│       ├── App.xcodeproj
│       └── App/
├── capacitor.config.ts     # Capacitor config
└── package.json
```

---

## 🎨 App Icons

### Icon Requirements

Create your church logo in these formats:

**Android:**
- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512)

**iOS:**
- Multiple sizes from 20x20 to 1024x1024
- Use Xcode Asset Catalog

**Design Guidelines:**
- Black and white theme
- Cross symbol (✝)
- High contrast
- No text (app name shown separately)

### Icon Generation Tools

- **Figma:** Design and export
- **App Icon Generator:** https://www.appicon.co/
- **Capacitor Assets:** `npx @capacitor/assets generate`

---

## 🔧 Configuration Files

### capacitor.config.ts

```typescript
{
  appId: 'org.rjcc.churchmanagement',
  appName: 'RJCC Church',
  webDir: 'dist',
  // Platform-specific settings configured
}
```

### Android: android/app/build.gradle

```gradle
android {
  defaultConfig {
    applicationId "org.rjcc.churchmanagement"
    versionCode 1        // Increment with each update
    versionName "1.0.0"  // User-facing version
  }
}
```

### iOS: ios/App/App/Info.plist

```xml
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>
```

---

## 📊 Feature Comparison

| Feature | Android | iOS |
|---------|---------|-----|
| Offline Mode | ✅ | ✅ |
| QR Scanning | ✅ | ✅ |
| Push Notifications | ✅ | ✅ |
| Biometric Auth | ✅ | ✅ |
| Background Sync | ✅ | ⚠️ Limited |
| Camera Access | ✅ | ✅ |
| Local Storage | ✅ | ✅ |

---

## 🔒 Permissions

### Android (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### iOS (Info.plist)

```xml
<key>NSCameraUsageDescription</key>
<string>Scan QR codes for attendance</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Set profile pictures</string>
```

---

## 🧪 Testing Checklist

Test on both platforms before releasing:

### ✅ Core Features
- [ ] App launches successfully
- [ ] All navigation works
- [ ] Forms submit properly
- [ ] Charts render correctly
- [ ] Offline mode functions
- [ ] Data persists locally

### ✅ Mobile-Specific
- [ ] QR scanner works
- [ ] Camera permissions granted
- [ ] Bottom navigation (mobile)
- [ ] Touch interactions smooth
- [ ] Back button works (Android)
- [ ] Safe area respected (iOS)
- [ ] Orientation handles properly

### ✅ Visual
- [ ] App icon displays
- [ ] Splash screen shows
- [ ] Status bar matches theme
- [ ] Dark/Light mode works
- [ ] No layout issues
- [ ] Text readable on all sizes

---

## 📈 Version Management

### Versioning Strategy

Use semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes (1.0.0 → 2.0.0)
- **MINOR:** New features (1.0.0 → 1.1.0)
- **PATCH:** Bug fixes (1.0.0 → 1.0.1)

### Update Process

```bash
# 1. Update version in package.json
{
  "version": "1.1.0"
}

# 2. Update Android version
# android/app/build.gradle
versionCode = 2           // Must increment
versionName = "1.1.0"

# 3. Update iOS version
# ios/App/App/Info.plist
CFBundleShortVersionString = "1.1.0"
CFBundleVersion = "2"     // Must increment

# 4. Build and deploy
pnpm run build:mobile
```

---

## 🚢 Deployment Checklist

### Pre-Deployment
- [ ] All features tested
- [ ] No console errors
- [ ] Version numbers updated
- [ ] Icons finalized
- [ ] Privacy policy created
- [ ] Screenshots taken

### Android
- [ ] Signed AAB created
- [ ] Play Console listing complete
- [ ] Release notes written
- [ ] Uploaded to Play Store

### iOS
- [ ] Archive created in Xcode
- [ ] App validated successfully
- [ ] App Store Connect listing complete
- [ ] Uploaded and submitted

---

## 💰 Cost Breakdown

### One-Time Costs
- **Google Play Console:** $25 (lifetime)
- **macOS Computer (iOS):** $1000+ (if needed)

### Annual Costs
- **Apple Developer Program:** $99/year
- **Total Annual:** $99

### Optional
- **App icon designer:** $50-200
- **Beta testing services:** Free (TestFlight, Play Console)

---

## 🐛 Common Issues

### Both Platforms

**"Capacitor not found"**
```bash
pnpm install
pnpm run init:capacitor
```

**"Build failed"**
```bash
# Clean and rebuild
pnpm run build
npx cap sync
```

### Android-Specific

**"Gradle build failed"**
```bash
cd android
./gradlew clean
./gradlew bundleRelease
```

### iOS-Specific

**"Code signing error"**
- Sign in to Xcode with Apple ID
- Select development team
- Enable automatic signing

---

## 📚 Documentation Links

### Official Docs
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Store Guidelines
- [Google Play Policies](https://play.google.com/about/developer-content-policy/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

### Project Docs
- [README.md](./README.md) - Project overview
- [ANDROID_DEPLOYMENT.md](./ANDROID_DEPLOYMENT.md) - Android guide
- [IOS_DEPLOYMENT.md](./IOS_DEPLOYMENT.md) - iOS guide
- [MOBILE_QUICK_START.md](./MOBILE_QUICK_START.md) - Quick testing

---

## 🎯 Success Metrics

Your app is ready when:

✅ Builds successfully on both platforms
✅ All features work in production
✅ Pass store review guidelines
✅ Privacy policy published
✅ Screenshots prepared
✅ Metadata complete
✅ Icons look professional

---

## 🔄 Update Workflow

Regular updates keep your app fresh:

### Monthly Cycle

1. **Week 1-2:** Develop features
2. **Week 3:** Test on both platforms
3. **Week 4:** Deploy updates

### Emergency Fixes

For critical bugs:

```bash
# Fast-track deployment
pnpm run build
pnpm run build:mobile

# Android: Build and upload
cd android && ./gradlew bundleRelease

# iOS: Archive and upload in Xcode
```

---

## 📞 Support

### Getting Help

- **Technical Issues:** Check documentation files
- **Build Errors:** Review error logs carefully
- **Store Rejection:** Read reviewer feedback
- **General Questions:** Consult Capacitor docs

### Useful Commands

```bash
# Check Capacitor doctor
npx cap doctor

# View logs (Android)
adb logcat

# View logs (iOS)
Console app on macOS

# Sync without building
npx cap sync
```

---

## 🌟 Best Practices

1. **Test on Real Devices** - Simulators aren't enough
2. **Version Control** - Use Git for all changes
3. **Backup Signing Keys** - Never lose keystore/certificates
4. **Regular Updates** - Monthly or quarterly
5. **User Feedback** - Read reviews and respond
6. **Beta Testing** - Use TestFlight/Play Beta
7. **Analytics** - Monitor crashes and usage
8. **Documentation** - Keep deployment docs updated

---

## 🎉 Launch Strategy

### Soft Launch

1. Release to Play Store & App Store
2. Share with church staff only
3. Collect feedback for 1-2 weeks
4. Fix any critical issues
5. Prepare marketing materials

### Full Launch

1. Announce to congregation
2. Provide training sessions
3. Create tutorial videos
4. Monitor first-week usage
5. Quick response to issues

---

**Your church app is ready for both iOS and Android! 🚀**

Start with the platform you're most comfortable with, then expand to the other.

For specific platform instructions, see:
- [Android: ANDROID_DEPLOYMENT.md](./ANDROID_DEPLOYMENT.md)
- [iOS: IOS_DEPLOYMENT.md](./IOS_DEPLOYMENT.md)
