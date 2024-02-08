import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA-og7qzrQ-aG8MSDB9jYEMuigHMrr5O2g",
  authDomain: "orders-397119.firebaseapp.com",
  projectId: "orders-397119",
  storageBucket: "orders-397119.appspot.com",
  messagingSenderId: "445389393504",
  appId: "1:445389393504:web:1bc4ee9be6782f2d3bbd05",
  measurementId: "G-4JGKNXCYPY"
};


const app = initializeApp(firebaseConfig);
const db1 = getFirestore(app);

export const ReadFromFirestore = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db1, "Products"));
        const dataArray = [];
        querySnapshot.forEach((doc) => {
          dataArray.push({ id: doc.id, ...doc.data() });
        });
        setData(dataArray);
        console.log(querySnapshot, 'querySnapshot=');
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); 
  console.log(data, )
  return (
    <div>
      <h2>Data from Firestore:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item.name)}</li>
        ))}
      </ul>
    </div>
  );
};
