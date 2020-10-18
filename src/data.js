// data.js
// constants to help generate realistic looking mock data

export const orderSources = ["ecommerce", "shopify_us", "shopify_ca"];

export const cancelReasons = ["items_unavailable", "fraudulent_order", "customer_change"];

export const financialStatus = [
  "pending",
  "authorized",
  "paid",
  "partially_paid",
  "refunded",
  "partially_refunded",
  "voided",
];

export const fulfillmentStatus = ["fulfilled", "unfulfilled"];

export const posIds = ["POS-1", "POS-2", "POS-3", "POS-4", "POS-5"];

export const shipping = [
  {
    method: "flat_rate",
    price: "10.00",
  },
  {
    method: "priority_mail",
    price: "25.00",
  },
  {
    method: "home_delivery",
    price: "120.00",
  },
];
