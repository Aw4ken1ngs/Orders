import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
 
export async function GET() {

  try {
    await kv.set('setExample', '123abc');
  } catch (error) {
    console.log('error', error)
  }

  // const user = await kv.hgetall('user:me');
  return NextResponse.json("user");

}