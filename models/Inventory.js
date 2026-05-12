const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  current_stock: { type: Number, required: true },
  status: { type: String, default: "OK" },
  last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);