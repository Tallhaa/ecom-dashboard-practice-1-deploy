const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    company: String,
    category: String,
});

const Product = new mongoose.model("products", productSchema);
module.exports = Product;