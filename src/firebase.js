import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCZg6M4j64p3qF7EcDFAecGuN0I3xK4d8Y",
  authDomain: "spurs-portal.firebaseapp.com",
  projectId: "spurs-portal",
  storageBucket: "spurs-portal.firebasestorage.app",
  messagingSenderId: "69806081031",
  appId: "1:69806081031:web:09bff84eebcf4d83bb16a2"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// @spurs-inc.com のみ許可
googleProvider.setCustomParameters({
  hd: 'spurs-inc.com'
})
