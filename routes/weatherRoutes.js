const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_KEY = process.env.WEATHER_API_KEY;

// Get current weather by city
router.get('/current', async (req, res) => {
    const { city, lat, lon } = req.query;

    let apiUrl;

    if (lat && lon) {
        // If latitude and longitude are provided,
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else if (city) {
        // If only city is provided,
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    } else {
        return res.status(400).json({ error: 'City or latitude/longitude must be provided.' });
    }

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);

    } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Location not found.' });
        } else {
            res.status(500).json({ error: 'An error occurred while fetching weather data.' });
        }
    }
});

// 5-day weather forecast
router.get('/forecast', async (req, res) => {
    const { city, lat, lon } = req.query;

    let apiUrl;

    if (lat && lon) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    } else {
        return res.status(400).json({ error: 'City or latitude/longitude must be provided.' });
    }

    try {
        // 5-day forecast data
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching 5-day forecast:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Location not found.' });
        } else {
            res.status(500).json({ error: 'An error occurred while fetching the forecast.' });
        }
    }
});

module.exports = router;
