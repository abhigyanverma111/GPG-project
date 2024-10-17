/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

// Initialize Firebase Admin(necessary if using Firestore or others)
admin.initializeApp();

const db = admin.firestore();

const app = express();

// Example middleware or route configuration (keep your existing routes here)
app.get("/hello", (req, res) => {
  res.send("Hello from Firebase!");
});

app.get("/studentprofile/:rollno", async (req, res) => {
  const rollno = req.params.rollno;

  try {
    const userDoc = await db.collection("studentProfile").doc(rollno).get();
    if (userDoc.exists) {
      res.status(200).json(userDoc.data());
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Error retrieving user data");
  }
});

// Other routes in your original Express app
// app.use('/api', yourRoutes);

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
