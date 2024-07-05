import React, { useState, useContext } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  ButtonGroup
} from "@nextui-org/react";
import { AuthContext } from '@/contexts/auth-context';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { MailIcon } from '@/images/icon/mail-icon';
import { LockIcon } from '@/images/icon/lock-icon';
import { GoogleIcon } from '@/images/icon/google-icon';
import {apiUser} from "@/services/user";
import { async } from '@firebase/util';
import { useStore } from "@/store";

export const SingIn = () => {
  const { provider, auth } = useContext(AuthContext);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [form, setForm] = useState({
    email: '',
    pass: ''
  });
const { userData , setUserData } = useStore();

console.log("работай блядь ",userData)
  const onChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    })
  }


  async function fetchUserData(id) {
    try {
      const userData = await apiUser(id);
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, form.email, form.pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('user23', user.uid);
        fetchUserData(user.uid)
        onClose();
        // ...
      })
      .catch((error) => {
        console.log('user24', error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const signInWithGoogle = () => {
    console.log('signIn');
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem('access_token', token);
        console.log('credential', credential);
        // The signed-in user info.
        const user = result.user;
        await fetchUserData(user.uid)
        console.log('result', fetchUserData);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        onClose();
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
      <Button color='default' onClick={onOpen}>Войти</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Вход</ModalHeader>
              
              <ModalBody>
                <Input
                  onChange={onChange}
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Введите ваш email"
                  variant="bordered"
                  name="email"
                />
                <Input
                  onChange={onChange}
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Пароль"
                  placeholder="Введите ваш пароль"
                  type="password"
                  variant="bordered"
                  name="pass"
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onClick={signInWithGoogle}>
                  <GoogleIcon />
                  Войти через Гугл
                </Button>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Закрыть
                  </Button>
                  <Button color="default" onClick={signInWithEmail}>
                    Войти
                  </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}