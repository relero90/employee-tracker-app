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
      "Exit the employee tracker",
    ],
    name: "userReq",
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
    message: "What is this role's department id?",
    name: "roleDeptId",
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
    console.log(chalk.blue("Welcome to the employee tracker."));

    promptStart();
  }
}
init();

function promptStart() {
  inquirer.prompt(startQuestion).then(({ userReq }) => {
    switch (userReq) {
      case "View all departments":
        // console log table of all departments
        db.query("SELECT * FROM departments", function (err, results) {
          if (err) {
            console.log(chalk.red(err));
          } else {
            const table = cTable.getTable(results);
            console.log(chalk.cyan(`\nAll Departments`));
            console.log(chalk.magenta(`${table}\n`));
            console.log(chalk.cyan(`Press the down arrow to continue.`));
            // ask user for next action
            promptStart();
          }
        });
        break;
      case "View all roles":
        // console log table of all roles
        const selectQuery = `SELECT roles.id, roles.job_title, departments.department_name,  roles.salary FROM roles
        CROSS JOIN departments ON roles.department_id = departments.id;`;
        db.query(selectQuery, function (err, results) {
          if (err) {
            console.log(chalk.red(err));
          } else {
            const table = cTable.getTable(results);
            console.log(chalk.blue(`\nAll Roles`));
            console.log(chalk.cyan(`${table}\n`));
            console.log(chalk.blue(`Press the down arrow to continue.`));
            // ask user for next action
            promptStart();
          }
        });
        break;
      case "View all employees":
        // console log table of al employees
        db.query("SELECT * FROM employees", function (err, results) {
          if (err) {
            console.log(chalk.red(err));
          } else {
            const table = cTable.getTable(results);
            console.log(chalk.cyan(`\nAll Employees`));
            console.log(chalk.blue(`${table}\n`));
            console.log(chalk.cyan(`Press the down arrow to continue.`));
            // ask user for next action
            promptStart();
          }
        });
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
      default:
        break;
    }
  });
}

// adds a user-input department to employees_db
function promptForNewDept() {
  inquirer.prompt(addADeptQuestion).then(({ departmentName }) => {
    const insertQuery = `INSERT INTO departments (department_name) VALUES ("${departmentName}");`;

    db.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(chalk.magenta("Success!"));
        promptStart();
      }
    });
  });
}

// adds a user-input role to employees_db
function promptForNewRole() {
  inquirer
    .prompt(addARoleQuestions)
    .then(({ roleName, roleSalary, roleDeptId }) => {
      const insertQuery = `INSERT INTO roles (role_name, salary, department_id) VALUES ("${roleName}", ${roleSalary}, ${roleDeptId});`;

      db.query(insertQuery, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(chalk.magenta("Success!"));
          promptStart();
        }
      });
    });
}

// adds a user-input employee to employees_db
function promptForNewEmployee() {
  inquirer
    .prompt(addAnEmployeeQuestions)
    .then(({ fName, lName, empRole, manager }) => {
      const insertQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${fName}", "${lName}", ${empRole}, ${manager});`;

      db.query(insertQuery, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(chalk.magenta("Success!"));
          promptStart();
        }
      });
    });
}
