-- SQL table info to insert to allow results return soemthing other then undefined
INSERT INTO department(name)
VALUES
('Management'),
('Engineer'),
('Shipping'),
('Developer'),
('Quality Control'),
('DevOPS Management'),
('Accounting');

INSERT INTO roles(title, salary, department_id)
VALUES
('Manager', 100000, 1),
('Full stack developer', 67000, 2),
('QA tester', 72000, 4),
('Warehouse Driver', 45000, 3),
('Accountant', 47000, 6),
('Tech Lead', 89000, 7);

INSERT INTO employee(first_name, last_name, role_id) 
VALUES
('Bob', 'Haggart', 2),
('Money', 'Joe', 3),
('Jim', 'Franken', 2),
('Moose', 'Poe', 3),
('Hank', 'Hill', 1),
('Mono', 'Hands', 7);