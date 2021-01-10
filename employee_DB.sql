DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_Db;

CREATE TABLE departments (
    id INT NOT NULL auto_increment,
    department VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL auto_increment,
    title  VARCHAR(30),
    salary DECIMAL,
    departments_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE managers (
id INT NOT NULL auto_increment,
manager VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL auto_increment,
    first_name  VARCHAR(30),
    last_name  VARCHAR(30),
    role_id  INT,
    manager_id  INT,
    PRIMARY KEY (id)
);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;


