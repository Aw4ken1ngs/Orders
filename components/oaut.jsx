import {error} from "next/dist/build/output/log";
import Script from 'next/script';
import React,{ useEffect, useState } from 'react';


let tokenClient = null;
let client = null;
let gapiInited = false;
let gisInited = false;
const CLIENT_ID = '445389393504-965rm4qnvov159r3ek9h3sbva5et2pa4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA-og7qzrQ-aG8MSDB9jYEMuigHMrr5O2g';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

export const Oaut = (props) => {

  const [authorizeButton, setAuthorizeButton] = useState(false);
  const [signOutButton, setSignOutButton] = useState(false);
  const [content, setContent] = useState('');


  const handleAuthClick = () => {
    client.requestCode();
/*    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      setSignOutButton(true);
      setAuthorizeButton(true);
      await listMajors();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }*/
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
      callback: (response) => {
        // http://localhost:3000/api/auth/code
        console.log('super response 23', response);

        fetch(`/api/auth/code?code=${response.code}`, {
          method: "GET"
        }).then(response => {
          return response.json();
        }).then(data => {
          console.log('data', data)
        }).catch(error => {
          console.log('error', error);
        });
        /*        var code_receiver_uri = 'YOUR_AUTHORIZATION_CODE_ENDPOINT_URI',
                    // Send auth code to your backend platform
                const xhr = new XMLHttpRequest();
                xhr.open('POST', code_receiver_uri, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.onload = function() {
                  console.log('Signed in as: ' + xhr.responseText);
                };
                xhr.send('code=' + response.code);*/
        // After receipt, the code is exchanged for an access token and
        // refresh token, and the platform then updates this web app
        // running in user's browser with the requested calendar info.
      },
    });
  }

  function gisLoaded() {
    initClient();
/*    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    */
    gisInited = true;
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
    gapiInited = true;
    maybeEnableButtons();
  }

  async function listMajors() {
    console.log("dssvds")
    let response;

    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E',
        range: "'Долги по заказам'!A1:K",
      });

      props.onOrdersloaded(response.result.values);
    } catch (err) {
      setContent(err.message);
      return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      setContent('No values found.');
      return;
    }
    // Flatten to string to display
    const output = range.values.reduce(
      (str, row) => `${str}${row[0]}, ${row[4]}\n`,
      'Name, Major:\n');
    setContent(output)
  }

  const fetchOrders = () => {
    gapi.client.setToken({access_token: 'ya29.a0AfB_byAuLThOE5C7L34XPyEp5dXswMMxPShrD04Gt0WA_2Ut35dS88ewB920vpQQCKY0gsiVn1hWvvNnXcwOjRh7WVWRfvYJg_LH47bSXL1TdHjL17b-PsFxClZS6hHA6gVNp9ToOBK-Vxu-TxoTa1YjgVys4AoN31KZhAaCgYKAeISARMSFQHsvYlsGBS5bbcl33m1pmJHOxwzDQ0173'});
    listMajors();
  }
 

  const AuthButton = () => {
    const handleAuthSuccess = (response) => {
      // Обработка успешной авторизации
      console.log(response);
    };

    const handleAuthFailure = (error) => {
      // Обработка ошибки авторизации
      console.error(error);
    };
  }

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <>

      <button onClick={fetchOrders}>fetch</button>
      {authorizeButton && <button onClick={handleAuthClick}>Authorize</button>}
      {signOutButton && <button onClick={handleSignoutClick}>Sign Out</button>}

      <div>{content}</div>
      <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>
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
    </>
  )
}