import React, { useState, useEffect } from "react";
import { Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Listbox, ListboxItem } from "@nextui-org/react";
import styles from './ToolBar.module.css';
import { ListboxWrapper } from "./listbox-wrapper";
import { AutoSuggest } from "../auto-suggest/auto-suggest";

const units = [
  {
    label: "Штуки", value: "шт."
  },
  {
    label: "Квадратный метр", value: "м2"
  }
];

const formOfPayments = [
  {
    label: "ЦК"
  },
  {
    label: "ИП"
  },
  {
    label: "Нал Алексей"
  },
  {
    label: "Нал Томара"
  }
];

const areas = [
  {
    label: "с. Неверкино", value: "Неверкино"
  },
  {
    label: "с. Камешкир", value: "Камешкир"
  },
  {
    label: "с. Подстепки", value: "Подстепки"
  }
];

const statusList = [{
  label: "в процессе", value: "в процессе"
},
{
  label: "готово", value: "готово"
},
{
  label: "просрочено", value: "просрочено"
}];
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

export const ToolBar = (props) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [visible, setVisible] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [nomenclature, setNomenclature] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [dateOfPayment, setDateOfPayment] = React.useState("");
  const [formOfPayment, setformOfPayment] = React.useState("");
  const [area, setArea] = React.useState("");
  const [productionTime, setProductionTime] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [orders, setOrders] = React.useState([]);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };


  const submitHandler = () => {
    const newOrder = { city, organization, quantity, unit, amount, dateOfPayment, formOfPayment, area, productionTime, status };
    console.log('созданный массив', newOrder)
    setOrders([...orders, newOrder]);
    closeHandler();
    props.onOrderCreated(newOrder);
  };

  const [list, setList] = useState([]);
  const [inputState, setInputState] = useState('');
  console.log(inputState, '<-------------')
  // const onChange = (event) => {
  //   setInputState(event.target.value)
  // }

  // const onKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     setList([...list, event.target.value])
  //     setInputState('')
  //   }
  // }

  const filteredProduct = products.filter(product => {
    return product.name.toLocaleLowerCase().match(new RegExp(inputState.toLocaleLowerCase()));
  });

  const addToList = (productName) => {
    setList([...list, productName])
    setInputState('')
  }


  return (
    <div className={styles.container}>
      <Button onPress={onOpen} color="default">Создать заказ</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Создание заказа</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input type="text"
                    label="Город"
                    value={city}
                    onChange={(event) => setCity(event.target.value)} />
                  <Input type="text" label="Организация" />
                </div>
                <AutoSuggest products={products} onProductSelected={addToList} />
                {list.length !== 0 ? (<ListboxWrapper>
                  <Listbox>
                    {list.map((item, index) => (
                      <ListboxItem key={index}>{item}</ListboxItem>
                    ))}
                  </Listbox>
                </ListboxWrapper>) : null}
                {inputState && <ListboxWrapper>
                  <Listbox>
                    {filteredProduct.map((product) => (
                      <ListboxItem onClick={() => addToList(product.name)} key={product.id}>
                        {product.name}
                      </ListboxItem>
                    ))}
                  </Listbox>
                </ListboxWrapper>
                }
                <Input
                  clearable
                  bordered
                  fullWidth
                  size="lg"
                  placeholder="Количество"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Select
                  label="Единица измерения"
                  className="max-w-100%"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  {units.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  clearable
                  bordered
                  size="lg"
                  placeholder="Сумма"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="w-full flex flex-row flex-wrap gap-4">
                  <Input
                    type="date"
                    clearable
                    bordered
                    className="max-w-[18%]"
                    size="lg"
                    label="Дата оплаты"
                    value={dateOfPayment}
                    onChange={(e) => setDateOfPayment(e.target.value)}
                  />
                  <Select
                    label="Форма оплаты"
                    className="max-w-[18%]"
                    value={formOfPayment}
                    onChange={(event) => setformOfPayment(event.target.value)}
                  >
                    {formOfPayments.map((formOfPayment) => (
                      <SelectItem key={formOfPayment.value} value={formOfPayment.value}>
                        {formOfPayment.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Площадка"
                    className="max-w-[18%]"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  >
                    {areas.map((area) => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="date"
                    clearable
                    bordered
                    className="max-w-[18%]"
                    size="lg"
                    label="Срок"
                    value={productionTime}
                    onChange={(e) => setProductionTime(e.target.value)}
                  />
                  <Select
                    label="Статус"
                    className="max-w-[18%]"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {statusList.map((statusItem) => (
                      <SelectItem key={statusItem.value} value={statusItem.value}>
                        {statusItem.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Закрыть
                </Button>
                <Button color="success" onPress={submitHandler}>
                  Создать
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div >
  );
}