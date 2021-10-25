 -- Sql script to create data base and create tables with realtions using primary and foreign keys
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

use company_db;

CREATE TABLE department(
    id INT NOT null AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT null

);

CREATE TABLE roles (
    id INT NOT NULL auto_increment PRIMARY KEY,
    department_id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
   	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT,
	manager_id INT,
	FOREIGN KEY(role_id) REFERENCES roles(id),
	FOREIGN KEY(manager_id) REFERENCES employee(id)
    );
   
   

   
