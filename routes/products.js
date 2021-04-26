const router = require('express').Router();
const Category = require('../models/category.model');
const Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .sort({ title: 'asc' })
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ err }));
});

router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ err }));
});

router.route('/add').post((req, res) => {
  const {
    title,
    short_descriptions,
    discount_percent,
    price,
    status,
    details,
    guarantee_month,
    images,
    category,
    brand,
    in_stock,
  } = req.body;

  const newProduct = new Product({
    title,
    short_descriptions,
    discount_percent,
    price,
    status,
    details,
    guarantee_month,
    images,
    category,
    brand,
    in_stock,
  });

  newProduct
    .save()
    .then((product) => res.json(`Product ${product.id} added!`))
    .catch((err) => res.status(500).json({ err }));
});

router.route('/update/:id').post((req, res) => {
  Product.findById(req.params.id).then((product) => {
    const {
      title,
      short_descriptions,
      discount_percent,
      price,
      status,
      details,
      guarantee_month,
      images,
      category,
      brand,
      in_stock,
    } = req.body;

    product.title = title;
    product.short_descriptions = short_descriptions;
    product.discount_percent = discount_percent;
    product.price = price;
    product.status = status;
    product.details = details;
    product.guarantee_month = guarantee_month;
    product.images = images;
    product.category = category;
    product.brand = brand;
    product.in_stock = in_stock;

    product
      .save()
      .then(() => res.json(`Product ${req.params.id} updated!`))
      .catch((err) => res.status(404).json({ err }));
  });
});

module.exports = router;
