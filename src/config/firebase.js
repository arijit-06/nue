import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Check if environment variables exist
const hasFirebaseConfig = 
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID;

let app = null;
let auth = null;
let db = null;

if (hasFirebaseConfig) {
  try {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    
    console.log('✅ Firebase initialized successfully');
    console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
  }
} else {
  console.warn('⚠️ Firebase environment variables not found');
}

export { auth, db, hasFirebaseConfig };
export default app;