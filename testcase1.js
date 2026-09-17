// calculateUserTotals.js

async function calculateUserTotals(userIds) {
    let total = 0;
    for (const userId of userIds) {
        const points = await fetchUserPoints(userId);
        total += points;
    }
    return total;
}

async function fetchUserPoints(userId) {
    // Simulating an asynchronous database query or API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(userId * 10), 50);
    });
  }
  
  async function getTotalPoints(userIds) {
    let total = 0;
  
    // BUG: forEach does not await async callbacks.
    // The loop finishes synchronously before any of the promises resolve.
    userIds.forEach(async (id) => {
      const points = await fetchUserPoints(id);
      total += points;
    });
  
    // Returns 0 immediately instead of the actual sum!
    return total;
  }
  
  // Example usage demonstrating the failure:
  getTotalPoints([1, 2, 3]).then((result) => {
    console.log(`Calculated total: ${result}`); // Output: Calculated total: 0
  });