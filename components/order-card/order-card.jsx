import React from "react";
import { Card, green, Text, Image, Col, Row, Spacer, Container, Grid, } from "@nextui-org/react";
import Mix from "@/images/mix.jpg";
import Starina from "@/images/starina.jpg";
import { CheckSquareIcon } from "@/images/icon/check-square-icon";
import { XSquareIcon } from "@/images/icon/x-square-icon";
import { BankIcon } from "@/images/icon/bank-icon";
import { CalendarCheckIcon } from "@/images/icon/calendar-check-icon";

export const OrderCard = () => {
  console.log()
  const OrderItems = [
    {
      number: 1,
      src: Mix.src,
      city: 'Тольятти',
      brick: '1000шт Кирпич микс',
      tile: '25м2 плитка микс ',
      corner: '212шт углы микс',
      dateOfPayment: '26.06',
      readiness: '30.06'
    },
    {
      number: 2,
      src: Starina.src,
      city: 'Самара',
      brick: '1000шт Кирпич под старину',
      tile: '25м2 плитка под старину',
      corner: '212шт углы под старину',
      dateOfPayment: '08.06',
      readiness: '20.06'
    },
    {
      number: 2,
      src: Starina.src,
      city: 'Самара',
      brick: '1000шт Кирпич под старину',
      tile: '25м2 плитка под старину',
      corner: '212шт углы под старину',
      dateOfPayment: '08.06',
      readiness: '20.06'
    },
    {
      number: 2,
      src: Starina.src,
      city: 'Самара',
      brick: '1000шт Кирпич под старину',
      tile: '25м2 плитка под старину',
      corner: '212шт углы под старину',
      dateOfPayment: '08.06',
      readiness: '20.06'
    },
    {
      number: 2,
      src: Starina.src,
      city: 'Самара',
      brick: '1000шт Кирпич под старину',
      tile: '25м2 плитка под старину',
      corner: '212шт углы под старину',
      dateOfPayment: '08.06',
      readiness: '20.06'
    },
    {
      number: 2,
      src: Starina.src,
      city: 'Самара',
      brick: '1000шт Кирпич под старину',
      tile: '25м2 плитка под старину',
      corner: '212шт углы под старину',
      dateOfPayment: '08.06',
      readiness: '20.06'
    }
  ]

  return (
    <Grid.Container>
      {OrderItems.map((OrderItems) => {
        return <Grid key={OrderItems.number}><Card css={{ mw: '333px', ml: '80px', mt: '115px' }}>
          <Card.Header css={{ ai: 'start' }}>
            <Image
              src={OrderItems.src}
              width='50px'
              height='50px'
              alt='Кирпич микс'
              containerCss={{ m: '0px', pt: '20px', pl: '20px', pb: '0px' }}
            />
          </Card.Header>
          <Card.Body css={{ p: '0 20px 0 20px' }}>
            <Col>
              <Text h3 color="gray" css={{ ta: 'center', pb: '0px' }}>
                Заказ: {OrderItems.number} {OrderItems.city}
              </Text>
              <Text weight="bold">
                {OrderItems.brick}
              </Text>
              <Text weight="bold">
                {OrderItems.tile}
              </Text>
              <Text weight="bold">
                {OrderItems.corner}
              </Text>
            </Col>
            <Text css={{ d: 'flex', ai: 'center' }}>
              Статус:
              <CheckSquareIcon color='green' />
              <XSquareIcon color='red' />
            </Text>
          </Card.Body>
          <Card.Footer css={{ pt: '0px' }}>
            <Row>
              <Col>
                <Text color='gray' css={{ d: 'flex', ai: 'center', jc: 'center' }}>
                  <BankIcon color='grey' />
                  Оплата: {OrderItems.dateOfPayment}
                </Text>
              </Col>
              <Col>
                <Text color='gray' css={{ d: 'flex', ai: 'center', jc: 'center' }}>
                  <CalendarCheckIcon color='grey' />
                  Срок: {OrderItems.readiness}
                </Text>
              </Col>
            </Row>
          </Card.Footer>
        </Card></Grid>
      })}
    </Grid.Container>
  )
}


//AIzaSyA-og7qzrQ-aG8MSDB9jYEMuigHMrr5O2g