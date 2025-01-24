const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const authenticate = require('../config/auth');
module.exports = (db) => {
  // Save user data to Firestore
  router.post('/save', authenticate, async (req, res) => {
    const { uid, email } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ error: 'UID and email are required.' });
    }

    try {
      // Save user data to the 'users' collection
      await db.collection('users').doc(uid).set({
        email: email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ message: 'User data saved successfully!' });
    } catch (error) {
      console.error('Error saving user data:', error);
      res.status(500).json({ error: 'Failed to save user data.' });
    }
  });

  return router;
};