
 -- Sql script to create data base and create tables wit hrealtions using primary and foreign keys
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

use company_db;

CREATE TABLE department(
    id INT NOT null AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT null

);

CREATE TABLE role (
    id INT NOT NULL auto_increment PRIMARY KEY,
    department_id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL auto_increment PRIMARY KEY, 
   	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    foreign KEY (role_id)
    REFERENCES role(id),
    manager_id INT NOT NULL DEFAULT '1' references employee(id)
    );

   
   

   
