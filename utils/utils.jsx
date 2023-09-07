import * as React from 'react';

export const mapOrders = (arr) => {
  return arr.map((order, index) => {
    const [city, agent, brick, amount, unit, , dateOfPayment, , , readiness, status] = order;
    return {number:index, city, agent, brick, amount, unit, dateOfPayment, readiness, status}
  })
}
