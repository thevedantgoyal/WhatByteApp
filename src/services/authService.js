import { auth } from './firebase';

const FIREBASE_ERROR_MESSAGES = {
  'auth/user-not-found': 'No account found with this email',
  'auth/wrong-password': 'Incorrect password',
  'auth/email-already-in-use': 'This email is already registered',
  'auth/weak-password': 'Password must be at least 6 characters',
  'auth/invalid-email': 'Please enter a valid email',
  'auth/too-many-requests': 'Too many attempts. Try again later',
};

function getErrorMessage(errorCode) {
  return FIREBASE_ERROR_MESSAGES[errorCode] || 'Something went wrong. Please try again';
}

export async function signInUser(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (err) {
    const message = getErrorMessage(err.code);
    return { success: false, error: message };
  }
}

export async function registerUser(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (err) {
    const message = getErrorMessage(err.code);
    return { success: false, error: message };
  }
}

export async function signOutUser() {
  try {
    await auth.signOut();
    return { success: true };
  } catch (err) {
    const message = getErrorMessage(err.code);
    return { success: false, error: message };
  }
}

export function subscribeToAuthState(callback) {
  return auth.onAuthStateChanged(callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}
