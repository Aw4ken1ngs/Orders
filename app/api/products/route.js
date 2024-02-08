// import { NextResponse } from 'next/server';

// export async function GET() {
//   const product = {
//     id: 1,
//     name: "Кирпич Микс",
//     price: 89.25,
//     unit: "шт"
//   }
//   return NextResponse.json({ data: [product] })
// }
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIRE_BASE } from "@/constants/config";
import { NextResponse } from 'next/server';


export async function GET() {
  const app = initializeApp(FIRE_BASE);
  const db = getFirestore(app);


  const querySnapshot = await getDocs(collection(db, "Products"));
  const dataArray = [];
  querySnapshot.forEach((doc) => {
    dataArray.push({ id: doc.id, ...doc.data() });
  });
  
  return NextResponse.json( dataArray )

}