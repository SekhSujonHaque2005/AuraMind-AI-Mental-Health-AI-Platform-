import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  projectId: "auramind-14qmq",
  appId: "1:498977361728:web:b83f0728176df4814874a5",
  storageBucket: "auramind-14qmq.firebasestorage.app",
  apiKey: "AIzaSyDgQA7iZMIWuG2FO8ts0NmWdURrbysQwnQ",
  authDomain: "auramind-14qmq.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "498977361728",
  databaseURL: "https://auramind-14qmq-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

export { app, db };
