import React from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from '../FirebaseConfig'


export default function useFirebaseAuth() {
   // VARIABLES
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const Googleprovider = new GoogleAuthProvider();
   const Facebookprovider = new FacebookAuthProvider();

   // FUNCTIONS

   function SignupUser(email, password) {
      return new Promise((res, rej) => {
         createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               // Signed up 
               const user = userCredential.user;
               // ...
               console.log(user)
               res(user)
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               // ..
               console.log(errorCode)
               console.log(errorMessage)
               rej(errorMessage)
            });
      })
   }

   function SigninUser(email, password) {
      return new Promise((res, rej) => {
         signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               // Signed in 
               const user = userCredential.user;
               // ...
               console.log(user)
               res(user)
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               // ...
               console.log(errorCode)
               console.log(errorMessage)
               rej("Invalid or Wrong Credentials.")
            });
      })
   }

   function AuthStateObserver() {
      return new Promise((res, rej) => {
         onAuthStateChanged(auth, (user) => {
            if (user) {
               // User is signed in, see docs for a list of available properties
               // https://firebase.google.com/docs/reference/js/auth.user
               const uid = user.uid;
               // ...
               console.log("Uid: " + uid)
               res(uid)

            } else {
               // User is signed out
               // ...
               console.log("User is Signed out")
            }
         });
      })
   }

   function GoogleSignIn() {
      return new Promise((res, rej) => {
         signInWithPopup(auth, Googleprovider)
            .then((result) => {
               // This gives you a Google Access Token. You can use it to access the Google API.
               const credential = GoogleAuthProvider.credentialFromResult(result);
               const token = credential.accessToken;
               // The signed-in user info.
               const user = result.user;
               // IdP data available using getAdditionalUserInfo(result)
               // ...
               console.log(user)
               res(user)
            }).catch((error) => {
               // Handle Errors here.
               const errorCode = error.code;
               const errorMessage = error.message;
               // The email of the user's account used.
               const email = error.customData.email;
               // The AuthCredential type that was used.
               const credential = GoogleAuthProvider.credentialFromError(error);
               // ...
               console.log(errorCode)
               console.log(errorMessage)
               rej(errorCode, errorMessage)
            });
      })
   }

   function FacebookSignIn() {
      return new Promise((res, rej) => {
         signInWithPopup(auth, Facebookprovider)
            .then((result) => {
               // The signed-in user info.
               const user = result.user;

               // This gives you a Facebook Access Token. You can use it to access the Facebook API.
               const credential = FacebookAuthProvider.credentialFromResult(result);
               const accessToken = credential.accessToken;

               // IdP data available using getAdditionalUserInfo(result)
               // ...
               console.log(user)
               res(user)
            })
            .catch((error) => {
               // Handle Errors here.
               const errorCode = error.code;
               const errorMessage = error.message;
               // The email of the user's account used.
               const email = error.customData.email;
               // The AuthCredential type that was used.
               const credential = FacebookAuthProvider.credentialFromError(error);

               // ...
               console.log(errorCode)
               console.log(errorMessage)
               rej(errorCode, errorMessage)
            });
      })
   }





   // RETURN
   return { SignupUser, SigninUser, AuthStateObserver, GoogleSignIn, FacebookSignIn }
}