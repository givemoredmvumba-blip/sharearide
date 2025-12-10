   
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



// const express = require('express');
// const axios = require('axios');

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 10000;
// const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
// const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;

// // ---------------------------------------------------------
// // VERIFY WEBHOOK (GET)
// // ---------------------------------------------------------
// app.get('/webhook', (req, res) => {
//   const mode = req.query['hub.mode'];
//   const token = req.query['hub.verify_token'];
//   const challenge = req.query['hub.challenge'];

//   if (mode && token) {
//     if (mode === 'subscribe' && token === VERIFY_TOKEN) {
//       console.log("WEBHOOK_VERIFIED");
//       return res.status(200).send(challenge);
//     } else {
//       return res.sendStatus(403);
//     }
//   }
//   res.sendStatus(400);
// });

// // ---------------------------------------------------------
// // HANDLE MESSAGES (POST)
// // ---------------------------------------------------------
// app.post('/webhook', async (req, res) => {
//   console.log("Incoming message:", JSON.stringify(req.body, null, 2));

//   const entry = req.body.entry?.[0];
//   const changes = entry?.changes?.[0];
//   const value = changes?.value;
//   const message = value?.messages?.[0];

//   if (!message) return res.sendStatus(200);

//   // Extract info
//   const business_phone_number_id = value?.metadata?.phone_number_id;
//   const contact = value?.contacts?.[0];
//   const username = contact?.profile?.name || "there";

//   if (message.type === "text") {
//     try {
//       await axios.post(
//         `https://graph.facebook.com/v22.0/839312095934555/messages`,
//         {
//           messaging_product: "whatsapp",
//           to: message.from,
//           text: {
//             body:
//               "Hi! " + username + "\n\nWelcome to Flight Connect\n" +
//               "1. Book Bus To Johannesburg\n" +
//               "2. Book Bus To Gaborone\n" +
//               "3. Book Return Ticket"
//           },
//           context: {
//             message_id: message.id
//           }
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${GRAPH_API_TOKEN}`
//           }
//         }
//       );

//     } catch (err) {
//       console.error("ERROR sending message →", err.response?.data || err.message);
//     }
//   }

//   res.sendStatus(200);
// });

// // ---------------------------------------------------------
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));










// // Import Express.js
// const express = require('express');

// // Create an Express app
// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Set port and verify_token
// const port = process.env.PORT || 3000;
// const verifyToken = process.env.VERIFY_TOKEN;

// // Route for GET requests
// app.get('/', (req, res) => {
//   const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
//     console.log(JSON.stringify(req.body, null, 2));


//   if (mode === 'subscribe' && token === verifyToken) {
//     console.log('WEBHOOK VERIFIED');
//     res.status(200).send(challenge);
//   } else {
//     res.status(403).end();
//   }
// });

// // Route for POST requests
// app.post('/', (req, res) => {
//   const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
//   console.log(`\n\nWebhook received ${timestamp}\n`);
//   console.log(JSON.stringify(req.body, null, 2));
//     if (message.type === "text") {
//     try {
//       await axios.post(
//         `https://graph.facebook.com/v22.0/839312095934555/messages`,
//         {
//           messaging_product: "whatsapp",
//           to: message.from,
//           text: {
//             body:
//               "Hi! " + username + "\n\nWelcome to Flight Connect\n" +
//               "1. Book Bus To Johannesburg\n" +
//               "2. Book Bus To Gaborone\n" +
//               "3. Book Return Ticket"
//           },
//           context: {
//             message_id: message.id
//           }
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${GRAPH_API_TOKEN}`
//           }
//         }
//       );

//     } catch (err) {
//       console.error("ERROR sending message →", err.response?.data || err.message);
//     }
//   }

//   res.status(200).end();
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`\nListening on port ${port}\n`);
// });


// Import Express.js
// const express = require("express");
// const axios = require("axios");

// const app = express();
// app.use(express.json());

// // Set port and verify_token
// const port = process.env.PORT || 3000;
// const verifyToken = process.env.VERIFY_TOKEN;
// const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;

// // Route for GET requests (Webhook verification)
// app.get("/", (req, res) => {
//   const mode = req.query["hub.mode"];
//   const challenge = req.query["hub.challenge"];
//   const token = req.query["hub.verify_token"];

//   if (mode === "subscribe" && token === verifyToken) {
//     console.log("WEBHOOK VERIFIED");
//     return res.status(200).send(challenge);
//   } else {
//     return res.status(403).end();
//   }
// });

// // Route for POST requests (Webhook messages)
// app.post("/", async (req, res) => {
//   const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
//   console.log(`\n\nWebhook received ${timestamp}\n`);
//   console.log(JSON.stringify(req.body, null, 2));

//   // WhatsApp webhook message extraction
//   try {
//     const entry = req.body.entry?.[0];
//     const changes = entry?.changes?.[0];
//     const messages = changes?.value?.messages;

//     if (!messages || messages.length === 0) {
//       return res.sendStatus(200);
//     }

//     const message = messages[0];            // Actual message received
//     const from = message.from;              // User phone number
//     const username = message.profile?.name; // Username
//     const type = message.type;              // Message type

//     // Only respond to text messages
//     if (type === "text") {
//       await axios.post(
//         `https://graph.facebook.com/v22.0/864944980033077/messages`,
//         {
//           messaging_product: "whatsapp",
//           to: from,
//           text: {
//             body:
//               "1. Book Bus To Johannesburg\n" +
//               "2. Book Bus To Gaborone\n" +
//               "3. Book Return Ticket"
//           },
//           context: {
//             message_id: message.id
//           }
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${GRAPH_API_TOKEN}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       console.log("Reply sent!");
//     }

//     res.sendStatus(200);

//   } catch (err) {
//     console.error("ERROR processing webhook →", err);
//     res.sendStatus(500);
//   }
// });

// // Start server
// app.listen(port, () => {
//   console.log(`\nListening on port ${port}\n`);
// });


// Import Express.js
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;
const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || "864944980033077";

// API Base URL
const API_BASE_URL = "https://api.dev.sharearide.co.bw";

// In-memory user session storage (in production, use Redis or database)
const userSessions = {};

// Helper function to send WhatsApp message
async function sendWhatsAppMessage(to, message, messageId = null) {
  try {
    const payload = {
      messaging_product: "whatsapp",
      to: to,
      text: {
        body: message
      }
    };

    if (messageId) {
      payload.context = { message_id: messageId };
    }

    await axios.post(
      `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error sending WhatsApp message:", error.response?.data || error.message);
    throw error;
  }
}

// Helper function to send interactive list message
async function sendListMessage(to, header, body, footer, buttonText, sections, messageId = null) {
  try {
    const payload = {
      messaging_product: "whatsapp",
      to: to,
      type: "interactive",
      interactive: {
        type: "list",
        header: {
          type: "text",
          text: header
        },
        body: {
          text: body
        },
        footer: {
          text: footer
        },
        action: {
          button: buttonText,
          sections: sections
        }
      }
    };

    if (messageId) {
      payload.context = { message_id: messageId };
    }

    await axios.post(
      `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error sending list message:", error.response?.data || error.message);
    // Fallback to text message
    let fallbackText = `${header}\n\n${body}\n\n`;
    sections.forEach((section, idx) => {
      fallbackText += `${section.title}:\n`;
      section.rows.forEach((row, rowIdx) => {
        fallbackText += `${idx + 1}.${rowIdx + 1} ${row.title}\n`;
      });
    });
    await sendWhatsAppMessage(to, fallbackText, messageId);
  }
}

// Helper function to send button message
async function sendButtonMessage(to, body, buttons, messageId = null) {
  try {
    const payload = {
      messaging_product: "whatsapp",
      to: to,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: body
        },
        action: {
          buttons: buttons.map((btn, idx) => ({
            type: "reply",
            reply: {
              id: `btn_${idx}`,
              title: btn
            }
          }))
        }
      }
    };

    if (messageId) {
      payload.context = { message_id: messageId };
    }

    await axios.post(
      `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error sending button message:", error.response?.data || error.message);
    // Fallback to text message
    let fallbackText = `${body}\n\n`;
    buttons.forEach((btn, idx) => {
      fallbackText += `${idx + 1}. ${btn}\n`;
    });
    await sendWhatsAppMessage(to, fallbackText, messageId);
  }
}

// Initialize user session
function initUserSession(phoneNumber) {
  if (!userSessions[phoneNumber]) {
    userSessions[phoneNumber] = {
      state: "idle",
      data: {},
      step: null
    };
  }
  return userSessions[phoneNumber];
}

// API Functions
async function getCities() {
  try {
    const response = await axios.get(`${API_BASE_URL}/app/v1/city/all/0/40`);
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    return [];
  }
}

async function searchBuses(date, departureCityId, destinationCityId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v2/app/global/search/${date}/${departureCityId}/${destinationCityId}`
    );
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error searching buses:", error.message);
    return [];
  }
}

async function getAllRoutes() {
  try {
    const response = await axios.get(`${API_BASE_URL}/app/v1/bus/routes/all/0/100`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching routes:", error.message);
    return [];
  }
}

async function getBookingPassengers(bookingUuid) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/app/v1/transaction/bookings/${bookingUuid}/passengers`
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching booking passengers:", error.message);
    return [];
  }
}

// Format date helper
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Format time helper
function formatTime(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0) {
    return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins > 0 ? `${mins} min${mins > 1 ? "s" : ""}` : ""}`;
  } else {
    return `${mins} min${mins > 1 ? "s" : ""}`;
  }
}

// Main message handler
async function handleMessage(phoneNumber, messageText, messageId) {
  const session = initUserSession(phoneNumber);
  const text = messageText.trim().toLowerCase();

  // Reset command
  if (text === "reset" || text === "start" || text === "menu" || text === "hi" || text === "hello") {
    session.state = "idle";
    session.data = {};
    session.step = null;
    await sendMainMenu(phoneNumber, messageId);
    return;
  }

  // Handle different states
  switch (session.state) {
    case "idle":
      await handleMainMenu(phoneNumber, text, messageId, session);
      break;

    case "searching":
      await handleSearchFlow(phoneNumber, text, messageId, session);
      break;

    case "selecting_bus":
      await handleBusSelection(phoneNumber, text, messageId, session);
      break;

    case "selecting_seat":
      await handleSeatSelection(phoneNumber, text, messageId, session);
      break;

    case "booking":
      await handleBookingFlow(phoneNumber, text, messageId, session);
      break;

    default:
      await sendMainMenu(phoneNumber, messageId);
  }
}

// Main menu handler
async function handleMainMenu(phoneNumber, text, messageId, session) {
  if (text === "1" || text.includes("search") || text.includes("book")) {
    session.state = "searching";
    session.step = "departure";
    session.data = {};
    await sendWhatsAppMessage(
      phoneNumber,
      "🚌 *Bus Booking*\n\nLet's find you a bus!\n\nPlease enter the *departure city* name:",
      messageId
    );
  } else if (text === "2" || text.includes("routes") || text.includes("available")) {
    await showAvailableRoutes(phoneNumber, messageId);
  } else if (text === "3" || text.includes("my bookings") || text.includes("bookings")) {
    await sendWhatsAppMessage(
      phoneNumber,
      "📋 *My Bookings*\n\nTo view your bookings, please provide your booking reference number or user ID.\n\nOr type *reset* to go back to main menu.",
      messageId
    );
  } else if (text === "4" || text.includes("help")) {
    await sendHelpMessage(phoneNumber, messageId);
  } else {
    await sendMainMenu(phoneNumber, messageId);
  }
}

// Send main menu
async function sendMainMenu(phoneNumber, messageId) {
  const menuText =
    "🚌 *Welcome to ShareARide Bus Booking*\n\n" +
    "What would you like to do?\n\n" +
    "1️⃣ Search & Book Bus\n" +
    "2️⃣ View Available Routes\n" +
    "3️⃣ My Bookings\n" +
    "4️⃣ Help\n\n" +
    "Reply with the number or keyword to continue.";

  await sendButtonMessage(phoneNumber, menuText, ["Search Bus", "View Routes", "My Bookings", "Help"], messageId);
}

// Search flow handler
async function handleSearchFlow(phoneNumber, text, messageId, session) {
  if (session.step === "departure") {
    // Store departure city search text
    session.data.departureSearch = text;
    const cities = await getCities();
    const matchingCities = cities.filter(
      (city) => city.name.toLowerCase().includes(text.toLowerCase())
    );

    if (matchingCities.length === 0) {
      await sendWhatsAppMessage(
        phoneNumber,
        `❌ No cities found matching "${text}".\n\nPlease try again with a different city name, or type *reset* to start over.`,
        messageId
      );
      return;
    }

    if (matchingCities.length === 1) {
      session.data.departureCityId = matchingCities[0].uuid;
      session.data.departureCityName = matchingCities[0].name;
      session.step = "destination";
      await sendWhatsAppMessage(
        phoneNumber,
        `✅ Departure: *${matchingCities[0].name}*\n\nNow, please enter the *destination city* name:`,
        messageId
      );
    } else {
      // Show list of matching cities
      const sections = [
        {
          title: "Select Departure City",
          rows: matchingCities.slice(0, 10).map((city, idx) => ({
            id: `dep_${city.uuid}`,
            title: city.name,
            description: ""
          }))
        }
      ];
      await sendListMessage(
        phoneNumber,
        "Select Departure City",
        `Found ${matchingCities.length} cities matching "${text}"`,
        "Select your departure city",
        "Select",
        sections,
        messageId
      );
      session.step = "select_departure";
    }
  } else if (session.step === "select_departure") {
    // Handle list selection
    const cities = await getCities();
    const selectedCity = cities.find((city) => text.includes(city.uuid) || text.includes(city.name));
    if (selectedCity) {
      session.data.departureCityId = selectedCity.uuid;
      session.data.departureCityName = selectedCity.name;
      session.step = "destination";
      await sendWhatsAppMessage(
        phoneNumber,
        `✅ Departure: *${selectedCity.name}*\n\nNow, please enter the *destination city* name:`,
        messageId
      );
    } else {
      await sendWhatsAppMessage(
        phoneNumber,
        "❌ Invalid selection. Please try again or type *reset* to start over.",
        messageId
      );
    }
  } else if (session.step === "destination") {
    session.data.destinationSearch = text;
    const cities = await getCities();
    const matchingCities = cities.filter(
      (city) => city.name.toLowerCase().includes(text.toLowerCase()) && 
                city.uuid !== session.data.departureCityId
    );

    if (matchingCities.length === 0) {
      await sendWhatsAppMessage(
        phoneNumber,
        `❌ No cities found matching "${text}" or same as departure.\n\nPlease try again with a different city name, or type *reset* to start over.`,
        messageId
      );
      return;
    }

    if (matchingCities.length === 1) {
      session.data.destinationCityId = matchingCities[0].uuid;
      session.data.destinationCityName = matchingCities[0].name;
      session.step = "date";
      await sendWhatsAppMessage(
        phoneNumber,
        `✅ Destination: *${matchingCities[0].name}*\n\nNow, please enter the *travel date* in format YYYY-MM-DD (e.g., 2024-12-25):`,
        messageId
      );
    } else {
      const sections = [
        {
          title: "Select Destination City",
          rows: matchingCities.slice(0, 10).map((city) => ({
            id: `dest_${city.uuid}`,
            title: city.name,
            description: ""
          }))
        }
      ];
      await sendListMessage(
        phoneNumber,
        "Select Destination City",
        `Found ${matchingCities.length} cities matching "${text}"`,
        "Select your destination city",
        "Select",
        sections,
        messageId
      );
      session.step = "select_destination";
    }
  } else if (session.step === "select_destination") {
    const cities = await getCities();
    const selectedCity = cities.find((city) => text.includes(city.uuid) || text.includes(city.name));
    if (selectedCity && selectedCity.uuid !== session.data.departureCityId) {
      session.data.destinationCityId = selectedCity.uuid;
      session.data.destinationCityName = selectedCity.name;
      session.step = "date";
      await sendWhatsAppMessage(
        phoneNumber,
        `✅ Destination: *${selectedCity.name}*\n\nNow, please enter the *travel date* in format YYYY-MM-DD (e.g., 2024-12-25):`,
        messageId
      );
    } else {
      await sendWhatsAppMessage(
        phoneNumber,
        "❌ Invalid selection or same as departure. Please try again or type *reset* to start over.",
        messageId
      );
    }
  } else if (session.step === "date") {
    // Validate date format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(text)) {
      await sendWhatsAppMessage(
        phoneNumber,
        "❌ Invalid date format. Please enter date in YYYY-MM-DD format (e.g., 2024-12-25):",
        messageId
      );
      return;
    }

    const selectedDate = new Date(text);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      await sendWhatsAppMessage(
        phoneNumber,
        "❌ You cannot select past dates. Please enter a future date (YYYY-MM-DD):",
        messageId
      );
      return;
    }

    session.data.travelDate = text;
    session.step = "searching";
    await searchAndDisplayBuses(phoneNumber, messageId, session);
  }
}

// Search and display buses
async function searchAndDisplayBuses(phoneNumber, messageId, session) {
  await sendWhatsAppMessage(
    phoneNumber,
    "🔍 Searching for available buses...",
    messageId
  );

  const buses = await searchBuses(
    session.data.travelDate,
    session.data.departureCityId,
    session.data.destinationCityId
  );

  if (buses.length === 0) {
    await sendWhatsAppMessage(
      phoneNumber,
      `❌ No buses available for:\n\n📍 *${session.data.departureCityName}* → *${session.data.destinationCityName}*\n📅 *${formatDate(session.data.travelDate)}*\n\nPlease try a different date or route. Type *reset* to start over.`,
      messageId
    );
    session.state = "idle";
    session.data = {};
    session.step = null;
    return;
  }

  // Store buses for selection
  session.data.availableBuses = buses;
  session.state = "selecting_bus";
  session.step = null;

  // Format bus list
  let busListText = `🚌 *Available Buses*\n\n`;
  busListText += `📍 *${session.data.departureCityName}* → *${session.data.destinationCityName}*\n`;
  busListText += `📅 *${formatDate(session.data.travelDate)}*\n\n`;
  busListText += `Found ${buses.length} bus(es):\n\n`;

  buses.slice(0, 10).forEach((bus, idx) => {
    const route = bus.routeDetails?.busSubRoute?.subRoute;
    const busInfo = bus.bus;
    const fare = bus.routeDetails?.busSubRoute?.busSubRoute?.fare || "N/A";
    const departure = bus.routeDetails?.busRoute?.departure || "N/A";
    const arrival = bus.routeDetails?.busRoute?.arrival || "N/A";
    const company = busInfo?.company || "N/A";
    const regNo = busInfo?.regNo || "N/A";

    busListText += `${idx + 1}. *${company}* (${regNo})\n`;
    busListText += `   ⏰ ${departure} - ${arrival}\n`;
    busListText += `   💰 BWP ${fare}\n\n`;
  });

  busListText += `Reply with the bus number (1-${Math.min(buses.length, 10)}) to select, or type *reset* to start over.`;

  await sendWhatsAppMessage(phoneNumber, busListText, messageId);
}

// Handle bus selection
async function handleBusSelection(phoneNumber, text, messageId, session) {
  const busNumber = parseInt(text);
  if (isNaN(busNumber) || busNumber < 1 || busNumber > Math.min(session.data.availableBuses.length, 10)) {
    await sendWhatsAppMessage(
      phoneNumber,
      `❌ Invalid selection. Please enter a number between 1 and ${Math.min(session.data.availableBuses.length, 10)}, or type *reset* to start over.`,
      messageId
    );
    return;
  }

  const selectedBus = session.data.availableBuses[busNumber - 1];
  session.data.selectedBus = selectedBus;

  // Display bus details
  const route = selectedBus.routeDetails?.busSubRoute?.subRoute;
  const busInfo = selectedBus.bus;
  const fare = selectedBus.routeDetails?.busSubRoute?.busSubRoute?.fare || "N/A";
  const departure = selectedBus.routeDetails?.busRoute?.departure || "N/A";
  const arrival = selectedBus.routeDetails?.busRoute?.arrival || "N/A";
  const company = busInfo?.company || "N/A";
  const regNo = busInfo?.regNo || "N/A";
  const distance = selectedBus.routeDetails?.busSubRoute?.busSubRoute?.distance || "N/A";
  const approximateTime = selectedBus.routeDetails?.busSubRoute?.busSubRoute?.approximateTime || 0;
  const totalSeats = busInfo?.totalSeats || "N/A";

  let busDetailsText = `🚌 *Bus Details*\n\n`;
  busDetailsText += `*Company:* ${company}\n`;
  busDetailsText += `*Registration:* ${regNo}\n`;
  busDetailsText += `*Route:* ${session.data.departureCityName} → ${session.data.destinationCityName}\n`;
  busDetailsText += `*Departure:* ${departure}\n`;
  busDetailsText += `*Arrival:* ${arrival}\n`;
  busDetailsText += `*Date:* ${formatDate(session.data.travelDate)}\n`;
  busDetailsText += `*Fare:* BWP ${fare}\n`;
  busDetailsText += `*Distance:* ${distance} km\n`;
  busDetailsText += `*Duration:* ${formatTime(approximateTime)}\n`;
  busDetailsText += `*Total Seats:* ${totalSeats}\n\n`;

  busDetailsText += `To proceed with booking, please provide:\n`;
  busDetailsText += `1. Passenger name(s)\n`;
  busDetailsText += `2. Seat number(s) - format: A1, A2, etc.\n\n`;
  busDetailsText += `Or type *reset* to go back.`;

  session.state = "booking";
  session.step = "passenger_name";
  await sendWhatsAppMessage(phoneNumber, busDetailsText, messageId);
}

// Handle seat selection
async function handleSeatSelection(phoneNumber, text, messageId, session) {
  // This would integrate with Firebase seat availability
  // For now, just acknowledge
  await sendWhatsAppMessage(
    phoneNumber,
    "Seat selection feature will be implemented with Firebase integration.",
    messageId
  );
}

// Handle booking flow
async function handleBookingFlow(phoneNumber, text, messageId, session) {
  if (session.step === "passenger_name") {
    session.data.passengerName = text;
    session.step = "seat_number";
    await sendWhatsAppMessage(
      phoneNumber,
      `✅ Passenger Name: *${text}*\n\nNow, please enter the seat number (e.g., A1, A2, B5):`,
      messageId
    );
  } else if (session.step === "seat_number") {
    session.data.seatNumber = text.toUpperCase();
    session.step = "confirm";
    
    const busInfo = session.data.selectedBus.bus;
    const fare = session.data.selectedBus.routeDetails?.busSubRoute?.busSubRoute?.fare || "N/A";
    
    let confirmText = `📋 *Booking Confirmation*\n\n`;
    confirmText += `*Passenger:* ${session.data.passengerName}\n`;
    confirmText += `*Seat:* ${session.data.seatNumber}\n`;
    confirmText += `*Route:* ${session.data.departureCityName} → ${session.data.destinationCityName}\n`;
    confirmText += `*Date:* ${formatDate(session.data.travelDate)}\n`;
    confirmText += `*Fare:* BWP ${fare}\n\n`;
    confirmText += `Type *confirm* to proceed with booking, or *cancel* to go back.`;

    await sendWhatsAppMessage(phoneNumber, confirmText, messageId);
  } else if (session.step === "confirm") {
    if (text === "confirm" || text === "yes") {
      // Here you would make the actual booking API call
      // For now, just acknowledge
      await sendWhatsAppMessage(
        phoneNumber,
        `✅ *Booking Successful!*\n\nYour booking details:\n\n` +
        `*Passenger:* ${session.data.passengerName}\n` +
        `*Seat:* ${session.data.seatNumber}\n` +
        `*Route:* ${session.data.departureCityName} → ${session.data.destinationCityName}\n` +
        `*Date:* ${formatDate(session.data.travelDate)}\n\n` +
        `Thank you for using ShareARide! 🚌\n\nType *reset* to make another booking.`,
        messageId
      );
      session.state = "idle";
      session.data = {};
      session.step = null;
    } else if (text === "cancel" || text === "no") {
      await sendWhatsAppMessage(
        phoneNumber,
        "❌ Booking cancelled. Type *reset* to start over.",
        messageId
      );
      session.state = "idle";
      session.data = {};
      session.step = null;
    }
  }
}

// Show available routes
async function showAvailableRoutes(phoneNumber, messageId) {
  await sendWhatsAppMessage(phoneNumber, "🔍 Fetching available routes...", messageId);
  
  const routes = await getAllRoutes();
  
  if (routes.length === 0) {
    await sendWhatsAppMessage(
      phoneNumber,
      "❌ No routes available at the moment. Please try again later.",
      messageId
    );
    return;
  }

  let routesText = `🚌 *Available Routes*\n\n`;
  routes.slice(0, 20).forEach((route, idx) => {
    const routeName = route.Route?.name || "N/A";
    const departure = route.departure || "N/A";
    const arrival = route.arrival || "N/A";
    const fare = route.Route?.fare || "N/A";
    const company = route.Bus?.company || "N/A";
    
    routesText += `${idx + 1}. *${routeName}*\n`;
    routesText += `   🚌 ${company}\n`;
    routesText += `   ⏰ ${departure} - ${arrival}\n`;
    routesText += `   💰 BWP ${fare}\n\n`;
  });

  routesText += `\nType *reset* to go back to main menu.`;
  await sendWhatsAppMessage(phoneNumber, routesText, messageId);
}

// Send help message
async function sendHelpMessage(phoneNumber, messageId) {
  const helpText =
    "📖 *Help & Support*\n\n" +
    "*Available Commands:*\n" +
    "• Type *1* or *search* - Search and book a bus\n" +
    "• Type *2* or *routes* - View all available routes\n" +
    "• Type *3* or *bookings* - View your bookings\n" +
    "• Type *reset* or *menu* - Go back to main menu\n\n" +
    "*Booking Process:*\n" +
    "1. Select departure city\n" +
    "2. Select destination city\n" +
    "3. Enter travel date (YYYY-MM-DD)\n" +
    "4. Choose a bus from available options\n" +
    "5. Enter passenger details\n" +
    "6. Confirm booking\n\n" +
    "For support, contact us at support@sharearide.co.bw\n\n" +
    "Type *reset* to go back to main menu.";

  await sendWhatsAppMessage(phoneNumber, helpText, messageId);
}

// Route for GET requests (Webhook verification)
app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  if (mode === "subscribe" && token === verifyToken) {
    console.log("WEBHOOK VERIFIED");
    return res.status(200).send(challenge);
  } else {
    return res.status(403).end();
  }
});

// Route for POST requests (Webhook messages)
app.post("/", async (req, res) => {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);

  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const messages = changes?.value?.messages;

    if (!messages || messages.length === 0) {
      return res.sendStatus(200);
    }

    const message = messages[0];
    const from = message.from;
    const messageId = message.id;
    const type = message.type;

    // Handle interactive messages (list/button responses)
    if (type === "interactive") {
      const interactiveType = message.interactive?.type;
      if (interactiveType === "list_reply") {
        const selectedId = message.interactive.list_reply.id;
        await handleMessage(from, selectedId, messageId);
      } else if (interactiveType === "button_reply") {
        const buttonId = message.interactive.button_reply.id;
        const buttonText = message.interactive.button_reply.title;
        await handleMessage(from, buttonText.toLowerCase(), messageId);
      }
      return res.sendStatus(200);
    }

    // Only respond to text messages
    if (type === "text") {
      const messageText = message.text.body;
      await handleMessage(from, messageText, messageId);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR processing webhook →", err);
    res.sendStatus(500);
  }
});

// Start server
app.listen(port, () => {
  console.log(`\n🚀 WhatsApp Bus Booking Bot listening on port ${port}\n`);
  console.log(`📱 Make sure to set these environment variables:`);
  console.log(`   - VERIFY_TOKEN`);
  console.log(`   - GRAPH_API_TOKEN`);
  console.log(`   - WHATSAPP_PHONE_ID (optional, defaults to 839312095934555)\n`);
});

