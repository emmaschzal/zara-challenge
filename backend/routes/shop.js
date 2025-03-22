
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

const envPath = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envPath });

const BASE_API_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com/products';
const BASE_API_KEY = process.env.API_KEY;

router.get('/', async (req, res) => {
  try {
    const response = await fetch(BASE_API_URL, {  method: 'GET', headers: { 'x-api-key': BASE_API_KEY, 'accept': 'application/json',},});

    if (!response.ok) { throw new Error(`failed to fetch ${response.statusText}`);}

    const data = await response.json();
    const seen = new Set();
    const uniqueProducts = data.filter(product => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;  
    });

    res.json(uniqueProducts);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: 'failed to fetch' });
  }
});

module.exports = router;