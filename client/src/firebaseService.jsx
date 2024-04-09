// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "mernauth-2024.firebaseapp.com",
  projectId: "mernauth-2024",
  storageBucket: "mernauth-2024.appspot.com",
  messagingSenderId: "419577799391",
  appId: "1:419577799391:web:4fe1ff01f5fd566f3d7f6a",
  measurementId: "G-PJ2S5F8MV2"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);