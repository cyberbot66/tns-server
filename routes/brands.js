const router = require('express').Router();
const Brand = require('../models/brand.model');

router.route('/').get((req, res) => {
  Brand.find()
    .sort({ name: 'asc' })
    .then((brands) => res.json(brands))
    .catch((err) => res.status(404).json({ err }));
});

router.route('/add').post((req, res) => {
  const { product_ids, name, image } = req.body;

  const newBrand = new Brand({
    product_ids,
    name,
    image,
  });

  newBrand
    .save()
    .then((brand) => res.json(`Brand ${brand.id} added!`))
    .catch((err) => res.status(500).json({ err }));
});

module.exports = router;
