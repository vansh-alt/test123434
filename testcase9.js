// commentRenderer.js

/**
 * Renders a user comment into the page.
 * @param {string} username
 * @param {string} body
 * @returns {string}
 */
function renderComment(username, body) {
  // BUG: unsanitized HTML is interpolated. body like
  // `<img src=x onerror="alert(document.cookie)">` executes in the browser.
  return `<div class="comment"><strong>${username}</strong>: ${body}</div>`;
}

function renderFeed(comments) {
  return comments.map((c) => renderComment(c.username, c.body)).join("\n");
}

module.exports = { renderComment, renderFeed };
