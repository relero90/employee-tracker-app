DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- create parent table -> departments
CREATE TABLE departments (
    id INT UNSIGNED AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

-- create table -> roles
CREATE TABLE roles (
    -- parent to table->employees
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30),
    salary DECIMAL,
    -- child to table->departments
    department_id INT UNSIGNED,
    INDEX department_id (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    -- child to table->roles
    role_id INT UNSIGNED NOT NULL,
    INDEX role_id (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    -- references the id value of another employee in this table who is manager to this employee
    manager_id INT UNSIGNED,
    INDEX man_id (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);