const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const db = require("./assets/JS/connection");
const { Department, Role, Employee } = require("./assets/JS/constructor");

// inquirer question arrays
const startQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
    name: "userAction",
  },
];
const addADeptQuestion = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName",
  },
];
const addARoleQuestions = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is this role's assigned salary?",
    name: "roleSalary",
  },
  {
    type: "input",
    message: "Which department does this role belong in?",
    name: "roleDept",
  },
];
const addAnEmployeeQuestions = [
  {
    type: "input",
    message: "What is the employee's first name",
    name: "fName",
  },
  {
    type: "input",
    message: "What is the employee's last name",
    name: "lName",
  },
  {
    type: "input",
    message: "What is the employee's role",
    name: "empRole",
  },
  {
    type: "input",
    message: "Who is the employee's manager",
    name: "manager",
  },
];

// to begin, pass "node index.js start" in the terminal
function init() {
  if (process.argv[2] === "start") {
    console.log(chalk.yellow("Welcome to the employee tracker."));

    promptStart();
  }
}
init();

function promptStart() {
  inquirer.prompt(startQuestion).then((data) => {
    switch (data.userAction) {
      case "View all departments":
        // console log table of all departments
        db.query("SELECT * FROM departments", function (err, results) {
          if (err) {
            console.log(chalk.red(err));
          } else {
            const table = cTable.getTable(results);
            console.log(chalk.cyan(table));
          }
        });
        break;
      case "View all roles":
        // console log table of all roles
        break;
      case "View all employees":
        // console log table of al employees
        break;
      case "Add a department":
        promptForNewDept();
        break;
      case "Add a role":
        promptForNewRole();
        break;
      case "Add an employee":
        promptForNewEmployee();
        break;
      case "Update an employee role":
        // query to UPDATE (see M12 A9)
        // display updated data to the user?
        break;
    }
  });
}

function promptForNewDept() {}

function promptForNewRole() {}

function promptForNewEmployee() {}
