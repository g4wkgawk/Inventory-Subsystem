const Inventory = require('../models/Inventory');
const { processInventory } = require('../services/etlService');

// CREATE / UPDATE INVENTORY
const updateInventory = async (req, res) => {
  try {
    const processedData = processInventory(req.body);

    let item = await Inventory.findOne({ product_id: processedData.product_id });

    if (item) {
      item.current_stock = processedData.current_stock;
      item.status = processedData.status;
      item.last_updated = processedData.last_updated;
    } else {
      item = new Inventory(processedData);
    }

    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL INVENTORY
const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateInventory,
  getInventory
};