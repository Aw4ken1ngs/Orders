import React, { useState, useEffect } from "react";
import { mapOrders } from "@/utils/utils";
import styles from './order-list.module.css';
import { OrderCard } from "../order-card/order-card";
import { fetchRetry } from "@/utils/fetch-retry";
import { getRefreshToken } from "@/services/get-refresh-token";

  // Функция fetchOrders для установки токена доступа и вызова функции getDataGoogleSheets.

export const OrdersList = () => {
const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    console.log('fetchOrders23 ===0000')
    gapi.client.setToken({ access_token: localStorage.getItem('access_token') })

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1UXtPgQQASZE4D9pkxQxJPkLkSghtbJWi5EiVmOB5M9E',
      range: "'Долги по заказам'!A2:K",
    });
    setOrders(mapOrders(response.result.values));
    return response;
  }
  
  // useEffect(() => {
  //   fetchRetry(async () => {
  //     await fetchOrders()
  //   },
  //     async (err) => {
  //       if (err.status == 401) {
  //         return await getRefreshToken()
  //       }
  //     }, 5)
  // }, []);

  return (
    <div className={`${styles.container} gap-4 grid grid-cols-2 sm:grid-cols-3`}>
      {orders.map((OrderItem, index) => {
        return <OrderCard key={index} OrderItem={OrderItem}/>;
      })}
    </div>
  )
}