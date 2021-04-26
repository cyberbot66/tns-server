const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    product_ids: [mongoose.Types.ObjectId],
    name: String,
    image: String,
  },
  {
    versionKey: false,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
