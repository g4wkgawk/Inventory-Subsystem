// routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();

const {
  updateInventory,
  getInventory,
  deleteInventory
} = require('../controllers/inventoryController');

// CREATE OR UPDATE INVENTORY
router.post('/update', updateInventory);

// GET ALL INVENTORY
router.get('/', getInventory);

// DELETE INVENTORY
router.delete('/:id', deleteInventory);

module.exports = router;