// fileDownload.js

const fs = require("fs");
const path = require("path");

const UPLOADS_DIR = path.join(__dirname, "uploads");

/**
 * Streams a previously uploaded file to the client.
 * @param {string} filename
 * @returns {Buffer}
 */
function getUpload(filename) {
  // BUG: filename is joined onto the uploads dir with no sanitization.
  // `../.env` or `../../etc/passwd` escapes the intended directory.
  const filePath = path.join(UPLOADS_DIR, filename);
  return fs.readFileSync(filePath);
}

function listUploads() {
  return fs.readdirSync(UPLOADS_DIR);
}

module.exports = { getUpload, listUploads, UPLOADS_DIR };
