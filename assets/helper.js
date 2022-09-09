const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const db = require("../config/connection");

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
            console.log(chalk.magenta(`\n${table}\n`));
            // ask user for next action
            promptStart();
          }
        });
        break;
      case "View all roles":
        // console log table of all roles
        const roleQuery = `SELECT roles.id, roles.job_title, departments.department_name,  roles.salary FROM roles
          CROSS JOIN departments ON roles.department_id = departments.id;`;
        db.query(roleQuery, function (err, results) {
          if (err) {
            console.log(chalk.red(err));
          } else {
            const table = cTable.getTable(results);
            console.log(chalk.cyan(`\n${table}`));
            // ask user for next action
            promptStart();
          }
        });
        break;
      case "View all employees":
        // console log table of al employees
        const employeeQuery = `SELECT 
          employees.id, 
          employees.first_name, 
          employees.last_name, 
          roles.job_title,
          departments.department_name,
          roles.salary, 
          CONCAT(manager.first_name, " ", manager.last_name) AS manager
      FROM employees 
      LEFT JOIN roles 
      on employees.role_id = roles.id 
      LEFT JOIN departments 
      on roles.department_id = departments.id 
      LEFT JOIN employees manager 
      on manager.id = employees.manager_id;`;
        db.query(employeeQuery, function (err, results) {
          if (err) {
            console.log(chalk.red(err));
          } else {
            const table = cTable.getTable(results);
            console.log(chalk.blue(`\n${table}`));
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
        updateEmployeeRole();
        break;
      default:
        process.exit();
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
        console.log(chalk.magenta("Department successfully added!"));
        promptStart();
      }
    });
  });
  return;
}

// adds a user-input role to employees_db
function promptForNewRole() {
  let departmentNames;
  let departmentData;
  db.query("SELECT * FROM departments;", (err, result) => {
    departmentData = result;
    departmentNames = result.map(({ department_name }) => department_name);
    let addARoleQuestions = [
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is this role's salary?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "To which department does this role belong?",
        choices: departmentNames,
        name: "departmentName",
      },
    ];
    inquirer
      .prompt(addARoleQuestions)
      .then(({ roleName, roleSalary, departmentName }) => {
        let deptId;
        // for each object in the departmentData array,
        for (var dept of departmentData) {
          // If the object's department_name value matches the user's input value
          if ((dept.department_name = departmentName)) {
            //  deptId is equal to the id value off that object
            deptId = dept.id;
          }
        }

        const insertQuery = `INSERT INTO roles (job_title, salary, department_id) VALUES ("${roleName}", ${roleSalary}, ${deptId});`;
        db.query(insertQuery, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log(chalk.magenta("Role successfully added!"));
            promptStart();
          }
        });
      });
  });
}

// adds a user-input employee to employees_db
function promptForNewEmployee() {
  let jobTitles = [];
  let dataSet;
  let managerNames;

  // separate db query for jobTitles from roles table
  // db query to pull existing values
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.id AS role_id, employees.manager_id, roles.job_title FROM employees CROSS JOIN roles ON roles.id = employees.role_id;",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // capturing values to be used as user choices when entering a new employee
      dataSet = result;

      // working with Justin on this part
      // for (const obj of result) {
      //   if (obj.job_title) {
      //   }
      // }
      jobTitles = result.map(({ job_title, role_id }) => ({
        name: job_title,
        value: role_id,
      }));
      // let titles = jobTitlesUnfiltered.map((obj) => obj.job_title);
      // jobTitles = jobTitlesUnfiltered.filter(
      //   ({ job_title }, index) => !titles.includes(job_title, index + 1)
      // );
      console.log(chalk.red(jobTitles));

      let managers = result.filter((obj) => obj.manager_id === null);
      managerNames = managers.map(
        ({ id, first_name, last_name, job_title }) =>
          `${first_name} ${last_name} - ${job_title}`
      );
      managerNames.push("None");

      const addAnEmployeeQuestions = [
        {
          type: "input",
          message: "What is this employee's first name",
          name: "fName",
        },
        {
          type: "input",
          message: "What is this employee's last name",
          name: "lName",
        },
        {
          type: "list",
          message: "What is this employee's role",
          choices: jobTitles,
          name: "jobTitle",
        },
        {
          type: "list",
          message: "Who is this employee's manager",
          choices: managerNames,
          name: "managerNameConcat",
        },
      ];
      // inquirer prompts user for employee information
      inquirer
        .prompt(addAnEmployeeQuestions)
        .then(({ fName, lName, jobTitle, managerNameConcat }) => {
          let managerId;
          for (const obj of dataSet) {
            if (
              // if the user selected managerNameConcat includes both the object's first_name and last_name values
              managerNameConcat.includes(obj.first_name) &&
              managerNameConcat.includes(obj.last_name)
            ) {
              managerId = obj.id; //  set managerId equal to the employee id value off that object
            }
            if (managerNameConcat.includes("None")) {
              managerId = null; // if no manager selected, set managerId = null
            }
          }

          const insertQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${fName}", "${lName}", ${jobTitle}, ${managerId});`;
          db.query(insertQuery, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log(chalk.magenta("Employee successfully added!"));
              promptStart();
            }
          });
        });
    }
  );
}

// changes an employee's assigned role
function updateEmployeeRole() {
  // query to UPDATE (see M12 A9)
}

module.exports = promptStart;