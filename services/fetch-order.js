import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, initializeFirestore, doc } from "firebase/firestore";
import { FIRE_BASE } from "@/constants/config";

export const fetchOrders = async () => {
  const firebaseApp = initializeApp(FIRE_BASE);
  const db = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
  });
  const ordersCollection = collection(db, "orders");
  const querySnapshot = await getDocs(ordersCollection);
  const ordersData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
  return ordersData;
};