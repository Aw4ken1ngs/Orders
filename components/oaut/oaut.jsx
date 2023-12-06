import Script from 'next/script';
import React, { useEffect, useState, useMemo } from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";
import styles from './oaut.module.css';
import { createOrder } from '@/services/set-data-google-sheets-api';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

let tokenClient = null;
let client = null;
const CLIENT_ID = '445389393504-965rm4qnvov159r3ek9h3sbva5et2pa4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA-og7qzrQ-aG8MSDB9jYEMuigHMrr5O2g';
const SCOPES = 'email profile https://www.googleapis.com/auth/spreadsheets';
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// React-компонент обеспечивает авторизацию пользовател�� с помощью Google Oauth2, полу��ение данных из определенной таблицы Google Sheets и вывод полученных результатов на экран
export const Oaut = (props) => {

  const [authorizeButton, setAuthorizeButton] = useState(false);
  const [signOutButton, setSignOutButton] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyA-og7qzrQ-aG8MSDB9jYEMuigHMrr5O2g",
    authDomain: "orders-397119.firebaseapp.com",
    projectId: "orders-397119",
    storageBucket: "orders-397119.appspot.com",
    messagingSenderId: "445389393504",
    appId: "1:445389393504:web:1bc4ee9be6782f2d3bbd05",
    measurementId: "G-4JGKNXCYPY"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (props.newOrder) {
      const data = Object.values(props.newOrder);
      createOrder('1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E', "'Долги по заказам'!A2:K", data);
      console.log('jsdfsafdlksajfsadjflksadjflkdsajflksadjflksadjflksadfslkdfjlsajflsajfladsjfldsafjlsadjfladsjfldsak')
    }
  }, [props.newOrder]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const accessToken = user.accessToken;
        setAccessToken(accessToken);
      } else {
        setAccessToken('');
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const isUserAuthorized = useMemo(() => {
    return Boolean(accessToken);
  }, [accessToken]);

  // const handleAuthClick = () => {
  //   client.requestCode();
  // }

  // const handleSignoutClick = () => {
  //   const token = gapi.client.getToken();

  //   if (token !== null) {
  //     google.accounts.oauth2.revoke(token.access_token);
  //     gapi.client.setToken('');
  //     setContent('');
  //     setSignOutButton(false);
  //   }
  // }

  const handleAuthClick = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSignoutClick = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      setAuthorizeButton(true);
    }
  }

  function initClient() {
    client = google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      ux_mode: 'popup',
      access_type: 'offline',
      callback: (response) => {
        // http://localhost:3000/api/auth/code
        console.log('super response 23', response);

        fetch(`/api/auth/token?code=${response.code}`, {
          method: "GET"
        }).then(response => {

          return response.json();
        }).then(data => {
          console.log('---> data', data)
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("email", data.email);
        }).catch(error => {
          console.log('error', error);
        });
      },
    });
  }

  function gisLoaded() {
    initClient();
    setGisInited(true);
    maybeEnableButtons();
  }

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiInited(true);
    maybeEnableButtons();
  }

  // const fetchOrders = async () => {
  //   console.log('fetchOrders23')
  //   gapi.client.setToken({ access_token: localStorage.getItem('access_token') })

  //   const response = await gapi.client.sheets.spreadsheets.values.get({
  //     spreadsheetId: '1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E',
  //     range: "'Долги по заказам'!A2:K",
  //   });
  //   props.onOrdersloaded(response.result.values);
  //   return response;
  // }
  const fetchOrders = async () => {
    try {
      console.log('fetchOrders23')
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('Access token is missing.');
        return;
      }
  
      gapi.client.setToken({ access_token: accessToken })
  
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E',
        range: "'Долги по заказам'!A2:K",
      });
      
      props.onOrdersloaded(response.result.values);
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Обработка ошибки, например, вы можете вывести ошибку в консоль или показать пользователю сообщение
    }
  }

  return (
    <div className={styles.container}>
      <ButtonGroup>
        <Button color='primary' onClick={fetchOrders}>Обновить</Button>
        {(authorizeButton && !isUserAuthorized) && <Button color='primary' onClick={handleAuthClick}>Авторизироваться</Button>}
        <Button color='primary' onClick={handleAuthClick}>Авторизироваться</Button>
        <Button color='primary' onClick={handleSignoutClick}>Выйти</Button>

        <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>
      </ButtonGroup>
      {gapiInited && gisInited ? props.children : <div>Loading...</div>}
      <Script
        src="https://apis.google.com/js/api.js"
        strategy="lazyOnload"
        onLoad={gapiLoaded}
      />
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={gisLoaded}
      />
    </div>
  )
}
