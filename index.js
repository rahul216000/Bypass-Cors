const express = require('express');
const axios = require('axios');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(bodyParser.json());
app.get("/",(req, res) => {
    res.send("ok")
})
// Define the proxy route to handle POST request
app.post('/proxy/download', async (req, res) => {
  const { url } = req.body; // Get the LinkedIn URL from the request body

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Send the POST request to the external API
    const response = await axios.post(
      'https://www.expertsphp.com/download.php', 
      `url=${encodeURIComponent(url)}`, // Send URL as a body parameter
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
