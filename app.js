const express = require('express');
const axios = require('axios');

const app = express();

app.get('/transactions', async (req, res) => {
  const { address } = req.query;
  const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`;
  const apiKey = '8W8ZTR7ERXM1CM8EBTGQTIX5B9QZWG96NH';
  
  try {
    const response = await axios.get(`${apiUrl}&apikey=${apiKey}`);
    const transactions = response.data.result;
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
