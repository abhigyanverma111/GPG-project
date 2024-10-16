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

// Initialize Firebase Admin (optional, but necessary if using Firestore or other Firebase services)
admin.initializeApp();

const app = express();

// Example middleware or route configuration (keep your existing routes here)
app.get("/api/hello", (req, res) => {
  res.send("Hello from Firebase!");
});

// Other routes in your original Express app
// app.use('/api', yourRoutes);

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
