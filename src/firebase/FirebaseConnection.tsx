import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCd0mtpBjLqM3zdgO7EdwIoDgHtLMvTz7M',
  authDomain: 'inknity-2f77c.firebaseapp.com',
  projectId: 'inknity-2f77c',
  storageBucket: 'inknity-2f77c.firebasestorage.app',
  messagingSenderId: '436114935201',
  appId: '1:436114935201:web:53e8e9a8db9cac5a7c0fe0',
  measurementId: 'G-T7FGM4DS2W'
}

const connection = initializeApp(firebaseConfig)
const authentication = getAuth(connection)

export { authentication }