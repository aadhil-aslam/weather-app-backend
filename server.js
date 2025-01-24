const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const reminderRoutes = require('./routes/reminderRoutes');
const userRoutes = require('./routes/userRoutes'); // Authentication routes

const { db } = require('./config/firebaseConfig');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Weather API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const weatherRoutes = require('./routes/weatherRoutes'); // Weather related API routes
app.use('/weather', weatherRoutes);

app.use('/api/users', userRoutes(db));

app.use('/api/reminders', reminderRoutes(db));