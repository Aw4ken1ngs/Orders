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
              <p className="text-md">Заказ: {OrderItem.number}</p>
              <p className="text-small text-default-500">{OrderItem.city}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{OrderItem.brick}</p>
            <p>{OrderItem.tile}</p>
            <p>-{OrderItem.corner}</p>
            <p>Статус: -</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="card-footer">
              <p>Оплата: {OrderItem.dateOfPayment}</p>
              <p>Срок: {OrderItem.readiness}</p>
            </div>
          </CardFooter>
        </Card>
}