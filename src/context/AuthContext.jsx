import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, hasFirebaseConfig } from '../config/firebase';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin emails list
  const ADMIN_EMAILS = ['admin@neu.com', 'arijit@example.com'];

  useEffect(() => {
    if (!hasFirebaseConfig || !auth) {
      setLoading(false);
      console.warn('Auth disabled - Firebase not configured');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user?.email || 'No user');
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, userData) => {
    if (!hasFirebaseConfig || !auth) {
      toast.error('Authentication not available');
      throw new Error('Firebase not configured');
    }

    try {
      console.log('Attempting signup for:', email);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User created:', userCredential.user.uid);

      // Save user data to Firestore
      if (db) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: email,
          name: userData.name || '',
          phone: userData.phone || '',
          createdAt: new Date().toISOString()
        });
        console.log('✅ User data saved to Firestore');
      }

      toast.success('Account created successfully!');
      return userCredential;
    } catch (error) {
      console.error('❌ Signup error:', error.code, error.message);
      
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password must be at least 6 characters');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else {
        toast.error('Signup failed: ' + error.message);
      }
      
      throw error;
    }
  };

  const login = async (email, password) => {
    if (!hasFirebaseConfig || !auth) {
      toast.error('Authentication not available');
      throw new Error('Firebase not configured');
    }

    try {
      console.log('Attempting login for:', email);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful:', userCredential.user.email);
      
      toast.success('Welcome back!');
      return userCredential;
    } catch (error) {
      console.error('❌ Login error:', error.code, error.message);
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Invalid email or password');
      } else if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid credentials. Please check your email and password.');
      } else {
        toast.error('Login failed: ' + error.message);
      }
      
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const resetPassword = async (email) => {
    if (!hasFirebaseConfig || !auth) {
      toast.error('Password reset not available');
      throw new Error('Firebase not configured');
    }

    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      console.error('Password reset error:', error);
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email');
      } else {
        toast.error('Failed to send reset email');
      }
      throw error;
    }
  };

  const isAdmin = currentUser && ADMIN_EMAILS.includes(currentUser.email);

  const value = {
    currentUser,
    loading,
    isAdmin,
    signup,
    login,
    logout,
    resetPassword,
    isConfigured: hasFirebaseConfig
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};