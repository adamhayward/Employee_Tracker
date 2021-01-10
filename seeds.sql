USE employee_DB;


INSERT INTO departments (department)
VALUES ("Logistics"), ("Support"), ("Opperations");

INSERT INTO roles (title, salary, departments_id)
VALUES ("Manager", 55000, 1), ("Driver", 45000, 1), ("Teir 2 agent", 32000, 2),("Customer Service Rep", 48000, 2),("Manager", 60000, 3),("Technitian", 52000, 3);

INSERT INTO managers (manager) 
VALUES ("Linda Watson"),("Josh Ward"),("Jacob Ortega"),("Tracy Maloney");

INSERT INTO employees (first_name , last_name, role_id, manager_id)
VALUES ("Adam","Hayward",5,3), ("Milton","Freeman",2,1), ("Scott", "Hargrove",3,1); 

