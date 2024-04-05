import Script from 'next/script';
import React, { useEffect, useState, useMemo, createContext, useContext } from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";
import styles from './oaut.module.css';
import { createOrder } from '@/services/set-data-google-sheets-api';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '@/contexts/auth-context';
import Skeleton from '../skeleton/skeleton';
import { fetchOrders } from "@/services/fetch-order";

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
  
  const isUserAuthorized = useMemo(() => {
    return Boolean(accessToken);
  }, [accessToken])
  
  
   const { provider, auth } = useContext(AuthContext);
   console.log(provider, 'provider----------------------' )
    // const signIn = () => {
    //   console.log('signIn');
    //   signInWithPopup(auth, provider)
    //     .then((result) => {
    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       const credential = GoogleAuthProvider.credentialFromResult(result);
    //       const token = credential.accessToken;
    //       localStorage.setItem('access_token', token);
    //       console.log('credential', credential);
    //       // The signed-in user info.
    //       const user = result.user;
    //       console.log('result', result);
    //       // IdP data available using getAdditionalUserInfo(result)
    //       // ...
    //     }).catch((error) => {
    //       // Handle Errors here.
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       console.log('errorMessage', errorMessage);
    //       // The email of the user's account used.
    //       const email = error.customData.email;
    //       // The AuthCredential type that was used.
    //       const credential = GoogleAuthProvider.credentialFromError(error);
    //       // ...
    //     });
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
//  for googlesheets
  // const fetchOrders = async () => {
  //   try {
  //     console.log('fetchOrders23----------')
  //     const accessToken = localStorage.getItem('access_token');
  //     if (!accessToken) {
  //       console.error('Access token is missing.');
  //       return;
  //     }
  
  //     gapi.client.setToken({ access_token: accessToken })
  
  //     const response = await gapi.client.sheets.spreadsheets.values.get({
  //       spreadsheetId: '1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E',
  //       range: "'Долги по заказам'!A2:K",
  //     });

  //     return response;
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
  // }

  return (
    <div className={styles.container}>
      <ButtonGroup>
        {/* <Button color='primary' onClick={fetchOrders()}>Обновить</Button> */}
        {/* <Button color='primary' onClick={signIn}>войти </Button> */}
        <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>
      </ButtonGroup>
      {gapiInited && gisInited ? props.children : <Skeleton/>}
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
// import React, { useEffect, useState, useMemo } from 'react';
// import { Button, ButtonGroup } from "@nextui-org/react";
// import styles from './oaut.module.css';
// import { createOrder } from '@/services/set-data-google-sheets-api';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// export const Oaut = (props) => {
  
//   const [accessToken, setAccessToken] = useState('');
  
//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     setAccessToken(token);
//   }, []);
  
//   useEffect(() => {
//     if (props.newOrder) {
//       const data = Object.values(props.newOrder);
//       createOrder('1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E', "'Долги по заказам'!A2:K", data);
//     }
//   }, [props.newOrder]);

//   const isUserAuthorized = useMemo(() => {
//     return Boolean(accessToken);
//   }, [accessToken])

//   const auth = getAuth();
//   const provider = new GoogleAuthProvider();
//   const signIn = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         localStorage.setItem("access_token", token);
//         console.log('credential', credential);
//         const user = result.user;
//         console.log('result', result);
//       }).catch((error) => {
//         console.error('Error during Firebase signIn:', error);
//       });
//   }

//   return (
//     <div className={styles.container}>
//       <ButtonGroup>
//         <Button color='primary' onClick={signIn}>Войти</Button>
//       </ButtonGroup>
      
//       {isUserAuthorized ? props.children : <div>Загрузка ...</div>}
//     </div>
//   )
// }