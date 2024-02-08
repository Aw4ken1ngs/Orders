import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Listbox, ListboxItem } from "@nextui-org/react";
import styles from './ToolBar.module.css';
import { ListboxWrapper } from "../order-form/listbox-wrapper";
import { AutoSuggest } from "../auto-suggest/auto-suggest";
import { fetchProduts as fetchProdutsService } from "@/services/products";
import { OrderForm } from "../order-form/order-form";



export const ToolBar = (props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // useEffect(() => {
  //   fetchProdutsService().then((data) => {
  //     console.log(data, 'data23');
  //     setProductsList(data)
  //   })
  // }, [])

  // const closeHandler = () => {
  //   setVisible(false);
  //   console.log("closed");
  // };


  // const submitHandler = () => {
  //   const newOrder = { city, organization, quantity, unit, amount, dateOfPayment, formOfPayment, area, productionTime, status };
  //   console.log('созданный массив', newOrder)
  //   setOrders([...orders, newOrder]);
  //   closeHandler();
  //   props.onOrderCreated(newOrder);
  // };

  // const [list, setList] = useState([]);

  // const addToList = (product) => {
  //   setList([...list, product])
  // }


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
                <OrderForm />
            </>
          )}
        </ModalContent>
      </Modal>
    </div >
  );
}