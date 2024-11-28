import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSGzAqXKT0AxVu3ISqky85WbJswO41cLw",
  authDomain: "expo-try-a2def.firebaseapp.com",
  projectId: "expo-try-a2def",
  storageBucket: "expo-try-a2def.appspot.com",
  messagingSenderId: "117318656459",
  appId: "1:117318656459:web:450eb9a8185d9bea87d64e",
};

// Initialize Firebase App if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth with React Native Persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);

// References to Firestore collections
export const userRef = collection(db, "users");
export const roomRef = collection(db, "room");
