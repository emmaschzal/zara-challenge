const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const envPath = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envPath });

const shop = require('./routes/shop');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

app.use('/', shop);
app.use('/shop', shop);

app.listen(PORT, () => {
    console.log(`running http://localhost:${PORT}`);
  });
  
module.exports = app;
  