INSERT INTO departments (department_name)
VALUES
    ("Aviary"),
    ("Oversized Felines"),
    ("Aquaria"),
    ("Reptile Room");

INSERT INTO roles (job_title, salary, department_id)
VALUES
    ("Feather Foreman", 90000, 1),
    ("Meow Manager", 90000, 2),
    ("Aquaman", 90000, 3),
    ("Squalk Backer", 40000, 1),
    ("Doo Picker", 40000, 2),
    ("Glass Scrubber", 50000, 3),
    ("Resident Parseltongue", 90000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Moira", "Rose", 1, NULL),
    ("Carol", "Baskin", 2, NULL),
    ("Jason", "Momoa", 3, NULL),
    ("John", "Oliver", 4, 1),
    ("Mike", "Rowe", 5, 3),
    ("Ralph", "Macchio", 6, 2);