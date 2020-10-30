DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE employees(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  roleId INTEGER(11),
  managerId INTEGER(11)
);

CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(100),
  salary DECIMAL(10),
  departmentId INTEGER(10)
);

CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  departmentName VARCHAR(30)
);

INSERT INTO employees (firstName, lastName, roleId, managerId) values ('John', 'Doe', 1, 3); -- mgr = ashley rodriguez --
INSERT INTO employees (firstName, lastName, roleId, managerId) values ('Mike', 'Chan', 2, 1);-- mgr = john doe --
INSERT INTO employees (firstName, lastName, roleId, managerId) values ('Ashley', 'Rodriguez', 3, null); -- null manager --
INSERT INTO employees (firstName, lastName, roleId, managerId) values ('Kevin', 'Tupkin', 4, 3);-- mgr = ashley rodriguez --
INSERT INTO employees (firstName, lastName, roleId, managerId) values ('Malia', 'Brown', 5, null);-- null manager --
INSERT INTO employees (firstName, lastName, roleId, managerId) values ('Sarah', 'Lourd', 6, null);-- null manager --
INSERT INTO employees (firstName, lastName, roleId, managerId) values ('Tom', 'Allen', 7, 6); -- mgr = sarah lourd --
INSERT INTO employees (firstName, lastName, roleId, managerId) values ('Christian', 'Eckenrode', 8, 2); -- mgr = mike chan --

INSERT INTO role (title, salary, departmentId) values ('Sales Lead', 100000, 1); -- sales dept 1--
INSERT INTO role (title, salary, departmentId) values ('Salesperson', 80000, 1);-- sales dept 1--
INSERT INTO role (title, salary, departmentId) values ('Lead Engineer', 150000, 2);-- engineering dept 2--
INSERT INTO role (title, salary, departmentId) values ('Software Engineer', 120000, 2);-- engineering dept 2--
INSERT INTO role (title, salary, departmentId) values ('Accountant', 125000, 3);-- finance dept 3--
INSERT INTO role (title, salary, departmentId) values ('Legal Team Lead', 250000, 4);-- legal dept 4--
INSERT INTO role (title, salary, departmentId) values ('Lawyer', 190000, 4);-- legal dept 4--
INSERT INTO role (title, salary, departmentId) values ('Lead Engineer', 150000, 2);-- engineer dept 2--

INSERT INTO department (departmentName) values ('Sales');-- sales dept 1--
INSERT INTO department (departmentName) values ('Engineering');-- engineering dept 2--
INSERT INTO department (departmentName) values ('Finance');-- finance dept 3--
INSERT INTO department (departmentName) values ('Legal');-- legal dept 4--

SELECT * FROM employees;
SELECT * FROM role;
SELECT * FROM department;

-- id out of the table of role --
SELECT department.departmentName AS department, role.title FROM role LEFT JOIN department on role.departmentId = department.id;
SELECT role.id, role.title, department.departmentName AS department, role.salary FROM role LEFT JOIN department on role.departmentId = department.Id;
SELECT * FROM employees;

SELECT employees.firstName, employees.lastName, role.title, role.salary FROM employees LEFT JOIN role ON employees.roleId = role.id;

