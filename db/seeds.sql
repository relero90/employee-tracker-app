INSERT INTO departments (department_name)
VALUES
    ("Aviary"),
    ("Aquaria"),
    ("Oversized Felines");

INSERT INTO roles (id, role_name, salary, department_id)
VALUES
    (1, "Poo Picker", 40000, 3),
    (2, "Glass Scrubber", 50000, 2),
    (3, "Squalk Backer", 40000, 1),
    (4, "Aquaman", 150000, 2),
    (5, "Feather Foreman", 150000, 1),
    (6, "Meow Manager", 150000, 3);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Bill", "Bean", 1, NULL),
    (2, "Bernie", "Queen", 3, NULL),
    (3, "Hollis", "Seen", 2, NULL),
    (4, "Floafus", "Mean", 5, 1),
    (5, "Cletus", "Gene", 4, 2),
    (6, "Floyd", "Lean", 6, 3);