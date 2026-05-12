const normalizeProductId = (id) => {
  return id.toUpperCase().trim();
};

const normalizeProductName = (name) => {
  return name.trim();
};

const calculateStockStatus = (stock) => {
  if (stock < 0) return "ERROR";
  if (stock <= 5) return "LOW_STOCK";
  return "STOCK IS GOOD";
};

const processInventory = (data) => {
  const normalizedId = normalizeProductId(data.product_id);
  const normalizedName = normalizeProductName(data.product_name);
  const status = calculateStockStatus(data.current_stock);

  return {
    product_id: normalizedId,
    product_name: normalizedName,
    current_stock: data.current_stock,
    status,
    last_updated: new Date()
  };
};

module.exports = { processInventory };