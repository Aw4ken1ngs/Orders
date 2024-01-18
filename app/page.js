'use client'
import { Oaut } from '@/components/oaut/oaut';
import { OrdersList } from '@/components/orders-list/orders-list';
import React, { useState } from 'react';
import { ToolBar } from '@/components/toolbar/toolbar';


export default function Home() {

  const [newOrder, setNewOrder] = useState(null);

  const onOrderCreated = (createdOrder) => {
    console.log('Created order', createdOrder);
    setNewOrder(createdOrder);
  }

  const [list, setList] = useState([]);
  const [inputState, setInputState] = useState('');
console.log(inputState, '<-------------')
  const onChange = (event) => {
    setInputState(event.target.value)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      setList([...list, event.target.value])
      setInputState('')
    }
  }

  return (
    <>
      <ToolBar onOrderCreated={onOrderCreated} />
      <Oaut newOrder={newOrder}>
        <OrdersList />
      </Oaut>
      <input value={inputState} onKeyDown={onKeyDown} onChange={onChange} type="text" style={{ backgroundColor: 'red' }}>
      </input>
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
    </>
  )
}
