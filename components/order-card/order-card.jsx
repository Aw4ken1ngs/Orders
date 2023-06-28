import React from "react";
import { Card, green, Text, Image, Col, Row, Spacer, Container } from "@nextui-org/react";
import Mix from "@/images/mix.jpg"
import { CheckSquareIcon } from "@/images/icon/check-square-icon";
import { XSquareIcon } from "@/images/icon/x-square-icon";
import { BankIcon } from "@/images/icon/bank-icon";
import { CalendarCheckIcon } from "@/images/icon/calendar-check-icon";

export const OrderCard = () => {
  return (
    <Card css={{ mw: '333px', ml: '80px', mt: '115px' }}>
      <Card.Header css={{ ai: 'start' }}>
        <Image
          src={Mix.src}
          width='50px'
          height='50px'
          alt='Кирпич микс'
          containerCss={{ m: '0px', pt: '20px', pl: '20px', pb: '0px' }}
        />
      </Card.Header>
      <Card.Body css={{ p: '0 20px 0 20px' }}>
        <Col>
          <Text h3 color="gray" css={{ ta: 'center', pb: '0px' }}>
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
        <Text css={{ d: 'flex', ai: 'center' }}>
          Статус:
          <CheckSquareIcon color='green'/>
          <XSquareIcon color='red'/>
        </Text>
      </Card.Body>
      <Card.Footer css={{ pt: '0px' }}>
        <Row>
          <Col>
            <Text color='gray' css={{ d: 'flex', ai: 'center', jc: 'center' }}>
              <BankIcon color='grey'/>
              Оплата: 26.06
            </Text>
          </Col>
          <Col>
            <Text color='gray' css={{ d: 'flex', ai: 'center', jc: 'center' }}>
              <CalendarCheckIcon color='grey'/>
              Срок: 30.06
            </Text>
          </Col>
        </Row>
      </Card.Footer>
    </Card>);

}