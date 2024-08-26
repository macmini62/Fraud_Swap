const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post('https://api.africastalking.com/endpoint', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'apiKey': 'your_api_key_here',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
