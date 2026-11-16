#!/bin/bash
# Run once after `npx cap add ios`. Sets the permission messages, name, orientation and icon
# on the generated Xcode project (the ios/ folder is created fresh on every build).
set -euo pipefail
PLIST=ios/App/App/Info.plist
plutil -replace NSLocationWhenInUseUsageDescription -string "Your location shows which buildings are near you and confirms a check-in when you are at one." "$PLIST"
plutil -replace NSCameraUsageDescription -string "Take a photo to add to a visit in your logbook." "$PLIST"
plutil -replace NSPhotoLibraryUsageDescription -string "Choose a photo to add to a visit in your logbook." "$PLIST"
plutil -replace CFBundleDisplayName -string "Arch Logbook" "$PLIST"
plutil -replace ITSAppUsesNonExemptEncryption -bool NO "$PLIST"
plutil -replace UISupportedInterfaceOrientations -json '["UIInterfaceOrientationPortrait"]' "$PLIST"
ICONSET=ios/App/App/Assets.xcassets/AppIcon.appiconset
for f in "$ICONSET"/*.png; do cp assets/icon-1024.png "$f"; done
echo "Info.plist and icon updated:"; plutil -p "$PLIST" | grep -E "UsageDescription|DisplayName|Encryption" ; ls "$ICONSET"
