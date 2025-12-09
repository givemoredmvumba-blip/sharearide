 
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









// savanna Glitch

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from "express";
import axios from "axios";
import * as fs from 'fs'; 
import path from 'path';  

const app = express();
app.use(express.json());

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;

function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


app.post("/webhook", async (req, res) => {
  // log incoming messages
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  let botRespose = null;







  

  if(message?.type === "image") {
    
        const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    
      await axios({
            method: "GET",
            url: 'https://paakanyo.com/bot.php?number='+message.from+'&imageid='+message?.image.id,       
          }).then(function (response) {
            if(response.data == "reportPicUploaded"){
              axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Kindly provide a brief description of your problem\n"+

                           "\n\t00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
            }
            else if(response.data == 'feedbackPicUploaded'){
              axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Rate our service from 1-10, \n1 being the lowest and 10 being the best service rating."+ 
                            "\n\n"+
                            "00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
            }
          });
    }
  
  

  // check if the incoming message contains text
  if (message?.type === "text") {
    
        // extract the business number to send the reply from it
        const business_phone_number_id =
        req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
        const username = req.body.entry?.[0]?.changes[0]?.value?.contacts?.[0];

        await axios({
            method: "POST",
            url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
            headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
            },
            data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                    body: "Hi! "+ username.profile.name + "\n\nWelcome to Flight Connect\n"
                        +"1. Book Bus To Johannesburg\n"+
                        "2. Book Bus To Gaborone\n"+
                        "3. Book Return Ticket"
                    },
                    context: {
                        message_id: message.id, // shows the message as a reply to the original user message
                    },
                },
        });
    }
    // const response = null;


  //     if( message.from == "26774730303" ){
  //           await axios({
  //               method: "POST",
  //               url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
  //               headers: {
  //                 Authorization: `Bearer ${GRAPH_API_TOKEN}`,
  //               },
  //               data: {
  //                 messaging_product: "whatsapp",
  //                 to: message.from,
  //                 text: { 
  //                   body: "Hi! "+ username.profile.name + "\n\nWelcome to Flight Connect\n"
  //                   +"1. Book Bus To Johannesburg\n"+
  //                     "2. Book Bus To Gaborone\n"+
  //                     "3. Book Return Ticket"
  //                 },
  //                 context: {
  //                   message_id: message.id, // shows the message as a reply to the original user message
                    
  //                 },
  //               },
  //             });

  //       return;
  // }
    
    
     await axios({
            method: "GET",
            url: 'https://paakanyo.com/bot.php?number='+message.from+'&action='+message.text.body,       
          }).then(function (response) {
             
             console.log(response);
            //handle success
            botRespose = response.data;
     });

     if(botRespose == "Start"){
        await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: { 
                    body: "Hi! "+ username.profile.name + "\n\nWelcome to Khoemacau Copper Mining " +
                    "Maintenance and Reporting System\n\n"+
                    "1. Facilities Maintenance Request\n"+
                    "2. Camp Service Feedback\n"+
                    "3. Check in/out\n"+
                    "4. Camp Rules"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                    
                  },
                },
              });
     }else if(botRespose == "techfeedback"){
        await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: { 
                    body: "Thank you for your feedback technician."
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                    
                  },
                },
              });
     }else if(botRespose == "CampRules"){
        await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  type: "document",
                  document: {
                    link: "https://paakanyo.com/camp_rules.pdf",
                    filename: "camp_rules.pdf",
                    caption: "Please read the terms and conditions and reply with your full names for acccepting terms.\n\n00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
     }else if(botRespose == "CampRulesAccepted"){
        axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Dear "+ username.profile.name +",\nWe confirm that you have accepted our Terms & Conditions. Thank you for your cooperation.\n"+

                           "\n\t00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
     }else if(botRespose == "Landing"){
        
        if(message.text.body == "1"){
             await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: { 
                    body: "Select your fault category \n\n" +
                    "1. Structural & Building Faults\n"+

                    "2. Electrical Faults\n"+

                    "3. Plumbing & Water System Faults\n"+

                    "4. HVAC (Heating, Ventilation, and Air Conditioning) Faults\n"+

                    "5. Pest & Sanitation Issues\n"+

                    "6. Security & Safety Equipment Faults"+
                    "\n\n00. Main Menu"

                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }else if(message.text.body == "2"){
          
        }
        
        
      }else if(botRespose == "reportPicUploaded"){
              axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Kindly provide a brief description of your problem\n"+

                           "\n\t00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
      }else if(botRespose == 'feedbackPicUploaded'){
              axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Rate our service from 1-10, \n1 being the lowest and 10 being the best service rating."+ 
                            "\n\n"+
                            "00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
      }else if(botRespose == "Feedback"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`, 
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Which contractor is servicing your area? \n\n" +
                      "1. Baroju PTY LTD\n"+
                      "2. Mighty Infinite\n"+
                      "3. Meremoth Cleaning Services\n"+
                      "\n00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "where"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Which area you will like to give feedback? \n\n" +
                      "1. House Keeping\n"+
                      "2. Laundry\n"+
                      "3. Catering\n"+ 
                      "4. Cleaning\n"+
                      "\n00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "Category"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Select Camp/MIA you want to give feedback for\n"+
                      "\n1. Toteng Village Camp"+
                      "\n2. Tudika/Boseto Camp"+
                      "\n3. Kgwebe Camp"+
                      "\n4. Boseto Offices"+
                      "\n5. Zone 5 Offices"+
                      "\n6. Senior Camp"+
                      "\n7. Old Exploration Camp"+
                      "\n8. Meyer Camp"+
                      "\n9. New Project Office\n"+
                      "\n 00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "RoomNu"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Kindly provide your House/Room No (e.g. B2/R5) \n"+
                    
                      "\n 00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "Explanantion"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Kindly explain area of improvement\n"+
                    
                      "\n 00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "feedbackpic"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Please take a picture of where to be improved or type “skip” if not applicable \n"+
                    
                      "\n 00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "feedbackdone"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Thank you for your feedback.\n"+
                    
                      "\n 00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "checkindone"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Thank you for checking in.\n"+
                    
                      "\n 00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "checkoutdone"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Thank you, you have now checked out.\n"+
                    
                      "\n 00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "checkinfeedbackdone"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Thank you for staying with us.\n"+
                    
                      "\n 00. Main Menu"

                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
              });
      }else if(botRespose == "Structural & Building Faults"){
         if(message.text.body == "1"){
           await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Structural & Building Faults\nSelect your fault"+
                      "\n\t1. Roof leaks"+
                      "\n\t2. Cracked walls & floors"+
                      "\n\t3. Damaged doors & windows\n"+
                       "\n\t00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
         }
      } else if(botRespose == "Plumbing & Water System Faults"){
        if(message.text.body == "3"){
            await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Plumbing & Water System Faults\nSelect your fault"+
                          "\n\t1. Leaking pipes & taps"+
                          "\n\t2. Blocked drains & toilets"+
                          "\n\t3. Water heater failures\n"+
                           "\n\t00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
         }
      }else if(botRespose == "Plumbing & Water System Faults Desc"){
        if(message.text.body == "1"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Plumbing & Water System Fault - Leaking pipes & taps\nPlease take a picture of the damage or type “skip” if not applicable\n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        }else if(message.text.body == "2"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Plumbing & Water System Fault - Blocked drains & toilets\nPlease take a picture of the damage or type “skip” if not applicable\n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        }else if(message.text.body == "3"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Plumbing & Water System Fault - Water heater failures\nPlease take a picture of the damage or type “skip” if not applicable\n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        }
      }else if(botRespose == "HVAC (Heating, Ventilation, and Air Conditioning) Faults"){
         if(message.text.body == "4"){
            await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "HVAC (Heating, Ventilation, and Air Conditioning) Faults\nSelect your fault"+
                          "\n\t1. AC unit failures"+
                          "\n\t2. Poor ventilation"+
                          "\n\t3. Heater malfunctions\n"+
                           "\n\t00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
         }
      }else if(botRespose == "Pest & Sanitation Issues Faults"){
         if(message.text.body == "5"){
            await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Pest & Sanitation Issues Faults\nSelect your fault"+
                          "\n\t1. Rodent or insect infestations"+
                          "\n\t2. Mold & mildew growth"+
                          "\n\t3. Septic system failures\n"+
                           "\n\t00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
         }
      }else if(botRespose == "Electrical Faults"){
         if(message.text.body == "2"){
            await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Electrical Faults\nSelect your fault"+
                          "\n\t1. Power outages"+
                          "\n\t2. Faulty lighting"+
                          "\n\t3. Damaged sockets & switches\n"+
                           "\n\t00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
         }
      }else if(botRespose == "Security & Safety Equipment Faults"){
         if(message.text.body == "6"){
            await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: {
                      body: "Security & Safety Equipment Faults\nSelect your fault"+
                          "\n\t1. Malfunctioning fire alarms & extinguishers"+
                          "\n\t2. Damaged security locks & access systems"+
                          "\n\t3. Non-functional emergency lighting\n"+
                           "\n\t00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                    },
                  },
                });
         }
      }else if(botRespose == "Security & Safety Equipment Faults Desc"){
        if(message.text.body == "1"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Security & Safety Equipment Fault - Malfunctioning fire alarms & extinguishers\nPlease take a picture of the damage or type “skip” if not applicable\n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        }else if(message.text.body == "2"){
           await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "Security & Safety Equipment Fault - Damaged security locks & access systems\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }else if(message.text.body == "3"){
          await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "Security & Safety Equipment Fault - Non-functional emergency lighting\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }
      }else if(botRespose == "Pest & Sanitation Issues Faults Desc"){
        if(message.text.body == "1"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Pest & Sanitation Issues Fault - Rodent or insect infestations\nPlease take a picture of the damage or type “skip” if not applicable\n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        }else if(message.text.body == "2"){
           await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "Pest & Sanitation Issues Fault - Mold & mildew growth\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }else if(message.text.body == "3"){
          await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "Pest & Sanitation Issues Fault - Septic system failures\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }
      }else if(botRespose == "HVAC (Heating, Ventilation, and Air Conditioning) Faults Desc"){
        if(message.text.body == "1"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "HVAC (Heating, Ventilation, and Air Conditioning) Fault - AC unit failures\nPlease take a picture of the damage or type “skip” if not applicable\n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        }else if(message.text.body == "2"){
           await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "HVAC (Heating, Ventilation, and Air Conditioning) Fault - Poor ventilation\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }else if(message.text.body == "3"){
          await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "HVAC (Heating, Ventilation, and Air Conditioning) Fault - Heater malfunctions\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }
      }else if(botRespose == "Electrical Faults Plot Number"){
        if(message.text.body == "1"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Electrical Fault - Power outages\nPlease take picture of the damage or type “skip” if not applicable\n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        }else if(message.text.body == "2"){
           await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "Electrical Fault - Faulty lighting\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }else if(message.text.body == "3"){
          await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "Electrical Fault - Damaged sockets & switches\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }
      }else if(botRespose == "Camp"){
        // if(message.text.body == "1"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Select Camp/MIA\n"+
                       "\n1. Toteng Village Camp"+
                      "\n2. Tudika/Boseto Camp"+
                      "\n3. Kgwebe Camp"+
                      "\n4. Boseto Offices"+
                      "\n5. Zone 5 Offices"+
                      "\n6. Senior Camp"+
                      "\n7. Old Exploration Camp"+
                      "\n8. Meyer Camp"+
                      "\n9. New Project Office\n"+
                      "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        // }
      }else if(botRespose == "House Number"){
        // if(message.text.body == "1"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Kindly provider your House/Room No (e.g. B2/R5) \n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        // }
      }else if(botRespose == "Plot Number"){
        if(message.text.body == "1"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Structural & Building Fault - Roof leaks\nPlease take a picture of the damage or type “skip” if not applicable\n"+
                     
                       "\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
        }else if(message.text.body == "2"){
           await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "Structural & Building Fault - Cracked walls & floors\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
        }else if(message.text.body == "3"){
           
           await axios({
                method: "POST",
                url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                headers: {
                  Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                  messaging_product: "whatsapp",
                  to: message.from,
                  text: {
                    body: "Structural & Building Fault - Damaged doors & windows\nPlease take a picture of the damage or type “skip” if not applicable\n"+

                         "\n 00. Main Menu"
                  },
                  context: {
                    message_id: message.id, // shows the message as a reply to the original user message
                  },
                },
              });
          
        }
      } 
     else if(botRespose == "provide room number"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                       body: "Select Camp you want to check-in \n"+
                       "\n1. Toteng Village Camp"+
                      "\n2. Tudika/Boseto Camp"+
                      "\n3. Kgwebe Camp"+
                      "\n4. Senior Camp"+
                      "\n5. Old Exploration Camp"+
                      "\n6. Meyer Camp\n"+
                      "\n 00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                      
                    },
                  },
                });
     }else if(botRespose == "checkername"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                       body: "Kindly provide your full names \n"+
                      "\n 00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                      
                    },
                  },
                });
     }else if(botRespose == "checkinroomnumber"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                       body: "Kindly enter House/Room No (e.g. B2/R5) for checking in \n"+
                      "\n 00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                      
                    },
                  },
                });
     }else if(botRespose == "checkinfeedback"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Hi! "+ username.profile.name +", hope you enjoyed your stay with us, kindly provide feedback and proceed to check out."
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                      
                    },
                  },
                });
     }else if(botRespose == "Already Booked"){
          await axios({
                  method: "POST",
                  url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                  headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: message.from,
                    text: { 
                      body: "Hi! "+ username.profile.name +", You have an active booking awaiting check out, proceed to check out. \n\n00. Main Menu"
                    },
                    context: {
                      message_id: message.id, // shows the message as a reply to the original user message
                      
                    },
                  },
                });
     }else { //if(botRespose == "Thank You"){
         await axios({
              method: "POST",
              url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: "Your Ticket Number: KP-"+botRespose+"\n\nYou can use it whenever making a follow up enquiry.\n\nOur Technician will contact you shortly\n\n 00. Main Menu"
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
      }
    

  
    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
    
    // console.log('olas '+GRAPH_API_TOKEN);
   }

  res.sendStatus(200);
});


// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});
// async (req, res) => {
app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.get("/feedback/:phonenumber/:message", async (req, res) => {
  let vb = "";
  let phone = "26772901798";
  let inf = "";
  
  if('26772901798' == req.params.phonenumber){
    vb = 'https://graph.facebook.com/v22.0/891064667413283/messages';
    inf = 'Bearer EAAS268spmrABPZBLcoC4O1dhZAHxliKbBbGIZCVwRjT9NtQZA1hHmSJBC1jZABxHZAX5U4DdDTLNoZAU6tXtQE54P0XE4TuWUDQ22nJ0dPIC8mj3g6K2xSYdbZCZBpgnwmyhMPYYVJIMkmFifL74MyXmQCAGZAPNqvR5PW4W3bZBEbh16OJ2zeQV0GhF8ZBR7a2D2g1KbahkA8xhnuubxeeN44LqHMMFZCBxmuxuyKWUpD6Ha0uaTROZC7Mm1OeuUlcioG';
    
  }else{
     vb = 'https://graph.facebook.com/v22.0/662082746996115/messages';
    phone = req.params.phonenumber;
    inf = `Bearer ${GRAPH_API_TOKEN}`;
  }
  axios({
    method: "POST",
    // 662082746996115
    url: vb,
    headers: {
      Authorization: inf,//`Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      to: phone,//req.params.phonenumber,
      text: {
        body: req.params.message+"\n\n"+"*N.B This is an automated notification, no response is required.*"
      }
    },
  });
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

