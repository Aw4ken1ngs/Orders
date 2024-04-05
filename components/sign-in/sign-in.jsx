import {AutoSuggest} from "@/components/auto-suggest/auto-suggest";
import React, { useEffect, useState, useMemo, createContext, useContext } from 'react';
import {
    Button,
    ButtonGroup,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader, Select, SelectItem,
    Table, TableBody, TableCell, TableColumn,
    TableHeader, TableRow, useDisclosure
} from "@nextui-org/react";
import { AuthContext } from '@/contexts/auth-context';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

export const SingIn = () => {
  const { provider, auth } = useContext(AuthContext);
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const [form, setForm] = useState({
        email: '',
        pass: ''
    });

    const onChange = (event) => {
        const {name, value} = event.target;

        setForm({
            ...form,
            [name]: value
        })
    }

    const signInWithEmail = () => {
        signInWithEmailAndPassword(auth, form.email, form.pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('user23', user);
                onClose();
                // ...
            })
            .catch((error) => {
                console.log('user24', error);
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


  const signInWithHoohle = () => {
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

    console.log('form23', form);
    return (
      <>
          <Button color='primary' onClick={onOpen}>Войти</Button>
          <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
              size="3xl"
          >
              <ModalContent>
                  <ModalBody>
                      <Input type="email" name="email" placeholder="Email" onChange={onChange}/>
                      <Input type="password" name="pass" placeholder="Пароль" onChange={onChange}/>
                      <Button onClick={signInWithEmail}>Войти</Button>
                      <br/>
                      <Button onClick={signInWithHoohle}>Войти через Хухл</Button>
                          </ModalBody>
              </ModalContent>
          </Modal>
      </>
  )
}