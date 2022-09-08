-- file only in use for testing sql queries

SELECT  
    employees.id,
    employees.first_name, 
    employees.last_name,
    roles.id AS role_id,
    employees.manager_id,
    roles.job_title
FROM employees
CROSS JOIN roles
ON roles.id = employees.role_id;


-- WHERE manager_id = NULL

-- to display available departments
-- SELECT department_name FROM departments;


-- to display roles table with department name inserted between role_name and salary
-- SELECT 
--     roles.id, 
--     roles.job_title, 
--     departments.department_name,  
--     roles.salary 
-- FROM roles
-- CROSS JOIN departments 
-- ON roles.department_id = departments.id;

-- to display employees table with job title, department name, salary, and manager included
-- SELECT 
--     employees.id, 
--     employees.first_name, 
--     employees.last_name, 
--     roles.job_title,
--     departments.department_name,
--     roles.salary, 
--     CONCAT(manager.first_name, " ", manager.last_name) AS manager
-- FROM employees 
-- LEFT JOIN roles 
-- on employees.role_id = roles.id 
-- LEFT JOIN departments 
-- on roles.department_id = departments.id 
-- LEFT JOIN employees manager 
-- on manager.id = employees.manager_id;