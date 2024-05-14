const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

const APIKey = 'e969853cfad9473e80c205301241105';
const APIUrl = 'http://api.weatherapi.com/v1/current.json';

// Use CORS middleware
app.use(cors());

// Route to fetch weather data by city name
app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    const response = await axios.get(`${APIUrl}?key=${APIKey}&q=${city}&aqi=no`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Could not fetch weather data' });
  }
});

// Default route handler
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Weather API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

