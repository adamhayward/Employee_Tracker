USE employee_DB;


INSERT INTO departments (department)
VALUES ("Finance"), ("Marketing"), ("Opperations");

INSERT INTO role (title, salary, departments_id)
VALUES ("Manager", 100.00, 1), ("Manager", 350.00, 2), ("Technitian", 150.00, 3);

INSERT INTO manager (manager) 
VALUES ("Adam Hayward"),("Josh Ward");

INSERT INTO employee (`first name` , `last name`, role_id, manager_id)
VALUES ("Adam","Hayward",1,2), ("Milton","Freeman",2,1); 

-- INSERT INTO employee (firs_name, last_name, role_id, manager_id)
-- VALUES ("Adam", "Hayward");
-- INSERT INTO employee (firs_name, last_name, role_id, manager_id)
-- VALUES ("Milton", "Freeman");
-- INSERT INTO employee (firs_name, last_name, role_id, manager_id)
-- VALUES ("Josh", "Ward");
-- INSERT INTO employee (firs_name, last_name, role_id, manager_id)
-- VALUES ("Scott", "Addkisson");