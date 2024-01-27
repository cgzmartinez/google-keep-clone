// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const app = initializeApp({  
  apiKey: import.meta.env.SVELTE_API_KEY,
  authDomain: import.meta.env.SVELTE_AUTH_DOMAIN,
  projectId: import.meta.env.SVELTE_PROJECT_ID,
  storageBucket: import.meta.env.SVELTE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.SVELTE_MESSAGING_SENDER_ID,
  appId: import.meta.env.SVELTE_APP_ID,
  measurementId: import.meta.env.SVELTE_MEASUREMENT_ID
});

// Initialize Firebase
