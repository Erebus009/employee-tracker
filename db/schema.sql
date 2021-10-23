
 -- Sql script to create data base and create tables wit hrealtions using primary and foreign keys
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

use company_db;

CREATE TABLE department(
    id INT not null AUTO_INCREMENT primary key,
    name VARCHAR(30) NOT null

);

CREATE TABLE role (
    id INT NOT null auto_increment primary key,
    department_id INT not null,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL auto_increment primary KEY, 
   	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT not null,
    foreign KEY (role_id)
    REFERENCES role(id),
    manager_id INT NOT NULL DEFAULT '1' references employee(id)
    );

   
   

   
