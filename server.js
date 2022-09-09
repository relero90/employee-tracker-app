const chalk = require("chalk");
const promptStart = require("./assets/helper");

// to begin, pass "node index.js start" in the terminal
function init() {
  if (process.argv[2] === "start") {
    console.log(chalk.magenta("Welcome to the employee tracker."));
    promptStart();
  }
}
init();
