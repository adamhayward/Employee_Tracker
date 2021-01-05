const mysql = require("mysql");
const mysql = inquirer("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Kk2ux8aa!",
  database: "emplouee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connectd" / n);
  prompt();
});

const prompt = () => {
  inquirer
    .prompt({
      name: "option",
      type: "list",
      message: "Please select from the following options:",
      choices: [
        "view all employees",
        "view employees by department",
        "View employees by role",
        "Update employee's role",
        "Add Employee",
        "Add department",
        "Add role",
      ],
    })
    .then((answer) => {
      if (answer.option === "view all employees") {
        queryEmployees();
      }else if (answer.option === "view employees by department") {
          queryDepatment();
      }else if (answer.option === "View employees by role") {
          queryRole();
      }else if (answer.option === "Update employee's role") {
          updateRole();
      }else if (answer.option === "Add Employee") {
          createEmployee();
      }else if (answer.option === "Add department") {
          createDepartment();
      }else (answer.option === "Add role") {
          createRole();
      }
    });
};

const queryEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};
