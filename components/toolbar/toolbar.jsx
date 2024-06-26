import { Modal, ModalContent, ModalHeader, Button, useDisclosure, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import styles from './ToolBar.module.css';
import { OrderForm } from "../order-form/order-form";
import { useStore } from "@/store";
import Successfully from "../successfully/successfully";
import { useEffect, useState } from "react";
import { Oaut } from "../oaut/oaut";

export const ToolBar = (props) => {

const { isOpen: isSuccessfullyOpen, onOpen, onOpenChange } = useDisclosure();
const [status, setStatus] = useState('');

useEffect(()=>{
document.addEventListener('order:removed', ()=>{onOrderStatusUpdate('removed')})
}, [])
const onOrderStatusUpdate = (orderStatus) => {
setStatus(orderStatus)
onOpen()
}

return (
  <NavbarContent>
      <Successfully isOpen={isSuccessfullyOpen} onOpenChange={onOpenChange} status={status}/>
      <NavbarItem>
      <OrderForm onOrderStatusUpdate={onOrderStatusUpdate}/>
      </NavbarItem>
    </NavbarContent>
  );
}
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