import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRE_BASE } from "@/constants/config";
import { NextResponse } from 'next/server';

export async function POST(request, response) {
  const app = initializeApp(FIRE_BASE);
  const db = getFirestore(app);
  const data = await request.json();
  const docRef = doc(db, "orders", data.id); 
  await getDoc(docRef, data); 
  return NextResponse.json({docRef});
}