import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export const OrderCard = (props) => {
  const { OrderItem } = props;
  return <Card key={props.number} className="max-w-[350px] min-w-[250px]">
    <CardHeader className="flex gap-3">
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