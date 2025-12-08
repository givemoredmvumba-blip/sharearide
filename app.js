 
// /**
//  * Copyright (c) Meta Platforms, Inc. and affiliates.
//  *
//  * This source code is licensed under the MIT license found in the
//  * LICENSE file in the root directory of this source tree.
//  */

// import express from "express";
// import axios from "axios";
// import * as fs from 'fs'; 
// import path from 'path';  

// const app = express();
// app.use(express.json());

// const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;

// function createRandomString(length) {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// }


// app.post("/webhook", async (req, res) => {
//   // log incoming messages
//   console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

//   // check if the webhook request contains a message
//   // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
//   const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
//    // extract the business number to send the reply from it
//     const business_phone_number_id =
//       req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
//     const username = req.body.entry?.[0]?.changes[0]?.value?.contacts?.[0];

//           await axios({
//                 method: "POST",
//                 url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
//                 headers: {
//                   Authorization: `Bearer ${GRAPH_API_TOKEN}`,
//                 },
//                 data: {
//                   messaging_product: "whatsapp",
//                   to: message.from,
//                   text: { 
//                     body: "Hi! "+ username.profile.name + "olas"
//                   },
//                   context: {
//                     message_id: message.id, // shows the message as a reply to the original user message
                    
//                   },
//                 },
//               });
 
//   res.sendStatus(200);
// });


// // accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// // info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
// app.get("/webhook", (req, res) => {
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   // check the mode and token sent are correct
//   if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
//     // respond with 200 OK and challenge token from the request
//     res.status(200).send(challenge);
//     console.log("Webhook verified successfully!");
//   } else {
//     // respond with '403 Forbidden' if verify tokens do not match
//     res.sendStatus(403);
//   }
// });
// // async (req, res) => {
// app.get("/", (req, res) => {
//   res.send(`<pre>Nothing to see here.
// Checkout README.md to start.</pre>`);
// });



// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });


// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
