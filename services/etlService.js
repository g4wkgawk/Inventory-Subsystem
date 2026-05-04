const normalizeProductId = (id) => {
  return id.toUpperCase().trim();
};

const calculateStockStatus = (stock) => {
  if (stock <= 5) return "LOW_STOCK";
  if (stock < 0) return "ERROR";
  return "OK";
};

const processInventory = (data) => {
  const normalizedId = normalizeProductId(data.product_id);
  const status = calculateStockStatus(data.current_stock);

  return {
    product_id: normalizedId,
    current_stock: data.current_stock,
    status,
    last_updated: new Date()
  };
};

module.exports = { processInventory };