// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXiODJ7uAzQog_Pg_uBSwJKjSzh22OjUI",
  authDomain: "crwd-clothing-db-ab08d.firebaseapp.com",
  projectId: "crwd-clothing-db-ab08d",
  storageBucket: "crwd-clothing-db-ab08d.appspot.com",
  messagingSenderId: "344394134921",
  appId: "1:344394134921:web:9ce38f50172f0755c71d58"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log("error creating the user", error.message)
    }
  }

  return userDocRef

  // if user data exists

  // if user data don't exist

  //return userDocRef
}
