const inquirer = require("inquirer");
const chalk = require("chalk");
const db = require("../config/connection");

const addADeptQuestion = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName",
  },
];

// adds a user-input department to employees_db
function promptForNewDept() {
  inquirer.prompt(addADeptQuestion).then(({ departmentName }) => {
    const insertQuery = `INSERT INTO departments (department_name) VALUES ("${departmentName}");`;
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(chalk.magenta("Department successfully added!"));
        promptStart();
      }
    });
  });
  return;
}

module.exports = promptForNewDept;
