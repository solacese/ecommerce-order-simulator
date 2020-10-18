/**
 * index.js
 * @author Andrew Roberts
 */

// polyfill async
import "core-js/stable";
import "regenerator-runtime";

// app modules
import { createMqttClient } from "./mqtt-client";
import { createOrderSimulator } from "./order-simulator";

async function run() {
  let mqttClientConfig = {
    hostUrl: process.env.SOLACE_HOST_MQTT,
    options: {
      username: process.env.SOLACE_USERNAME,
      password: process.env.SOLACE_PASSWORD,
    },
  };

  let mqttClient = createMqttClient(mqttClientConfig);

  mqttClient = await mqttClient.connect().catch(() => {
    // handle retry logic here, for this simulator just blow up if connection fails
    console.error("Error connecting.");
    process.exit(1);
  });

  let orderSimulatorService = createOrderSimulator(mqttClient.publish, 100); // publish 10x a second
  orderSimulatorService.start();

  // run until sigint
  console.log("Running until a SIGINT signal is received...");
  process.stdin.resume();
  process.on("SIGINT", function () {
    console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+");
    console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+");
    process.exit();
  });
}

console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+");
console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+");
console.log(new Date().toLocaleTimeString());
console.log("Starting incrementer publisher...");

run();
