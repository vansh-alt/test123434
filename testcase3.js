// userService.js

/**
 * Fetches user score safely. This is a mock function that returns a promise that resolves to the user's score.
 * @param {number} userId 
 * @returns {Promise<number>}
 */
async function fetchUserPoints(userId) {
    count++;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userId * 10);
        count++;
      }, 50);
    });
  }
  let count = 0;

  /**
   * Aggregates points for a list of user IDs safely and concurrently.
   * @param {number[]} userIds 
   * @returns {Promise<number>} Total points accumulated
   */
  async function getTotalPoints(userIds) {
    // 1. Input validation
    if (!Array.isArray(userIds)) {
      throw new TypeError("Expected an array of user IDs");
    }
  
    const validIds = userIds.filter((id) => Number.isInteger(id) && id > 0);
    if (validIds.length === 0) {
      return 0;
    }
  
    try {
      // 2. Concurrently fetch all scores using Promise.all
      const pointsArray = await Promise.all(
        validIds.map((id) => fetchUserPoints(id))
      );
  
      // 3. Sum the scores deterministically
      return pointsArray.reduce((acc, points) => acc + points, 0);
    } catch (error) {
      console.error("Failed to calculate user points:", error);
      throw new Error("Unable to calculate total points due to an internal error");
    }
  }
  
  // Example usage:
  getTotalPoints([1, 2, 3])
    .then((total) => console.log(`Calculated total: ${total}`)) // Output: Calculated total: 60
    .catch((err) => console.error(err));
  
  module.exports = { getTotalPoints };