// Firebase configuration for FoodBridge application
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvHOoz0bKuhhseCJr43q59J8EJm2IrLPQ",
  authDomain: "miniprojcet-jsapp.firebaseapp.com",
  databaseURL: "https://miniprojcet-jsapp-default-rtdb.firebaseio.com",
  projectId: "miniprojcet-jsapp",
  storageBucket: "miniprojcet-jsapp.firebasestorage.app",
  messagingSenderId: "547266375620",
  appId: "1:547266375620:web:2cd1bc55f15cf44c6b3e91",
  measurementId: "G-BGJ66LB75D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;