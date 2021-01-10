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
        "Filter employees by department",
        "Filter employees by role",
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
        case "Filter employees by department":
          queryDepartments();
          break;
        case "Filter employees by role":
          queryRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
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
    "SELECT employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, managers.Manager FROM employees JOIN roles ON (employees.role_id = roles.id) JOIN departments ON (roles.departments_id = departments.id)JOIN managers ON (employees.manager_id = managers.id)";
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("All Employees:");
    console.table(res);
    runPrompt();
  });
};

const queryDepartments = () => {
  inquirer
    .prompt({
      name: "department",
      type: "rawlist",
      message: "Please select from the following departments:",
      choices: ["Finance", "Marketing", "Opperations"],
    })
    .then((answer) => {
      let sql =
        "SELECT employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, managers.Manager FROM employees JOIN roles ON (employees.role_id = roles.id) JOIN departments ON (roles.departments_id = departments.id)JOIN managers ON (employees.manager_id = managers.id) WHERE (departments.department = ?)";

      connection.query(sql, [answer.department], (err, res) => {
        for (let i = 0; i < res.length; i++) {
          console.table([res[i]]);
        }
        runPrompt();
      });
    });
};

const queryRoles = () => {
  inquirer
    .prompt({
      name: "title",
      type: "rawlist",
      message: "Please select from the following job titles:",
      choices: ["Manager", "Technitian", "Engineer"],
    })
    .then((answer) => {
      let sql =
        "SELECT employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, managers.Manager FROM employees JOIN roles ON (employees.role_id = roles.id) JOIN departments ON (roles.departments_id = departments.id)JOIN managers ON (employees.manager_id = managers.id) WHERE (roles.title = ?)";

      connection.query(sql, [answer.title], (err, res) => {
        for (let i = 0; i < res.length; i++) {
          console.table([res[i]]);
        }
        runPrompt();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please input employee's first name:",
      },
      {
        name: "lastName",
        type: "input",
        message: "Please input employee's last name:",
      },
      {
        name: "title",
        type: "rawlist",
        message: "Please select a title for the employee:",
        choices: ["Manager", "Technitian", "Engineer"],
      },
      {
        name: "department",
        type: "rawlist",
        message: "Please select a department for the employee:",
        choices: ["Finance", "Marketing", "Opperations"],
      },
      {
        name: "salary",
        type: "input",
        message: "Please input numerical value for the employee's salary:",
        // logic to ensure user inputs salary data as a number
        validate: (value) => {
          if (!isNaN(value)) {
            return true;
          }
          return false;
        },
      },
      {
        name: "manager",
        type: "input",
        message: "Please input employee's manager:",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
        },
        (err, res) => {
          if (err) throw err;
          connection.query(
            "INSERT INTO roles SET ?;",
            {
              Title: answer.title,
              Salary: answer.salary,
            },
            (err, res) => {
              if (err) throw err;
              connection.query(
                "INSERT INTO departments SET ?",
                {
                  Department: answer.department,
                },
                (err, res) => {
                  if (err) throw err;
                  connection.query(
                    "INSERT INTO managers SET ?",
                    {
                      Manager: answer.manager,
                    },
                    (err, res) => {
                      if (err) throw err;
                      console.log(
                        `Employee:\n ${answer.firstName} ${answer.lastName}, was successfully added to the Employee data base.`
                      );
                      queryEmployees();
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
};
//     .then((answer) => {
//       connection.query(
//         "INSERT INTO employees VALUES ? INNER JOIN roles ON (employees.role_id = roles.id) WHERE (roles.title = ?) INNER JOIN departments ON (roles.departments_id = departments.id) WHERE (departmetns.department = ?) INNER JOIN managers ON (employees.manger_id = mangers.id) WHERE (managers.manager = ?)",
//       // connection.query(
//       //   "INSERT INTO employees SET ? RIGHT JOIN roles ON (employees.role_id = roles.id) WHERE (roles.title = ?) INNER JOIN departments ON (roles.departments_id = departments.id) WHERE (departmetns.department = ?) INNER JOIN managers ON (employees.manger_id = mangers.id) WHERE (managers.manager = ?)",
//         {
//           First_Name: answer.firstName,
//           Last_Name: answer.lastName,
//           role_id: answer.title,
//           manager_id: answer.manager,
//         },
//         (err, res) => {
//           if (err) throw err;

//           console.log(
//             `Employee:\n ${answer.firstName} ${answer.lastName}, was successfully added to the Employee data base.`
//           );
//           queryEmployees();
//         }
//       );
//     });
// };

const addDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "Input",
      message: "Please input the name of the new department:",
    })
    .then((answer) => {
      let sql = "INSERT INTO departments SET ?";
      connection.query(sql, { department: answer.department }, (err, res) => {
        if (err) throw err;
        // console.log(`A new '${answer.department}' department was successfully added`);
        connection.query("SELECT * FROM departments", (err, res) => {
          if (err) throw err;
          console.table(res);
        });
        runPrompt();
      });
    });
};
