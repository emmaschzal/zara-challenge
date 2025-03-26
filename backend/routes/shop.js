
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs/promises')


const envPath = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';


dotenv.config({ path: envPath });
const useMock = process.env.USE_MOCK === 'true';


const BASE_API_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com/products/';
const BASE_API_KEY = process.env.API_KEY;
const headers = { 'x-api-key': BASE_API_KEY, 'accept': 'application/json', };


// root or /shop -> displays all the products
router.get('/', async (req, res) => {
  const search = (req.query.q || '').toLowerCase();
  console.log('query:', search);

  try {
    let data;

    if (useMock) {
      const filePath = path.join(__dirname, '../api/products.json');
      console.log('Using mock data from:', filePath);

      const fileContent = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } else {
      const response = await fetch(BASE_API_URL, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`failed to fetch: ${response.statusText}`);
      }

      data = await response.json();
    }

    // remove duplicates
    const seen = new Set();
    const uniqueProducts = data.filter(product => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    });

    // search filter
    const filtered = search
      ? uniqueProducts.filter(product => {
          const name = product.name?.toLowerCase() || '';
          const brand = product.brand?.toLowerCase() || '';
          return name.includes(search) || brand.includes(search);
        })
      : uniqueProducts;

    res.json(filtered);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'failed to fetch products' });
  }
});

// / /{id} or shop/id -> displays single product with its information
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Fetching product:', id);

  try {
    let product;

    if (useMock) {
      const filePath = path.join(__dirname, '../api/single-product.json');
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileContent);

      product = data.find(p => p.id === id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
    } else {
      const response = await fetch(`${BASE_API_URL}${id}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`failed to fetch: ${response.statusText}`);
      }

      product = await response.json();
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: 'failed to fetch product' });
  }
});

module.exports = router;