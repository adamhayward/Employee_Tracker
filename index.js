const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Kk2ux8aa!",
  database: "employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connectd");
  runPrompt();
});

const runPrompt = () => {
  inquirer
    .prompt({
      name: "option",
      type: "rawlist",
      message: "Please select from the following options:",
      choices: [
        "view all employees",
        "view employees by department",
        "View employees by role",
        "Add Employee",
        "Add department",
        "Add role",
        "Update employee's role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.option) {
        case "view all employees":
          queryEmployees();
          break;
        case "view employees by department":
          queryDepartment();
          break;
        // case "View employees by role":
        //   queryRole();
        //   break;
        // case "Add Employee":
        //   addEmployees();
        //   break;
        // case "Add department":
        //   addDepartment();
        //   break;
        // case "Add role":
        //   addRole();
        //   break;
        // case "Update employee's role":
        //   updateRole();
        //   break;
        // case "Exit":
        // connection.end();
        // break;
      }
    });
};

const queryEmployees = () => {
  let sql =
    "SELECT employee.`First Name`, employee.`Last Name`, role.Title, departments.Department, role.Salary, manager.Manager FROM employee JOIN role ON (employee.role_id = role.id) JOIN departments ON (role.departments_id = departments.id)JOIN manager ON (employee.manager_id = manager.id)";
  // let query = "SELECT employee.first_name, employee.last_name FROM employee";
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("All Employees:");
    for (let i = 0; i < res.length; i++) {
      // console.table({firstName: `${res[i].first_name}`, lastName: `${res[i].last_name}`, title: `${res[i].title}`});
      console.table([res[i]]);
    }
    runPrompt();
  });
};

const queryDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "rawlist",
      message: "Please select from the following departments:",
      choices: ["Finance", "Marketing", "Opperations"],
    })
    .then((answer) => {
      let sql =
        "SELECT employee.`First Name`, employee.`Last Name`, role.Title, departments.Department, role.Salary, manager.Manager FROM employee JOIN role ON (employee.role_id = role.id) JOIN departments ON (role.departments_id = departments.id)JOIN manager ON (employee.manager_id = manager.id) WHERE (departments.department = ?)";

      connection.query(sql, [answer.department], (err, res) => {
        for (let i = 0; i < res.length; i++) {
          console.table([res[i]]);
        }
        runPrompt();
      });
    });
};
