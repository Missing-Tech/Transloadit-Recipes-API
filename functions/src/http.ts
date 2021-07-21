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
    data: request.body,
  };

  admin.messaging().sendToDevice(token, payload);

  response.send("Transloadit!");
});
