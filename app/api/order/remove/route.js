import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { FIRE_BASE } from "@/constants/config";
import { NextResponse } from 'next/server';

export async function DELETE(request, responce) {
  const app = initializeApp(FIRE_BASE);
  const db = getFirestore(app);
  const data = await request.json();
  const docRef = doc(db, "orders", data.id); 
  await deleteDoc(docRef);
  return NextResponse.json({docRef})
}