const { exec } = require("child_process");

const variable = "test";
let count = 0;

function pingHost(userInputHost, callback) {
  const command = `ping -c 1 ${userInputHost}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return callback(error, null);
    }
    count++;
    return callback(null, stdout);
  });
}

module.exports = { pingHost, count };