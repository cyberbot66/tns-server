const mongoose = require('mongoose');
const Category = require('./category.model');
const Brand = require('./brand.model');

const Schema = mongoose.Schema;

const detailSchema = new Schema({ type: String, content: String });

const productSchema = new Schema(
  {
    title: String,
    short_descriptions: [String],
    discount_percent: Number,
    price: Number,
    status: String,
    details: [detailSchema],
    guarantee_month: Number,
    images: [String],
    category: String,
    brand: String,
    in_stock: Number,
  },
  {
    versionKey: false,
  }
);

productSchema.pre('save', function (next) {
  Category.findOneAndUpdate(
    { name: this.category },
    { $push: { product_ids: this.id } },
    { new: true },
    function (err, category) {
      if (err) console.error(err);
      if (category) console.log(category);
    }
  );

  Brand.findOneAndUpdate(
    { name: this.brand },
    { $push: { product_ids: this.id } },
    { new: true },
    function (err, brand) {
      if (err) console.error(err);
      if (brand) console.log(brand);
    }
  );

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
