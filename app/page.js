'use client'
import { Oaut } from '@/components/oaut/oaut';
import { OrdersList } from '@/components/orders-list/orders-list';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ToolBar } from '@/components/toolbar/toolbar';


export default function Home() {

  const [newOrder, setNewOrder] = useState(null);

  const onOrderCreated = (createdOrder) => {
    console.log('Created order', createdOrder);
    setNewOrder(createdOrder);
  }

  return (
    <>
      <ToolBar onOrderCreated={onOrderCreated} />
      <Oaut newOrder={newOrder}>
        <OrdersList />
      </Oaut>
    </>
  )
}
