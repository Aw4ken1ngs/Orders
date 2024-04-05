import React, { useEffect, useState, useMemo, createContext, useContext } from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";
import { AuthContext } from '@/contexts/auth-context';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const SingIn = () => {
  const { provider, auth } = useContext(AuthContext);
  const signIn = () => {
    console.log('signIn');
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem('access_token', token);
        console.log('credential', credential);
        // The signed-in user info.
        const user = result.user;
        console.log('result', result);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorMessage', errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return <Button color='primary' onClick={signIn}>Войти </Button> 
}