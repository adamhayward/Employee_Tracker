-- Drops the employee_DB if it exists currently --
DROP DATABASE IF EXISTS employee_DB;
-- Creates the "employee_DB" database --
CREATE DATABASE employee_DB;
-- Makes it so all of the following code will affect employee_DB --
USE employee_Db;
-- Creates the table "department" within employee_DB --
CREATE TABLE department (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) --to hold department name--,
    PRIMARY KEY (id)
);
-- Creates the table "role" within employee_DB --
CREATE TABLE role (
    id INT NOT NULL auto_increment,
    title - VARCHAR(30) -- to hold role title--,
    salary - DECIMAL -- to hold role salary--,
    department_id - INT NULL--to hold reference to department role belongs to--,
    PRIMARY KEY (id)
);
-- Creates the table "employee" within employee_DB --
CREATE TABLE employee (
    id INT NOT NULL auto_increment,
    first_name - VARCHAR(30) -- to hold employee first name--,
    last_name - VARCHAR(30) --to hold employee last name--,
    role_id - INT NULL -- to hold reference to role employee has--
    manager_id - INT NOT NULL --to hold reference to another employee that manages the employee being Created.--
    PRIMARY KEY (id)
);
