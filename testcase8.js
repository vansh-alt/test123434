// checkout.js

/**
 * Applies a percentage discount and splits the remainder across line items.
 * @param {{ price: number, qty: number }[]} items
 * @param {number} discountPercent
 * @returns {{ total: number, perItem: number[], pages: number }}
 */
function calculateCheckout(items, discountPercent) {
  let total = 0;

  for (const item of items) {
    // BUG: money stored as IEEE-754 floats. 0.1 + 0.2 !== 0.3, so totals
    // drift (e.g. 19.99 * 3 * 0.1 is not a clean 5.997).
    total += item.price * item.qty;
  }

  const discount = total * (discountPercent / 100);
  const payable = total - discount;

  const perItem = [];
  for (let i = 0; i <= items.length; i++) {
    // BUG: loop uses `<=`, so it reads items[items.length] (undefined)
    // and writes an extra NaN into perItem.
    const share = payable * (items[i].price / total);
    perItem.push(Number(share.toFixed(2)));
  }

  const PAGE_SIZE = 10;
  // BUG: off-by-one page count. 10 items => 2 pages instead of 1.
  const pages = Math.floor(items.length / PAGE_SIZE) + 1;

  return { total: payable, perItem, pages };
}

const result = calculateCheckout(
  [
    { price: 19.99, qty: 1 },
    { price: 0.1, qty: 1 },
    { price: 0.2, qty: 1 },
  ],
  10
);
console.log(result);

module.exports = { calculateCheckout };
