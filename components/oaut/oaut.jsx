import Script from 'next/script';
import React, { useEffect, useState, useMemo } from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";
import styles from './oaut.module.css';
import { getRefreshToken } from '@/services/get-refresh-token';
import { createOrder } from '@/services/set-data-google-sheets-api';

let tokenClient = null;
let client = null;
const CLIENT_ID = '445389393504-965rm4qnvov159r3ek9h3sbva5et2pa4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA-og7qzrQ-aG8MSDB9jYEMuigHMrr5O2g';
const SCOPES = 'email profile https://www.googleapis.com/auth/spreadsheets';
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// React-компонент обеспечивает авторизацию пользователя с помощью Google Oauth2, получение данных из определенной таблицы Google Sheets и вывод полученных результатов на экран
export const Oaut = (props) => {

  const [authorizeButton, setAuthorizeButton] = useState(false);
  const [signOutButton, setSignOutButton] = useState(false);
  const [content, setContent] = useState('');
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
  },
    [props.newOrder]);

  useEffect(() => {
    if (gapiInited && gisInited) {
      fetchOrders()
    }
  }, [gapiInited]);

  const isUserAuthorized = useMemo(() => {
    return Boolean(accessToken);
  }, [accessToken]);

  const handleAuthClick = () => {
    client.requestCode();
  }
  const handleSignoutClick = () => {
    const token = gapi.client.getToken();

    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      setContent('');
      setSignOutButton(false);
    }
  }

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

  //Функция getDataGoogleSheets для получения данных из Google Sheets с использованием API и обновления значений на основе полученных данных.
  async function fetchRetry(cb, failCb, limit) {
    let attempts = 0;
    let retryCount = 0; 
    console.log("Starting...")

    while (attempts < limit) {
      try {
        cb();
        return;
      } catch (err) {
        if (err.status == 401 && retryCount < 3) {

          console.log('-----------------', err.status)
          await failCb();
          await cb();
          retryCount++;
          attempts++;
        } else {
          setContent(err.message);
          console.log(err)
        }
      }
      return;
    }


    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      setContent('No values found.');
      return;
    }
    const output = range.values.reduce(
      (str, row) => `${str}${row[0]}, ${row[4]}\n`,
      'Name, Major:\n');
    setContent(output)
    return;
  }

  // Функция fetchOrders для установки токена доступа и вызова функции getDataGoogleSheets.
  const fetchOrders = async () => {
    gapi.client.setToken({ access_token: localStorage.getItem('access_token') })

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E',
      range: "'Долги по заказам'!A2:K",
    });

    props.onOrdersloaded(response.result.values);
  }

  fetchRetry(() => {
    fetchOrders()
  }, 
  () => {
   getRefreshToken()
  }, 5)

  return (
    <div className={styles.container}>
      <ButtonGroup>
        <Button color='primary' onClick={fetchOrders}>Обновить</Button>
        {(authorizeButton && !isUserAuthorized) && <Button color='primary' onClick={handleAuthClick}>Авторизироваться</Button>}
        <Button color='primary' onClick={handleAuthClick}>Авторизироваться2</Button>
        <Button color='primary' onClick={handleSignoutClick}>Выйти</Button>
        <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>
      </ButtonGroup>
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
