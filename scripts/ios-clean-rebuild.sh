#!/bin/bash
# iOS Clean Rebuild for React Native + Firebase
# Run from project root: ./scripts/ios-clean-rebuild.sh

set -e
cd "$(dirname "$0")/.."

echo "=== 1. Cleaning Node modules cache ==="
rm -rf node_modules/.cache 2>/dev/null || true

echo "=== 2. Cleaning iOS build artifacts ==="
cd ios
rm -rf Pods Podfile.lock build DerivedData 2>/dev/null || true

echo "=== 3. Cleaning CocoaPods cache ==="
pod cache clean --all 2>/dev/null || true

echo "=== 4. Reinstalling Pods ==="
pod install

echo "=== 5. Clearing Xcode Derived Data (optional but recommended) ==="
rm -rf ~/Library/Developer/Xcode/DerivedData/WhatByteApp-* 2>/dev/null || true

echo ""
echo "=== Done. Next steps ==="
echo "1. Open ios/WhatByteApp.xcworkspace in Xcode (NOT .xcodeproj)"
echo "2. Product > Clean Build Folder (Cmd+Shift+K)"
echo "3. Product > Build (Cmd+B)"
echo ""
echo "Or from terminal: npx react-native run-ios"
