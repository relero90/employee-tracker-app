INSERT INTO departments (department_name)
VALUES
    ("Aviary"),
    ("Aquaria"),
    ("Oversized Felines");

INSERT INTO roles (job_title, salary, department_id)
VALUES
    ("Poo Picker", 40000, 3),
    ("Glass Scrubber", 50000, 2),
    ("Squalk Backer", 40000, 1),
    ("Aquaman", 90000, 2),
    ("Feather Foreman", 90000, 1),
    ("Meow Manager", 90000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Bill", "Bean", 1, NULL),
    ("Bernie", "Queen", 3, NULL),
    ("Hollis", "Seen", 2, NULL),
    ("Floafus", "Mean", 5, 1),
    ("Cletus", "Gene", 4, 2),
    ("Floyd", "Lean", 6, 3);