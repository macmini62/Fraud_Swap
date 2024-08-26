const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post("https://insights.sandbox.africastalking.com/v1/sim-swap", req.body, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "apiKey": "" // include your api key.
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response.status).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on port 3000");
});
