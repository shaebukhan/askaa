const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require("path");
dotenv.config();

const app = express();
app.use(express.json());
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../client/build");
app.use(express.static(buildpath));
app.use(cors({
  origin: '*',
}));
let accessToken = null;

// Function to fetch a new access token
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `https://api.merchants.zalando.com/auth/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.SECRET_ID,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );



    accessToken = response.data.access_token; // Store the access token
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error);
  }
};

// Middleware to ensure token validity
const ensureToken = async (req, res, next) => {
  if (!accessToken) {
    await getAccessToken(); // Refresh the token if expired or missing
  }
  next();
};

// Route to fetch merchant details from Zalando API
app.get('/api/zalando-data', ensureToken, async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/merchants/${process.env.MERCHANT_ID}/orders?page%5Bsize%5D=500`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );


    res.json(response.data);
  } catch (error) {
    // Log the error details
    console.error('Error fetching Zalando data:', error.response ? error.response.data : error);

    if (error.response?.status === 401) {

      await getAccessToken(); // Refresh token on 401
      return res.status(401).json({ error: 'Access token expired. Try again.' });
    }

    res.status(500).json({ error: 'Failed to fetch data from Zalando' });
  }
});

app.get('/api/zalando-data-category', ensureToken, async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/merchants/${process.env.MERCHANT_ID}/outlines`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );


    res.json(response.data);
  } catch (error) {
    // Log the error details
    console.error('Error fetching Zalando data:', error.response ? error.response.data : error);

    if (error.response?.status === 401) {

      await getAccessToken(); // Refresh token on 401
      return res.status(401).json({ error: 'Access token expired. Try again.' });
    }

    res.status(500).json({ error: 'Failed to fetch data from Zalando' });
  }
});

app.post('/api/zalando-data/descriptions', ensureToken, async (req, res) => {
  try {
    const allOrderItemIds = req.body; // Now req.body should be the array directly

    console.log(req.body.allOrderItemIds); // Check if data is coming as expected

    // Fetch item data for each order-item pair
    const itemsData = await Promise.all(allOrderItemIds.map(async ({ orderId, itemId }) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/merchants/${process.env.MERCHANT_ID}/orders/${orderId}/items/${itemId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return { orderId, itemId, itemData: response.data };
      } catch (error) {
        console.error(`Error fetching item ${itemId} for order ${orderId}:`, error.response ? error.response.data : error);
        return { orderId, itemId, error: 'Failed to fetch item data' };
      }
    }));

    res.json(itemsData);
  } catch (error) {
    console.error('Error fetching Zalando data:', error.response ? error.response.data : error);

    if (error.response?.status === 401) {
      await getAccessToken(); // Refresh token on 401
      return res.status(401).json({ error: 'Access token expired. Try again.' });
    }

    res.status(500).json({ error: 'Failed to fetch item data from Zalando' });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
