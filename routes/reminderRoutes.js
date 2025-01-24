const express = require('express');
const admin = require('firebase-admin');
const authenticate = require('../config/auth');

const router = express.Router();

module.exports = (db) => {
    // Create a reminder
    router.post('/', authenticate, async (req, res) => {
        const { title, description, time } = req.body;
        const uid = req.user.uid; // Extract user ID from the verified token

        if (!title || !time) {
            return res.status(400).json({ error: 'Title and time are required.' });
        }

        try {
            const reminderRef = db.collection('reminders').doc(); // Auto generate ID
            const reminder = {
                id: reminderRef.id,
                uid: uid,
                title: title,
                description: description || '',
                time: time,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            };

            await reminderRef.set(reminder);
            res.status(201).json({ message: 'Reminder created successfully.', reminder });
        } catch (error) {
            console.error('Error creating reminder:', error);
            res.status(500).json({ error: 'Failed to create reminder.' });
        }
    });

    // Get all reminders
    router.get('/', authenticate, async (req, res) => {
        const uid = req.user.uid;

        try {
            const snapshot = await db.collection('reminders').where('uid', '==', uid).get();

            if (snapshot.empty) {
                return res.status(200).json({ reminders: [] });
            }

            const reminders = snapshot.docs.map((doc) => doc.data());
            res.status(200).json({ reminders });
        } catch (error) {
            console.error('Error fetching reminders:', error);
            res.status(500).json({ error: 'Failed to fetch reminders.' });
        }
    });

    // Update a reminder
    router.put('/:id', authenticate, async (req, res) => {
        const { id } = req.params;
        const { title, description, time } = req.body;
        const uid = req.user.uid;

        try {
            const reminderRef = db.collection('reminders').doc(id);
            const reminderDoc = await reminderRef.get();

            if (!reminderDoc.exists) {
                return res.status(404).json({ error: 'Reminder not found.' });
            }

            const reminder = reminderDoc.data();

            if (reminder.uid !== uid) {
                return res.status(403).json({ error: 'Unauthorized to update this reminder.' });
            }

            const updatedData = {
                ...(title && { title }),
                ...(description && { description }),
                ...(time && { time }),
            };

            await reminderRef.update(updatedData);
            res.status(200).json({ message: 'Reminder updated successfully.' });
        } catch (error) {
            console.error('Error updating reminder:', error);
            res.status(500).json({ error: 'Failed to update reminder.' });
        }
    });

    // Delete a reminder
    router.delete('/:id', authenticate, async (req, res) => {
        const { id } = req.params;
        const uid = req.user.uid;

        try {
            const reminderRef = db.collection('reminders').doc(id);
            const reminderDoc = await reminderRef.get();

            if (!reminderDoc.exists) {
                return res.status(404).json({ error: 'Reminder not found.' });
            }

            const reminder = reminderDoc.data();

            if (reminder.uid !== uid) {
                return res.status(403).json({ error: 'Unauthorized to delete this reminder.' });
            }

            await reminderRef.delete();
            res.status(200).json({ message: 'Reminder deleted successfully.' });
        } catch (error) {
            console.error('Error deleting reminder:', error);
            res.status(500).json({ error: 'Failed to delete reminder.' });
        }
    });

    return router;
};