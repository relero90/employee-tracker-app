-- file only in use for testing sql queries

-- to display roles table with department name inserted between role_name and salary
SELECT roles.id, roles.job_title, departments.department_name,  roles.salary FROM roles
CROSS JOIN departments ON roles.department_id = departments.id;

-- to display employees table with job title, department name, & salary included
-- How do I reference the manager key?
SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.job_title,
    departments.department_name,
    roles.salary
FROM employees 
CROSS JOIN roles 
ON employees.role_id = roles.id
CROSS JOIN departments
ON roles.department_id = departments.id;