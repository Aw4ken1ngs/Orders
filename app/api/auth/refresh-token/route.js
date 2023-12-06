import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { kv } from '@vercel/kv';

const CLIENT_ID = '445389393504-965rm4qnvov159r3ek9h3sbva5et2pa4.apps.googleusercontent.com';
const CS = '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';

// export async function GET(request, context) {

//   const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CS,
//     'postmessage'
//   );
 

//   const url = new URL(request.url);
//   const email = url.searchParams.get('email');
//   let refresh_token = '';
//   try {
//     refresh_token = await kv.get(`${email}:refresh_token`);
//     console.log('refresh token', refresh_token);
//   } catch (error) {
//     console.log('error', error)
//   }

//   oauth2Client.setCredentials({
//      refresh_token
//   });
//   let response = await oauth2Client.refreshAccessToken();


//   return NextResponse.json({ access_token: response.credentials.access_token });
// }

export async function GET(request, context) {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CS,
    'postmessage'
  );

  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  let refresh_token = '';
  try {
    refresh_token = await kv.get(`${email}:refresh_token`);
    console.log('refresh token', refresh_token);
  } catch (error) {
    console.log('error', error);
  }

  oauth2Client.setCredentials({
    refresh_token,
  });

  try {
    let response = await oauth2Client.refreshAccessToken();

    // Обновление access_token в localStorage
    localStorage.setItem('access_token', response.credentials.access_token);

    return NextResponse.json({ access_token: response.credentials.access_token });
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return NextResponse.error(error);
  }
}