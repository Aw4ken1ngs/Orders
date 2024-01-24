import React, { useState } from 'react';
import { Input, Listbox, ListboxItem } from '@nextui-org/react';

// const products = [
//   {
//     id: 1,
//     name: "Кирпич Микс",
//     price: 89.25,
//     unit: "шт"
//   },
//   {
//     id: 2,
//     name: "Кирпич Хуй",
//     price: 89.25,
//     unit: "шт"
//   },
//   {
//     id: 3,
//     name: "Плитка Микс",
//     price: 89.25,
//     unit: "шт"
//   },
//   {
//     id: 4,
//     name: "плитка Хуй",
//     price: 89.25,
//     unit: "шт"
//   },
//   {
//     id: 5,
//     name: "углы Микс",
//     price: 89.25,
//     unit: "шт"
//   }
// ];

export const AutoSuggest = ({ products, onProductSelected }) => {
  const [inputState, setInputState] = useState('');
  const [showList, setShowList] = useState(false);

  const onChange = (event) => {
    setInputState(event.target.value);
    setShowList(true);
  };

  const addToList = (productName) => {
    onProductSelected(productName);
    setInputState('');
    setShowList(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(inputState.toLowerCase())
  );

  return (
    <>
      <Input
        value={inputState}
        onChange={onChange}
        type="text"
        label="Поиск номенклатуры"
      />
      {showList && filteredProducts.length > 0 && filteredProducts.length > 0 && (
        <Listbox>
          {filteredProducts.map((product) => (
            <ListboxItem key={product.id} onClick={() => addToList(product.name)}>
              {product.name}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </>
  );
};