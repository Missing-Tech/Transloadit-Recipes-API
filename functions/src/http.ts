import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const receivePOST = functions.https.onRequest((request, response) => {
  const token = String(request.query.token);
  const name = String(request.query.name);

  const payload = {
    notification: {
      title: `Your ${name} is ready!`,
      body: "Tap here to check it out!",
    },
    data: {
      click_action: "FLUTTER_NOTIFICATION_CLICK",
      sound: "default",
      status: "done",
      screen: "/receipt",
    },
  };

  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  admin.messaging().sendToDevice(token, payload, options).catch((error) => {
    response.status(500);
    console.log(error);
  });

  response.send("Transloadit!");
  response.status(200);
});
