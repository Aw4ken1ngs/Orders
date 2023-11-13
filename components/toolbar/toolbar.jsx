import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import styles from './ToolBar.module.css';
import { sendMessage } from '@/services/whats-app';

export const ToolBar = ({onOrderCreated}) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialOrder = {
    city: "", organization: "", nomenclature: "", quantity: "", unit: "",
    amount: "", dateOfPayment: "", formOfPayment: "", area: "",
    productionTime: "", status: ""
  };
  const [order, setOrder] = useState(initialOrder);
  // const [orders, setOrders] = useState([]);
console.log('order', setOrder)
  const changeHandler = (e) => {
    setOrder({...order, [e.target.name]: e.target.value});
  };


  const submitHandler = () => {
    console.log('созданный массив', order)
    // setOrders([...orders, order]);
    onOrderCreated(order);
    setOrder(initialOrder);
    onOpenChange();
    sendMessage(order);
  };
  
  const inputsList = Object.keys(order).map((item, index) => 
    <Input
      key={index}
      clearable
      bordered
      fullWidth
      color="primary"
      size="lg"
      placeholder={item[0].toUpperCase() + item.slice(1)}
      value={order[item]}
      name={item}
      onChange={changeHandler}
    />
  );

  return (
    <div className={styles.container}>
      <Button onPress={onOpen} color="default">Создать заказ</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Создание заказа</ModalHeader>
              <ModalBody>
                {inputsList}
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
    </div>
  );
}

// const sendMessageToWhatsApp = () => {
//   const idInstance = '1103871293'; 
//   const apiTokenInstance = '9f6fae325b5645f19b05fd541acf9ae65a0c35fe5e4b4cfa8c'; 
//   const chatId = '79277733778@c.us'; 

//   const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

//   const payload = {
//     chatId,
//     message: JSON.stringify(orders), //<-----------------
//   };

//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.text())
//     .then((text) => {
//       console.log(text);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
// export const ToolBar = (props) => {

//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [visible, setVisible] = React.useState(false);
//   const [city, setCity] = React.useState("");
//   const [organization, setOrganization] = React.useState("");
//   const [nomenclature, setNomenclature] = React.useState("");
//   const [quantity, setQuantity] = React.useState("");
//   const [unit, setUnit] = React.useState("");
//   const [amount, setAmount] = React.useState("");
//   const [dateOfPayment, setDateOfPayment] = React.useState("");
//   const [formOfPayment, setformOfPayment] = React.useState("");
//   const [area, setArea] = React.useState("");
//   const [productionTime, setProductionTime] = React.useState("");
//   const [status, setStatus] = React.useState("");
//   const [orders, setOrders] = React.useState([]);

//   const handler = () => setVisible(true);
//   const closeHandler = () => {
//     setVisible(false);
//     console.log("closed");
//   };


//   const submitHandler = () => {
//     const newOrder = { city, organization, nomenclature, quantity, unit, amount, dateOfPayment, formOfPayment, area, productionTime, status };
//     console.log('созданный массив', newOrder)
//     setOrders([...orders, newOrder]);
//     closeHandler();
//     props.onOrderCreated(newOrder);
//   };

//   return (
//     <div className={styles.container}>
//       <Button onPress={onOpen} color="default">Создать заказ</Button>
//       <Modal
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//         placement="top-center"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Создание заказа</ModalHeader>
//               <ModalBody>
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Город"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Организация"
//                   value={organization}
//                   onChange={(e) => setOrganization(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Номенклатура"
//                   value={nomenclature}
//                   onChange={(e) => setNomenclature(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Количество"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Единица"
//                   value={unit}
//                   onChange={(e) => setUnit(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Сумма"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Дата оплаты"
//                   value={dateOfPayment}
//                   onChange={(e) => setDateOfPayment(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Форма оплаты"
//                   value={formOfPayment}
//                   onChange={(e) => setformOfPayment(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Площадка"
//                   value={area}
//                   onChange={(e) => setArea(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Срок изготовления"
//                   value={productionTime}
//                   onChange={(e) => setProductionTime(e.target.value)}
//                 />
//                 <Input
//                   clearable
//                   bordered
//                   fullWidth
//                   color="primary"
//                   size="lg"
//                   placeholder="Статус"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                 />
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="flat" onPress={onClose}>
//                   Закрыть
//                 </Button>
//                 <Button color="success" onPress={submitHandler}>
//                   Создать
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }
