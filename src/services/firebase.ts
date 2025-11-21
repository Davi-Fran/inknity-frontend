import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAlkvd_Q5bwLbmQ9Z4TlQizUVgTKGzhgJ0',
  authDomain: 'inknity-741d2.firebaseapp.com',
  projectId: 'inknity-741d2',
  storageBucket: 'inknity-741d2.firebasestorage.app',
  messagingSenderId: '939086011385',
  appId: '1:939086011385:web:f53a570eeca6c8c6997b28',
  measurementId: 'G-GYTNHCR31Z'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)