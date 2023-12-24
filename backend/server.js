const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const dbConnection = require('./config/dbConnection');

const Product = require('./models/product');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/create', async (req, res) => {
  const { product_name, price, stock } = req.body;

  if (!product_name || !price || !stock) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
      const product = await Product.create({
          product_name,
          price,
          stock
      });

      res.json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products', async (req, res) => {
  try {
      const products = await Product.findAll();
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
}
);

app.delete('/products/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      await product.destroy();

      res.status(204).end();
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
}
);

app.put('/products/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { product_name, price, stock } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      product.product_name = product_name;
      product.price = price;
      product.stock = stock;

      await product.save();

      res.json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
}
);


dbConnection.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});


try {
    dbConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }





app.listen(port, () => console.log(`Example app listening on port ${port}!`));