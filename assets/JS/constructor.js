// a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these.

class Department {
  constructor(id, deptName) {
    this.id = id;
    this.deptName = deptName;
  }
}

class Role {
  constructor(id, roleName, salary, deptId) {
    this.id = id;
    this.roleName = roleName;
    this.salary = salary;
    this.deptId = deptId;
  }
}

class Employee {
  constructor(id, fName, lName, roleId, managerId) {
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.roleId = roleId;
    this.managerId = managerId;
  }
}

module.exports = {
  Department,
  Role,
  Employee,
};
