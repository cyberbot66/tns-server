const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    product_ids: [mongoose.Types.ObjectId],
    name: String,
    image: String,
  },
  {
    versionKey: false,
  }
);

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
