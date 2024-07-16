// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"; // Import Storage functions

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function uploadFile(file, filePath) {
  const storageRef = ref(storage, filePath);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log("File uploaded successfully", snapshot);
  } catch (error) {
    console.error("Upload failed", error);
  }
}

// Function to get a file's download URL
async function getFileUrl(filePath) {
  const storageRef = ref(storage, filePath);
  try {
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Failed to get file URL", error);
    return null;
  }
}

// Function to delete a file
async function deleteFile(filePath) {
  const storageRef = ref(storage, filePath);
  try {
    await deleteObject(storageRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Failed to delete file", error);
  }
}

export { app, db, storage, uploadFile, getFileUrl, deleteFile };
