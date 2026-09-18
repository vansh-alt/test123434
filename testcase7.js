// configMerge.js

const defaults = {
  theme: "light",
  notifications: true,
  role: "user",
};

/**
 * Merges user-supplied settings over application defaults.
 * @param {object} userSettings
 * @returns {object}
 */
function applyUserSettings(userSettings) {
  const settings = { ...defaults };

  // BUG: recursive merge copies `__proto__` / `constructor.prototype`.
  // Payload `{ "__proto__": { "role": "admin" } }` pollutes Object.prototype.
  function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  return deepMerge(settings, userSettings || {});
}

function canAccessAdmin(settings) {
  return settings.role === "admin";
}

module.exports = { applyUserSettings, canAccessAdmin, defaults };
