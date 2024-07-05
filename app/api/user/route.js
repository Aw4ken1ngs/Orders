import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRE_BASE } from "@/constants/config";
import { NextResponse } from 'next/server';

export async function POST(request, response) {
  try {
  const app = initializeApp(FIRE_BASE);
  const db = getFirestore(app);
  const data = await request.json();
  const docRef = doc(db, "Users", data.id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const userData = docSnap.data();
    return NextResponse.json({ userData });
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
} 
  catch (error) {

    return NextResponse.json({ 
      error:{
      info: error.info,
      cause: error.cause,
      message: error.message,
      stack: error.stack
    } } 
      );
}
}