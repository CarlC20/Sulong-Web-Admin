// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYNIRVHwg22aSJGLQRBjsfV-BI3OiLBGQ',
  authDomain: 'sulong-db7f2.firebaseapp.com',
  projectId: 'sulong-db7f2',
  storageBucket: 'sulong-db7f2.appspot.com',
  messagingSenderId: '1050668025787',
  appId: '1:1050668025787:web:3cc9e55100cda31262669e',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
