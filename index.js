const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
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
        // case "view employees by department":
        //   queryDepartment();
        //   break;
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

// const queryEmployees = () => {
//   let query =
//     "SELECT employee.first_name, employee.last_name, role.title, role.salary";
//   query +=
//     "FROM employee INNER JOIN role ON (employee.role_id = role.id) ";
//   connection.query(query, (err, res) => {
//     if (err) throw err;
//     console.log("All Employees:");
//     for (let i = 0; i < res.length; i++) {
//       console.log([res[i].first_name, res[i].last_name, res[i].title, res[i].salary]);

//     }
//     runPrompt();
//   });
// };
const queryEmployees = () => {
// let query =
//    "SELECT employee.first_name, employee.last_name, role.title, role.salary FROM employee JOIN role ON (employee.role_id = role.id)";
let query =
   "SELECT employee.`First Name`, employee.`Last Name`, role.Title, departments.Department, role.Salary, manager.Manager FROM employee JOIN role ON (employee.role_id = role.id) JOIN departments ON (role.departments_id = departments.id)JOIN manager ON (employee.manager_id = manager.id)";
  // let query = "SELECT employee.first_name, employee.last_name FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;

    console.log("AllEmployees:");
    for (let i = 0; i < res.length; i++) {
      // console.table({firstName: `${res[i].first_name}`, lastName: `${res[i].last_name}`, title: `${res[i].title}`});
      console.table(res[i]);
    }
    runPrompt();
  });
}
