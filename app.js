const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/transactions', async (req, res) => {
  const { address, network } = req.query;
  let apiUrl, apiKey;

  if (network === 'ethereum') {
    apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`;
    apiKey = '8W8ZTR7ERXM1CM8EBTGQTIX5B9QZWG96NH';
  } else if (network === 'polygon') {
    apiUrl = `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&sort=asc`;
    apiKey = 'JHXBGM7YR14JU35KC5MXF4SV5X6NIUY9AT';
  } else if (network === 'bsc') {
    apiUrl = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&sort=asc`;
    apiKey = 'RW9B392QVPU9KZXYSNE92H8FJJ3FEV3JUP';
  } else if (network === 'avax') {
    apiUrl = `https://api.avax.network/ext/bc/C/rpc?module=account&action=txlist&address=${address}&sort=asc`;
  } else if (network === 'fantom') {
    apiUrl = `https://api.ftmscan.com/api?module=account&action=txlist&address=${address}&sort=asc`;
    apiKey = 'PASFIFGSRHSTWB25ARQRSEVY7H43WZV2B1';
  } else {
    return res.status(400).json({ error: 'Invalid network parameter' });
  }

  try {
    let response;
    if (apiKey) {
      response = await axios.get(`${apiUrl}&apikey=${apiKey}`);
    } else {
      response = await axios.post(apiUrl, {
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [],
        id: 1
      });
    }
    const transactions = response.data.result;
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
