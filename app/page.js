'use client'
import { Oaut } from '@/components/oaut/oaut';
import { OrdersList } from '@/components/orders-list/orders-list';
import React from 'react';




export default function Home() {

  return (
    <>
      <Oaut >
        <OrdersList />
      </Oaut>
    </>
  )
}
