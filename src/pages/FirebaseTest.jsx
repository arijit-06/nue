import React from 'react';
import { useAuth } from '../context/AuthContext';
import { hasFirebaseConfig } from '../config/firebase';

const FirebaseTest = () => {
  const { isConfigured } = useAuth();

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Firebase Configuration Test</h2>
        
        <div className="mt-3">
          <h5>Environment Variables:</h5>
          <ul>
            <li>API Key: {import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</li>
            <li>Auth Domain: {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</li>
            <li>Project ID: {import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</li>
            <li>Storage Bucket: {import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing'}</li>
            <li>Messaging Sender ID: {import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing'}</li>
            <li>App ID: {import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'}</li>
          </ul>
        </div>

        <div className="mt-3">
          <h5>Firebase Status:</h5>
          <p>Configuration Valid: {hasFirebaseConfig ? '✅ Yes' : '❌ No'}</p>
          <p>Auth Context Ready: {isConfigured ? '✅ Yes' : '❌ No'}</p>
        </div>

        <div className="mt-3">
          <h5>Instructions:</h5>
          <ol>
            <li>Create a <code>.env</code> file in project root</li>
            <li>Add your Firebase configuration variables</li>
            <li>Restart the development server</li>
            <li>Check console for Firebase initialization logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest;