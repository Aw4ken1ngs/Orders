import { NextResponse } from 'next/server';
import {google} from 'googleapis';
//const { google} = require('googleapis');
//import url from 'url';


const CLIENT_ID = '445389393504-965rm4qnvov159r3ek9h3sbva5et2pa4.apps.googleusercontent.com';
const CS = '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';

export async function GET(request, context) {

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CS,
        'postmessage'
    );


  //  oauth2Client.setCredentials(tokens);

//    const data = {tokens};
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    let { tokens } = await oauth2Client.getToken(code);
    console.log('tokens', tokens);
    const data = {tokens};

    return NextResponse.json({ data });

}