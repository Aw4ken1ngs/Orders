import React, { useState } from 'react';
import { Input, Listbox, ListboxItem } from '@nextui-org/react';

import styles from './auto-suggest.module.css';

const products = [
  {
    id: 1,
    name: "Кирпич Микс",
    price: 89.25,
    unit: "шт"
  },
  {
    id: 2,
    name: "Кирпич Хуй",
    price: 89.25,
    unit: "шт"
  },
  {
    id: 3,
    name: "Плитка Микс",
    price: 89.25,
    unit: "шт"
  },
  {
    id: 4,
    name: "плитка Хуй",
    price: 89.25,
    unit: "шт"
  },
  {
    id: 5,
    name: "углы Микс",
    price: 89.25,
    unit: "шт"
  }
];

export const AutoSuggest = ({ onProductSelected }) => {
  const [inputState, setInputState] = useState('');

  const onChange = (event) => {
    setInputState(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(inputState.toLowerCase())
  );

  const onClick = (product) => {
    onProductSelected(product);
    setInputState('');
  }


  return (
    <div className={styles.container}>
      <Input
        value={inputState}
        onChange={onChange}
        type="text"
        label="Поиск номенклатуры"
      />
      {inputState.length > 2 && filteredProducts.length > 0 && (
        <Listbox className={`${styles.list} bg-secondary-100`}>
          {filteredProducts.map((product) => (
            <ListboxItem key={product.id} onClick={() => onClick(product)}>
              {product.name}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
};