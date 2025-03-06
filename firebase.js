import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCGXoREVrOni92fMkMrX5O7ocxjUSAtWlk',
  authDomain: 'content-generator-app-efde2.firebaseapp.com',
  projectId: 'content-generator-app-efde2',
  storageBucket: 'content-generator-app-efde2.firebasestorage.app',
  messagingSenderId: '392811015722',
  appId: '1:392811015722:web:18882a9f31ac012b585d53',
  measurementId: 'G-BJC5BTNGPG'
}

const firebase = initializeApp(firebaseConfig)

export default firebase