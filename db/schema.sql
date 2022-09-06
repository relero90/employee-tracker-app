DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT NOT NULL,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY,
    role_name VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id),
    REFERENCES departments(id), --returns error
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id),
    REFERENCES roles(id),
    ON DELETE SET NULL,
    --manager_id should reference the id of another employee that is the manager of the current employee
    FOREIGN KEY (manager_id),
    REFERENCES employees(id), --returns error
    ON DELETE SET NULL
)