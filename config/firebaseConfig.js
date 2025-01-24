const admin = require('firebase-admin');
const serviceAccount = require('./wather-cast-firebase-adminsdk-fbsvc-8be16ddac4.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firestore and Auth instances
const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
