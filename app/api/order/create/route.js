import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { FIRE_BASE } from "@/constants/config";
import { NextResponse } from 'next/server';

export async function POST(request, responce) {
  const app = initializeApp(FIRE_BASE);
  const db = getFirestore(app);
  const data = await request.json();
  const docRef = await addDoc(collection(db, "orders"), data);
  return NextResponse.json({id: docRef.id})
  // console.log("Document written with ID: ", docRef.id);
}