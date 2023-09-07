import Script from 'next/script';
import React,{ useEffect, useState } from 'react';


let tokenClient = null;
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
    tokenClient.callback = async (resp) => {
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
    }
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

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
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
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E',
        range: "'Долги по заказам'!A1:K",
      });
      console.log("response", response)
      console.log("props", props)
      
      props.onOrdersloaded(response.rusult.values);
      console.log('->', props.onOrdersloaded(response.result.values));
     
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

      {authorizeButton && <button onClick={handleAuthClick}>Authorize</button>}
      {signOutButton && <button onClick={handleSignoutClick}>Sign Out</button>}

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