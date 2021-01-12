const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // insert you personal password for mySQL below:
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
        case "Add role":
          addRole();
          break;
        case "Update employee's role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          break;
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
      choices: ["Logistics", "Support", "Opperations"],
    })
    .then((answer) => {
      let sql =
        "SELECT employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, managers.Manager FROM employees JOIN roles ON (employees.role_id = roles.id) JOIN departments ON (roles.departments_id = departments.id)JOIN managers ON (employees.manager_id = managers.id) WHERE (departments.department = ?)";

      connection.query(sql, answer.department, (err, res) => {
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
      choices: [
        "Manager",
        "Technitian",
        "Driver",
        "Teir 2 agent",
        "Customer Service Rep",
      ],
    })
    .then((answer) => {
      let sql =
        "SELECT employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, managers.Manager FROM employees JOIN roles ON (employees.role_id = roles.id) JOIN departments ON (roles.departments_id = departments.id)JOIN managers ON (employees.manager_id = managers.id) WHERE (roles.title = ?)";

      connection.query(sql, answer.title, (err, res) => {
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
        choices: [
          "Driver",
          "Manager",
          "Technitian",
          "Tier 2 agent",
          "Customer Service",
        ],
      },
      {
        name: "department",
        type: "rawlist",
        message: "Please select a department for the employee:",
        choices: ["Logistics", "Support", "Opperations"],
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
        "INSERT INTO managers SET ?",
        {
          manager: answer.manager,
        },
        (err, result) => {
          if (err) throw err;
          let managerId = result.insertId;
          connection.query(
            "INSERT INTO departments SET ?;",
            {
              department: answer.department,
            },
            (err, result) => {
              if (err) throw err;
              let departmentId = result.insertId;
              connection.query(
                "INSERT INTO roles SET ?",
                {
                  Title: answer.title,
                  Salary: answer.salary,
                  departments_id: departmentId,
                },
                (err, result) => {
                  if (err) throw err;
                  let roleId = result.insertId;
                  connection.query(
                    "INSERT INTO employees SET ?",
                    {
                      first_name: answer.firstName,
                      last_name: answer.lastName,
                      role_id: roleId,
                      manager_id: managerId,
                    },
                    (err, res) => {
                      if (err) throw err;
                      connection.query(
                        "SELECT employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, managers.Manager FROM employees JOIN roles ON (employees.role_id = roles.id) JOIN departments ON (roles.departments_id = departments.id)JOIN managers ON (employees.manager_id = managers.id)",
                        (err, result) => {
                          console.table(result);
                        }
                      );
                    }
                  );
                  runPrompt();
                }
              );
            }
          );
        }
      );
    });
};

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

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "Input",
        message: "Which Departmet does this role belong to?",
      },
      {
        name: "title",
        type: "Input",
        message: "Please input the of the role:",
      },
      {
        name: "salary",
        type: "input",
        message: "Please input numerical value for the employee's salary:",
        validate: (value) => {
          if (!isNaN(value)) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO departments SET ?",
        { department: answer.department },
        (err, result) => {
          let i = result.insertId;
          console.log(i);
          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              departments_id: i,
            },
            (err, res) => {
              if (err) throw err;
              connection.query(
                "SELECT roles.Title, departments.Department, roles.Salary FROM roles JOIN departments ON (roles.departments_id = departments.id)",
                (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  runPrompt();
                }
              );
            }
          );
        }
      );
    });
};

const updateRole = () => {
  connection.query(
    "SELECT employees.First_Name, employees.Last_Name, roles.Title FROM employees JOIN roles ON (employees.role_id = roles.id)",
    (err, res) => {
      inquirer
        .prompt([
          {
            name: "employee",
            type: "rawlist",
            message: "Please select an employee:",
            choices: () => {
              const employees = [];
              //convers res data into sting
              const employeeData = JSON.stringify(res);
              //converts string data to proper JSON format
              const employeeJSON = JSON.parse(employeeData);
              //loops through JSON data to format data with out including keys
              for (let i = 0; i < employeeJSON.length; i++) {
                let vals = Object.values(employeeJSON[i]);
                //formats data in string with while replacing all "," with a space
                const choices = vals.toString().replace(/,/g, " ");

                employees.push(choices);
              }
              return employees;
            },
          },
          {
            name: "title",
            type: "rawlist",
            message: "Please choose a title to to update:",
            choices: () => {
              const titles = [];
              const employeeData = JSON.stringify(res);
              //converts string data to proper JSON format
              const employeeJSON = JSON.parse(employeeData);
              //loops through JSON data to format data with out including keys
              for (let i = 0; i < employeeJSON.length; i++) {
                let vals = Object.entries(employeeJSON[i]);
                titles.push(vals[2][1]);
              }
              return titles;
            },
          },
        ])
        .then((answer) => {
          // constructs employee data as array split between each field
          let employeeData = answer.employee.split(" ");
          // removes all fields with exception of first_name
          let firstName = employeeData.slice(0, 1);
          // removes all fields with exception of last_name
          let lastName = employeeData.slice(1, 2);

          console.log(firstName + lastName);

          connection.query(
            "SELECT id FROM employees WHERE (first_name =? AND last_name =?)",
            [`${firstName}`, `${lastName}`],
            (err, res) => {
              if (err) throw err;
              let employeeId;
              for (let i = 0; i < res.length; i++) {
                const employeeRawId = JSON.stringify(res[i]);
                const employeeJSON = JSON.parse(employeeRawId);
                console.log(employeeRawId);
                console.log(employeeJSON);
                  let vals = Object.values(employeeRawId[6]);
                employeeId = vals;
                console.log(vals);
                  
                }
                
              // }
              connection.query(
                "SELECT id FROM roles WHERE id = ?",
                [answer.title],
                (err, res) => {
                  if (err) throw err;
                  let roleId;
                  for (let i = 0; i < res.length; i++) {
                    roleId = res[i].id;
                    // let roleJson =JSON.parse(roleID)
                    console.log(roleId);
                  }

                  connection.query(
                    "UPDATE employees SET id =? WHERE role_id = ?",
                    // [{first_name: employeeId}, {role_id: roleId}],
                    [`${employeeId}`, [answer.title]],
                    (err, res) => {
                      if (err) throw err;
                      console.table(res);
                      runPrompt();
                    }
                  );
                }
              );
            }
          );
        });
    }
  );
};
