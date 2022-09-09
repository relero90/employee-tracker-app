INSERT INTO departments (department_name)
VALUES
    ("Aviary"),
    ("Oversized Felines"),
    ("Aquaria");

INSERT INTO roles (job_title, salary, department_id)
VALUES
    ("Feather Foreman", 90000, 1),
    ("Meow Manager", 90000, 2),
    ("Aquaman", 90000, 3),
    ("Squalk Backer", 40000, 1),
    ("Doo Picker", 40000, 2),
    ("Glass Scrubber", 50000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Billy", "Bean", 1, NULL),
    ("Bernie", "Bod", 2, NULL),
    ("Hollis", "Holmes", 3, NULL),
    ("Floafus", "Fortiscue", 4, 1),
    ("Floyd", "Freeman", 5, 3),
    ("Cletus", "Queen", 6, 2);