// pingService.js
const { exec } = require("child_process");

function pingHost(userInputHost, callback) {
  // DANGEROUS / HARMFUL PATTERN:
  // Direct string interpolation into a shell command allows arbitrary command execution.
  // An input like "8.8.8.8; rm -rf /" or "8.8.8.8 && cat /etc/passwd"
  // will execute unintended system commands with the application's privileges.
  const command = `ping -c 1 ${userInputHost}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, stdout);
  });
}

module.exports = { pingHost };