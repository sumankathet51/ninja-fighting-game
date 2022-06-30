const admin = require("firebase-admin");
// import { firestore } from "firebase-admin";
// ("firebase-admin");
// const filePath = "./ninja-fighting-game-firebase-adminsdk-aphk5-70a52474e5.json"
// import { initializeApp } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";
// import { serviceAccount } from `${filePath}`
// assert { type: "json" };
// const serviceAccount = require("./ninja-fighting-game-firebase-adminsdk-aphk5-70a52474e5.json");

const serviceAccount = require("./ninja-fighting-game-firebase-adminsdk-aphk5-70a52474e5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const Map = db.collection("game-map");
module.exports = Map;


// app.initializeApp({
//     credential: app.credential.cert(serviceAccount),
// });

// const db = app.firestore();
// export const Database = db.collection("game-map");