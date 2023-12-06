'use client'
import { Oaut } from '@/components/oaut/oaut';
import { OrderCard, OrdersList } from '@/components/orders-list/orders-list';
import React, { useEffect, useState } from 'react';
import { ToolBar } from '@/components/toolbar/toolbar';




export default function Home() {

  const [newOrder, setNewOrder] = useState(null);

  const onOrderCreated = (createdOrder) => {
    console.log('Created order', createdOrder);
    setNewOrder(createdOrder);
  }

  return (
    <>
      <Oaut newOrder={newOrder}>
        <OrdersList />
      </Oaut>
      <ToolBar onOrderCreated={onOrderCreated} />
    </>
  )
}
