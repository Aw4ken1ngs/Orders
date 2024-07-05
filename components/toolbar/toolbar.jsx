import { useDisclosure, NavbarContent, NavbarItem} from "@nextui-org/react";
import { OrderForm } from "../order-form/order-form";
import Successfully from "../successfully/successfully";
import { useEffect, useState } from "react";
import { useStore } from "@/store";



export const ToolBar = (props) => {

const { isOpen: isSuccessfullyOpen, onOpen, onOpenChange } = useDisclosure();
const [status, setStatus] = useState('');
const { userData } = useStore();

useEffect(()=>{
document.addEventListener('order:removed', ()=>{onOrderStatusUpdate('removed')})
}, [])
const onOrderStatusUpdate = (orderStatus) => {
setStatus(orderStatus)
onOpen()
}
console.log(userData, 'ggggg')

return (
  <NavbarContent>
      <Successfully isOpen={isSuccessfullyOpen} onOpenChange={onOpenChange} status={status}/>
      <NavbarItem>
     {userData?.userData.role === 'admin' ? <OrderForm onOrderStatusUpdate={onOrderStatusUpdate}/> : null}
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