/**
 * order-simulator.js
 * @author Andrew Roberts
 */

import produce from "immer";
import faker from "faker";
import { orderSources, cancelReasons, financialStatus, fulfillmentStatus, posIds, shipping } from "./data";

const rootTopic = "order-simulator";

export function createOrderSimulator(publish, intervalMs) {
  let intervalId;
  let orderNumber = 0;

  function start() {
    intervalId = setInterval(() => {
      let mockOrderPlacedEvent = generateMockOrderPlacedEvent(getCurrentOrderNumber());
      publish(mockOrderPlacedEvent.topic, mockOrderPlacedEvent.payload, { qos: 1 });
      incrementOrderNumber();
    }, intervalMs);
  }

  function stop() {
    clearInterval(intervalId);
  }

  function getCurrentOrderNumber() {
    return orderNumber;
  }

  function incrementOrderNumber() {
    orderNumber++;
  }

  return produce({}, (draft) => {
    draft.start = start;
    draft.stop = stop;
  });
}

function generateMockOrderPlacedEvent(orderNumber) {
  let orderSource = orderSources[faker.random.number(orderSources.length - 1)];
  let isPosOrder = faker.random.boolean();
  let orderNamePrefix = isPosOrder ? posIds[faker.random.number(posIds.length - 1)] : "#";
  let cancelled = faker.random.boolean();
  let lineItems = new Array(3).fill(faker.finance.account());
  let shippingOption = shipping[faker.random.number(shipping.length - 1)];
  let total_price = faker.finance.amount();
  const salesTaxRate = 0.09;
  let tax_price = (total_price * salesTaxRate).toPrecision(2);

  return {
    topic: `${rootTopic}/orders/${orderSource}/`, // root/orders/{source}/{customer}/
    payload: {
      billing_address: faker.address.streetAddress(),
      cancelled,
      cancelled_at: cancelled ? new Date().toUTCString() : "",
      cancel_reason: cancelled ? cancelReasons[faker.random.number(orderSources.length - 1)] : "",
      created_at: new Date().toUTCString(),
      customer: faker.finance.account(),
      customer_name: faker.name.findName(),
      email: faker.internet.email(),
      financial_status: financialStatus[faker.random.number(orderSources.length - 1)],
      fulfillment_status: fulfillmentStatus[faker.random.number(orderSources.length - 1)],
      line_items: lineItems, // todo
      location: isPosOrder ? faker.address.streetAddress(true) : "online",
      name: `${orderNamePrefix}-${orderNumber}`,
      order_number: orderNumber,
      phone: faker.phone.phoneNumber(),
      shipping_address: faker.address.streetAddress(true),
      shipping_methods: shippingOption.method,
      shipping_price: shippingOption.price,
      tax_price,
      total_price,
    },
  };
}
