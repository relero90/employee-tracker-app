const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "",
  database: "employee_db",
});

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
