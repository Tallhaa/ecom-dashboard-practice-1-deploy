const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    company: String,
    category: String,
});

module.exports = new mongoose.model("products", productSchema);