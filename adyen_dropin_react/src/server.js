require("dotenv").config();
const express = require('express');
const axios = require("axios");
const path = require('path');
const app = express();
const port = process.env.PORT || "8000";
const inventoryData = require("./inventory.json");
const jquery = require("jquery");
const { Client, Config, CheckoutAPI } = require("@adyen/api-library");
const { json } = require("body-parser");

// initialize state
let state = null;

// // import Credentials from environment variables
// const {
//     env: { ADYEN_API_KEY },
// } = process;

// Create Adyen API Client instance
const client = new Client({
    apiKey: ADYEN_API_KEY,
    environment: "TEST",
  });
  // Configure Adyen Client
  const config = new Config();
  config.apiKey = ADYEN_API_KEY;
  config.merchantAccount = "TestAccountNY";
  client.setEnvironment("TEST");

app.get('/', (req, res) => {
    return res.send('Hello World!');
});

app.get('/ping', (req, res) => {
    return res.send('pong');
});


app.listen(port, () => console.log(`server runnning on port ${port}`));