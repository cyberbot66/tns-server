const router = require('express').Router();
const Category = require('../models/category.model');

router.route('/').get((req, res) => {
  Category.find()
    .sort({ name: 'asc' })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(404).json({ err }));
});

router.route('/add').post((req, res) => {
  const { product_ids, name, image } = req.body;

  const newCategory = new Category({
    product_ids,
    name,
    image,
  });

  newCategory
    .save()
    .then((category) => res.json(`Category ${category.id} added!`))
    .catch((err) => res.status(500).json({ err }));
});

module.exports = router;
