/**
 * Firebase initialization and exports.
 * Uses @react-native-firebase (native SDK) - config comes from native files.
 *
 * CONFIG SETUP - add your Firebase config files:
 *
 * Android: Place google-services.json at android/app/google-services.json
 *   Download from Firebase Console > Project settings > Your apps > Android
 *
 * iOS: Add GoogleService-Info.plist to the Xcode project
 *   Download from Firebase Console > Project settings > Your apps > iOS
 *   Add via Xcode: Right-click project > Add files > Select the plist
 *
 * Until config files are added, auth returns null (unauthenticated).
 */

import '@react-native-firebase/app';
import authModule from '@react-native-firebase/auth';
import firestoreModule from '@react-native-firebase/firestore';

let auth;
let db;

try {
  auth = authModule();
  db = firestoreModule();
} catch (err) {
  auth = {
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    },
  };
  db = null;
}

export { auth, db };
