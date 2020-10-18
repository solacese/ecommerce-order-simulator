# ecommerce-order-simulator

This simulator publishes order objects based off the [Shopify order object](https://shopify.dev/docs/themes/liquid/reference/objects/order) via MQTT on an interval.

# Table of contents

- [Getting started](#getting-started)
- [Payload structure](#payload-structure)
- [Resources](#resources)

# Getting started

Follow the instructions in (.EDIT-ME.env)[.EDIT-ME.env] and then run:

```
git clone git@github.com:solacese/ecommerce-order-simulator.git
cd ecommerce-order-simulator

set -a
source .env
set +a

docker build . -t ecommerce-simulator

docker run --env-file ./.env ecommerce-simulator
```

> :warning: Did you rename the file to .env and fill out the connection details? If you don't, your run command will fail with a "Failed to connect" error from the client.

# Payload structure

> **Note**: Not all the Shopify order object properties are implemented, e.g. cancel_reason_label, and some are implemented in an incomplete fashion, e.g. customer is just a string instead of an object.

### billing_address

The billing address of the order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-billing_address

### cancelled

True if an order is canceled, or false if it is not.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-cancelled

### cancelled_at

The timestamp of when an order was canceled. Use the date filter to format the timestamp.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-cancelled_at

### cancel_reason

One of the following cancellation reasons, if an order was canceled:

- items unavailable
- fraudulent order
- customer changed/cancelled order
- other.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-cancel_reason

### created_at

The timestamp of when an order was created. Use the date filter to format the timestamp.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-created_at

This simulator uses the timestamp of when the message is being sent.

### customer

The customer associated with the order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-customer

This simulator uses a random account number represented as a string.

### customer_name

This is not a property on the Shopify order object, but I'm adding it because there's no customer objects for the customer ID and having a customer_name is useful in GUIs.

### email

The email address associated with an order, if it exists.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-email

### financial_status

The financial status of an order. The possible values are:

- pending
- authorized
- paid
- partially_paid
- refunded
- partially_refunded
- voided

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-financial_status

### fulfillment_status

The fulfillment status of an order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-fulfillment_status

In this simulator the possible values are:

- unfulfilled
- fulfilled

### line_items

An array of line items for the order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-line_items

Line items in this simulator are a random number generator represented as a string.

### location

(POS only) The physical location of the order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-location

Each order in this simulator gets a random origin of either online or POS. If it's POS, the location is a random address. If it's online, it's "online".

### name

The name of the order in the format set in the Standards and formats section of the General settings of your Shopify admin

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-name

This seems to be useful for identifying and grouping by POS or order location. This simulator implements this property by attaching a location specific prefix to the incrementing order number.

### order_number

The integer representation of the order name.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-order_number

This simulator starts at 0 and starts incrementing.

### phone

The phone number associated with an order, if it exists.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-phone

### shipping_address

The shipping address of the order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-shipping_address

### shipping_methods

An array of shipping_method variables from the order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-shipping_methods

In this simulator the possible values are:

- flat-rate
- priority-mail
- home-delivery

### shipping_price

The shipping price of an order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-shipping_price

In this simulator the values are static and tied to the shipping method.

### tax_price

The order's tax price.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-tax_price

### total_price

The total price of an order.

https://shopify.dev/docs/themes/liquid/reference/objects/order#order-total_price

# Resources

For more information try these resources:

- Shopify's [developer site](https://shopify.dev/concepts/shopify-introduction)
- The Solace [Developer Portal](https://solace.dev)
- Get a better understanding of [Solace Event Brokers](https://solace.com/products/event-broker/)
- Ask the [Solace community](https://solace.community/) for help
- Check out the [Solace blog](https://solace.com/blog/) for other interesting discussions around Solace technology
