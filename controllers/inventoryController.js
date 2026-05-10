// controllers/inventoryController.js

const Inventory = require('../models/Inventory');
const { processInventory } = require('../services/etlService');

// CREATE / UPDATE INVENTORY
const updateInventory = async (req, res) => {
  try {
    const processedData = processInventory(req.body);

    let item = await Inventory.findOne({
      product_id: processedData.product_id
    });

    if (item) {
      // UPDATE EXISTING ITEM
      item.current_stock = processedData.current_stock;
      item.status = processedData.status;
      item.last_updated = processedData.last_updated;
    } else {
      // CREATE NEW ITEM
      item = new Inventory(processedData);
    }

    await item.save();

    res.status(200).json({
      message: 'Inventory saved successfully',
      data: item
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// GET ALL INVENTORY
const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();

    res.status(200).json(items);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// DELETE INVENTORY
const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Inventory.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: 'Inventory item not found'
      });
    }

    res.status(200).json({
      message: 'Inventory deleted successfully',
      data: deletedItem
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  updateInventory,
  getInventory,
  deleteInventory
};