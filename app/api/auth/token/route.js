import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { kv } from '@vercel/kv';


const CLIENT_ID = '445389393504-965rm4qnvov159r3ek9h3sbva5et2pa4.apps.googleusercontent.com';
const CS = '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';

export async function GET(request, context) {


  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CS,
    'postmessage'
  );

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  let res = await oauth2Client.getToken(code);
  let userInfo = await oauth2Client.getTokenInfo(res.tokens.access_token);
  kv.set(`${userInfo.email}:refresh_token`, res.tokens.refresh_token);
  console.log('------------------------userInfo---------------------', userInfo)
  return NextResponse.json({ email: userInfo.email , access_token: res.tokens.access_token });
}