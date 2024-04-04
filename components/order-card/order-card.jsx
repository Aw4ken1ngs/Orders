import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";
import { useStore } from "@/store";
import { removeOrder } from "@/services/order-remove";
import { fetchOrders } from "@/services/fetch-order";
import { DeleteIcon } from "@/images/icon/delete-icon";
import { SettingsIcon } from "@/images/icon/settings-icon";
import styles from './order-card.module.css';

export const OrderCard = (props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };
  const { OrderItem } = props;
  const { setOpenOrderModal, setSelectedOrder, setOrders } = useStore();

  const onRemoveOrder = () => {
    removeOrder(OrderItem.id).then(async () => {
      const data = await fetchOrders();
      console.log(data, 'data4567')
      setOrders(data);
      document.dispatchEvent(new CustomEvent('order:removed'))
      setShowDeleteConfirmation(false);
    });
  }
  console.log(OrderItem, 'OrderItem456')
  const onEditOrder = () => {
    setOpenOrderModal(true)
    setSelectedOrder(OrderItem)
  }

  return <Card key={props.number} className="max-w-[350px] min-w-[250px]">
    {showDeleteConfirmation && (
      <div className={styles.deleteConfirmation}>
        <p className={styles.deleteConfirmation_title}>Удалить этот заказ ?</p>
        <div className={styles.deleteConfirmation_buttons}>
          <Button onClick={onRemoveOrder}>Да</Button>
          <Button onClick={closeDeleteConfirmation}>Нет</Button>
        </div>
      </div>
    )}
    <CardHeader className="flex gap-3 ">
      <Image
        alt="nextui logo"
        height={40}
        radius="sm"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width={40}
      />
      <div className="flex flex-col">
        <p className="text-md">Заказ: {OrderItem.city}</p>
        <p className="text-small text-default-500">{OrderItem.organization}</p>
      </div>
      <div className={styles.buttons}>
        <Button isIconOnly aria-label="Редактировать" color="none" onClick={onEditOrder}>
          <SettingsIcon />
        </Button>
        <Button isIconOnly aria-label="Удалить" color="none" onClick={openDeleteConfirmation}>
          <DeleteIcon />
        </Button>
      </div>
    </CardHeader>
    <Divider />
    <CardBody>
      {OrderItem.products.map((product) => (
        <div key={product.id}>
          <p>{product.name} - {product.quantity} {product.unit}</p>
        </div>
      ))}
    </CardBody>
    <Divider />
    <CardFooter>
      <div className="card-footer">
        <p>Оплата: {OrderItem.dateOfPayment}</p>
        <p>Срок: {OrderItem.productionTime}</p>
        <p>Статус: {OrderItem.status}</p>
      </div>
    </CardFooter>
  </Card>
}