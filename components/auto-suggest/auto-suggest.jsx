import React, { useState } from 'react';
import { Input, Listbox, ListboxItem } from '@nextui-org/react';
import styles from './auto-suggest.module.css';



export const AutoSuggest = ({ onProductSelected, items}) => {
  const [inputState, setInputState] = useState('');

  console.log(items, 'items23')

  const onChange = (event) => {
    setInputState(event.target.value);
  };

  const filteredProducts = items.filter((product) =>
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
        <Listbox className={`${styles.list} bg-secondary-400`}>
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