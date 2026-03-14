#!/usr/bin/env node
/**
 * Patches @react-native-firebase/firestore:
 * 1. Import order: React/RCTBridgeModule before RNFBApp (fixes RCTBridgeModule module error)
 * 2. Rename 'operator' var to 'filterOp' (operator is C++ reserved keyword, fixes compiler errors)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FIRESTORE_IOS = path.join(ROOT, 'node_modules/@react-native-firebase/firestore/ios/RNFBFirestore');

const PATCHES = [
  {
    file: 'RNFBFirestoreModule.h',
    from: /#import <RNFBApp\/RNFBSharedUtils\.h>\n#import <React\/RCTBridgeModule\.h>/,
    to: `#import <React/RCTBridgeModule.h>
#import <RNFBApp/RNFBSharedUtils.h>`,
  },
  {
    file: 'RNFBFirestoreCollectionModule.h',
    from: /#import <RNFBApp\/RNFBSharedUtils\.h>\n#import <RNFBFirestoreQuery\.h>\n#import <React\/RCTBridgeModule\.h>/,
    to: `#import <React/RCTBridgeModule.h>
#import <RNFBApp/RNFBSharedUtils.h>
#import <RNFBFirestoreQuery.h>`,
  },
  {
    file: 'RNFBFirestoreTransactionModule.h',
    from: /#import <RNFBApp\/RNFBSharedUtils\.h>\n#import <RNFBFirestoreQuery\.h>\n#import <React\/RCTBridgeModule\.h>/,
    to: `#import <React/RCTBridgeModule.h>
#import <RNFBApp/RNFBSharedUtils.h>
#import <RNFBFirestoreQuery.h>`,
  },
  {
    file: 'RNFBFirestoreDocumentModule.h',
    from: /#import <RNFBApp\/RNFBSharedUtils\.h>\n#import <React\/RCTBridgeModule\.h>/,
    to: `#import <React/RCTBridgeModule.h>
#import <RNFBApp/RNFBSharedUtils.h>`,
  },
];

for (const { file, from, to } of PATCHES) {
  const filePath = path.join(FIRESTORE_IOS, file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  if (from.test(content)) {
    content = content.replace(from, to);
    fs.writeFileSync(filePath, content);
    console.log(`Patched ${file}`);
  }
}

// Fix RNFBFirestoreQuery.m: 'operator' is C++ reserved keyword, rename to filterOp
const queryPath = path.join(FIRESTORE_IOS, 'RNFBFirestoreQuery.m');
if (fs.existsSync(queryPath)) {
  let content = fs.readFileSync(queryPath, 'utf8');
  const original = content;
  content = content.replace(/NSString \*operator=\s*filter\[@"operator"\];/g, 'NSString *filterOp = filter[@"operator"];');
  content = content.replace(/NSString \*operator=\s*map\[@"operator"\];/g, 'NSString *filterOp = map[@"operator"];');
  content = content.replace(/\[operator isEqualToString:/g, '[filterOp isEqualToString:');
  if (content !== original) {
    fs.writeFileSync(queryPath, content);
    console.log('Patched RNFBFirestoreQuery.m (operator -> filterOp)');
  }
}
