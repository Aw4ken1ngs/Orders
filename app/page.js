'use client'
import * as React from 'react';
import { OrderCard } from '@/components/order-card/order-card';
import { MainInput } from '@/components/main-input';

export default function Home() {
  return (
    <>
    <MainInput/>
    <OrderCard/>
    </>
  )
}
