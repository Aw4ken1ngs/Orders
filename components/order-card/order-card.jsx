import React from "react";
import { Card, green, Text, Image, Col, Row, Spacer, Container } from "@nextui-org/react";
import Mix from "@/images/mix.jpg"
import 'boxicons'


export const OrderCard = () => {
  return (
    <Card css={{ mw: '333px', ml: '80px', mt: '115px' }}>
      <Card.Header css={{ ai: 'start'}}>
        <Image
          src={Mix.src}
          width='50px'
          height='50px'
          alt='Кирпич микс'
          containerCss={{ m: '0px', pt: '20px', pl: '20px', pb: '0px'}}
        />
      </Card.Header>
      <Card.Body css={{p: '0px', pl: '20px'}}>
        <Col>
          <Text h3 color="gray" css={{ta: 'center', pb: '0px'}}>
            Заказ 1 Тольятти
          </Text>
          <Text weight="bold">
            1000шт кирпич Микс
          </Text>
          <Text weight="bold">
            25м2 плитка Микс
          </Text>
          <Text weight="bold">
            212шт. углов Микс
          </Text>
        </Col>
        <Text css={{d: 'flex', ai: 'center'}}>
          Статус: 
          <box-icon name='check-square' type='solid' color='green'></box-icon>
          <box-icon name='x-square' type='solid' color='red'></box-icon>
        </Text>
      </Card.Body>
      <Card.Footer >
        {/* <Row >
          <Text color='gray' css={{d: 'flex', ai: 'center'}}>
          <box-icon type='solid' name='bank' color='gray'></box-icon>
            Оплата: 26.06
          </Text>
        </Row>
        <Row>
          <Text color='gray' css={{d: 'flex', ai: 'center'}}>
          <box-icon name='calendar-check' type='solid' color='gray'></box-icon>
            Срок: 30.06
          </Text>
        </Row> */}
        <Text>dadsfdsa</Text>
      </Card.Footer>
    </Card>);

}