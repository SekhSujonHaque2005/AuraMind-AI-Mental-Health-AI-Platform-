import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  projectId: "auramind-14qmq",
  appId: "1:498977361728:web:b83f0728176df4814874a5",
  storageBucket: "auramind-14qmq.firebasestorage.app",
  apiKey: "AIzaSyDgQA7iZMIWuG2FO8ts0NmWdURrbysQwnQ",
  authDomain: "auramind-14qmq.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "498977361728"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
