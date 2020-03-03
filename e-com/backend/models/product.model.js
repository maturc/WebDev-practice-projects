const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true, trim: true, minlength: 3 },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;