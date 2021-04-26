const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1500kb' }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const conn = mongoose.connection;
conn.once('open', () => {
  console.log('Connect to DB sucessfully!');
});

const categoryRouter = require('./routes/categories');
const brandRouter = require('./routes/brands');
const productRouter = require('./routes/products');

app.use('/categories', categoryRouter);
app.use('/brands', brandRouter);
app.use('/products', productRouter);

app.listen(port, () =>
  console.log(`Server is running! Open http://localhost:${port}`)
);
