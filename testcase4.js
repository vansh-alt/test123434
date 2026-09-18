// inventoryService.js

const inventory = {
  "sku-100": { name: "Widget", stock: 1 },
  "sku-200": { name: "Gadget", stock: 5 },
};

/**
 * Reserves an item if it appears to be in stock.
 * @param {string} sku
 * @returns {Promise<{ok: boolean, sku: string}>}
 */
async function reserveItem(sku) {
  const item = inventory[sku];

  // BUG: check-then-act race. Two concurrent callers can both see stock > 0
  // before either decrements, so the same last unit is sold twice.
  if (!item || item.stock <= 0) {
    return { ok: false, sku };
  }

  await new Promise((resolve) => setTimeout(resolve, 30));
  item.stock -= 1;
  return { ok: true, sku };
}

async function checkout(sku, quantity) {
  const reservations = [];
  for (let i = 0; i < quantity; i++) {
    reservations.push(reserveItem(sku));
  }
  return Promise.all(reservations);
}

// Concurrent checkouts both succeed even though only 1 unit exists.
checkout("sku-100", 1).then((r) => console.log("order A", r));
checkout("sku-100", 1).then((r) => console.log("order B", r));

module.exports = { reserveItem, checkout, inventory };
