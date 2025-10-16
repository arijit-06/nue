# Firebase Setup Instructions

## Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add Project"
3. Name: "Store Branding Portal"
4. Enable Google Analytics (optional)
5. Create project

## Step 2: Enable Authentication
1. In Firebase Console → Authentication → Get Started
2. Enable Email/Password authentication
3. Enable Google Sign-in (optional)

## Step 3: Create Firestore Database
1. In Firebase Console → Firestore Database → Create Database
2. Choose "Start in production mode"
3. Select region closest to your users

## Step 4: Get Firebase Config
1. Project Settings → General
2. Scroll to "Your apps" section
3. Click Web icon (</>)
4. Copy the firebaseConfig object

## Step 5: Setup Environment Variables
1. Create `.env` file in project root
2. Copy values from firebaseConfig:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## Step 6: Update Firebase Config
Replace placeholders in `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Step 7: Setup Firestore Security Rules
In Firestore → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection - only authenticated users can read/write their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // User orders subcollection
    match /users/{userId}/orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admin access to all orders (add admin check later)
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 8: Setup Storage Rules (for artwork files)
In Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /jobs/{orderId}/{fileName} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 9: Test Connection
1. Start development server: `npm run dev`
2. Check browser console for Firebase connection
3. Try creating a test user account

## Collections Structure

### orders
```javascript
{
  orderId: "ORD-1234567890",
  userId: "firebase-user-id",
  customerDetails: {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main St",
    city: "Mumbai",
    pincode: "400001"
  },
  items: [{
    productId: "product-1",
    productName: "LED Signage",
    dimensions: { length: 10, width: 5 },
    area: 50,
    pricePerSqft: 500,
    quantity: 1,
    itemTotal: 25000,
    artworkFileName: "logo.png",
    artworkFilePath: "/jobs/ORD-1234567890/logo.png"
  }],
  billing: {
    subtotal: 25000,
    gst: 4500,
    total: 29500
  },
  payment: {
    method: "pending",
    status: "pending"
  },
  orderStatus: "pending",
  createdAt: "Firebase Timestamp",
  updatedAt: "Firebase Timestamp"
}
```

### users/{userId}/orders
Same structure as orders collection for user's order history.

## Troubleshooting

### Common Issues:
1. **Environment variables not loading**: Restart dev server after adding .env
2. **Permission denied**: Check Firestore security rules
3. **Auth not working**: Verify Authentication is enabled in Firebase Console
4. **Build errors**: Ensure all Firebase imports are correct

### Debug Steps:
1. Check browser console for Firebase errors
2. Verify .env file is in project root (not src folder)
3. Confirm Firebase project is active
4. Test with Firebase emulator for development