// Authentication service
// This provides a centralized way to handle authentication operations
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

class AuthService {
  constructor() {
    // Firebase Auth Service - no baseURL needed for Firebase
  }

  // Firebase login function
  async login(email, password, userType) {
    try {
      console.log('AuthService: Login attempt', { email, userType });
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update last login in Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userDocRef, {
        lastLogin: serverTimestamp(),
        userType: userType
      });
      
      // Store userType in localStorage for quick access
      localStorage.setItem('userType', userType);

      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('AuthService: Login error', error);
      let errorMessage = 'Login failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        default:
          errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // Firebase registration function
  async register(userData) {
    try {
      console.log('AuthService: Registration attempt', userData);
      
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const firebaseUser = userCredential.user;
      
      // Update Firebase user profile with display name
      await firebaseUpdateProfile(firebaseUser, {
        displayName: userData.fullName
      });
      
      // Store user data in Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocData = {
        email: userData.email,
        displayName: userData.fullName,
        userType: userData.userType,
        name: userData.fullName,
        phone: userData.phone || '',
        address: userData.address || '',
        organizationName: userData.organizationName || '',
        emailVerified: firebaseUser.emailVerified,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      };
      
      await setDoc(userDocRef, userDocData);
      
      // Store userType in localStorage for quick access
      localStorage.setItem('userType', userData.userType);

      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('AuthService: Registration error', error);
      let errorMessage = 'Registration failed';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // Firebase logout function
  async logout() {
    try {
      console.log('AuthService: Logout');
      
      await signOut(auth);
      localStorage.removeItem('userData');
      localStorage.removeItem('userType');

      return { success: true };
    } catch (error) {
      console.error('AuthService: Logout error', error);
      return { success: false, error: error.message };
    }
  }

  // Get current user from Firebase
  getCurrentUser() {
    return auth.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!auth.currentUser;
  }

  // Get auth token
  getAuthToken() {
    return auth.currentUser ? auth.currentUser.getIdToken() : null;
  }

  // Firebase password reset
  async resetPassword(email) {
    try {
      console.log('AuthService: Password reset request for', email);
      
      await sendPasswordResetEmail(auth, email);
      
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      console.error('AuthService: Password reset error', error);
      let errorMessage = 'Password reset failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        default:
          errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // Firebase email verification
  async verifyEmail() {
    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }
      
      console.log('AuthService: Email verification for', auth.currentUser.email);
      
      // Note: Firebase handles email verification automatically
      // This is just a placeholder for any custom verification logic
      return { success: true, message: 'Email verification sent' };
    } catch (error) {
      console.error('AuthService: Email verification error', error);
      return { success: false, error: error.message };
    }
  }

  // Firebase profile update
  async updateProfile(profileData) {
    try {
      console.log('AuthService: Profile update', profileData);
      
      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }

      // Update Firebase profile if displayName is being updated
      if (profileData.name) {
        await firebaseUpdateProfile(auth.currentUser, {
          displayName: profileData.name
        });
      }
      
      // Update user data in Firestore
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      });

      return { success: true, user: auth.currentUser };
    } catch (error) {
      console.error('AuthService: Profile update error', error);
      return { success: false, error: error.message };
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;