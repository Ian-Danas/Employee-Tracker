//  Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "workplace_db",
  },
  console.log(`Connected to the workplace_db database.`)
);

function questionLoop() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "selection",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((ans) => {
      switch (ans.selection) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployees();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        default:
          console.log("thanks for using the program!");
          break;
      }
    });
}

async function viewEmployees() {
  const [rows, fields] = await db.promise()
    .query(`SELECT employee.first_name, employee.last_name, employee.manager_id, role.title,role.salary,department.name AS Department
    FROM employee 
    JOIN role 
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id
    JOIN employee
    WHERE employee.manager_id = employee.id;`);
  console.table(rows);
  questionLoop();
}
//TODO: add functionality for having manager names
async function addEmployees() {
  let allRoles = [];
  const [titles, Tfields] = await db.promise().query(`SELECT title FROM role;`);
  for (let i = 0; i < titles.length; i++) {
    const element = titles[i];
    allRoles.push(element.title);
  }
  const ans = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employees first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the employees last name?",
      name: "lastName",
    },
    {
      type: "list",
      message: "What is the employees role?",
      name: "role",
      choices: allRoles,
    },
    {
      type: "input",
      message: "What is the employees manager",
      name: "manager",
    },
  ]);
  let roleNum = 0;
  const [roleID, rField] = await db
    .promise()
    .query(`SELECT id FROM role WHERE title = ?;`, [ans.role]);
  roleNum = roleID[0].id;
  const [employee, eField] = await db
    .promise()
    .query(
      `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?);`,
      [ans.firstName, ans.lastName, roleNum, ans.manager]
    );
  questionLoop();
}
//functionality for updating an employee role
async function updateEmployee() {
  let allEmploy = [];
  const [rows, fields] = await db.promise().query(`SELECT employee.first_name,employee.last_name FROM employee;`)
  for (let i = 0; i < rows.length; i++) {
    const element = rows[i];
    const employeeStr = element.first_name + " " + element.last_name;
    allEmploy.push(employeeStr);
  }
  const [roles,rFields] = await db.promise().query(`SELECT role.title FROM role;`)
  let allRoles = [];
  for (let i = 0; i < roles.length; i++) {
    const roleObj = roles[i];
    console.log(roleObj)
    allRoles.push(roleObj.title);
  }

  const ans = await inquirer.prompt([
    {
      type: "list",
      message: "What employee would you like to update a role for?",
      name: "employee",
      choices: allEmploy,
    },
    {
      type: "list",
      message: "What role would you like the employee to have?",
      name: "role",
      choices: allRoles,
    },
  ]);
  let roleNum = 0;
  const [roleID, dField] = await db.promise().query(`SELECT id FROM role WHERE title = ?;`, [ans.role]);
  roleNum = roleID[0].id;
  let employeeId = 0;
  nameArr = ans.employee.split(" ")
  const firstName = nameArr[0]
  const lastName = nameArr[1]
  const [employeeID, eField] = await db.promise().query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?;`, [firstName,lastName]);
  employeeId = employeeID[0].id
  const [updateRole, updateField] = await db.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [roleNum,employeeId]);
  questionLoop();
}
async function viewRoles() {
  const [titles, fields] = await db.promise()
    .query(`SELECT department.name AS Department, role.title, role.salary
    FROM role 
    JOIN department 
    ON role.department_id = department.id;`);
  console.table(titles);
  questionLoop();
}
// functionality to addRoles
async function addRole() {
  let allDeps = [];
  const [rows, fields] = await db
    .promise()
    .query(`SELECT name FROM department;`);
  for (let i = 0; i < rows.length; i++) {
    const element = rows[i];
    allDeps.push(element.name);
  }
  const ans = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role?",
      name: "name",
    },
    {
      type: "input",
      message: "What is the roles salary?",
      name: "salary",
    },
    {
      type: "list",
      message: "What department does the role belong to",
      name: "dep",
      choices: allDeps,
    },
  ]);
  let depNum = 0;
  const [depID, dField] = await db.promise().query(`SELECT id FROM department WHERE name = ?;`, [ans.dep]);
  depNum = depID[0].id;
  const [role, rField] = await db
    .promise()
    .query(`INSERT INTO role(title, salary,department_id) VALUES (?, ?,?);`, [
      ans.name,
      ans.salary,
      depNum,
    ]);
  questionLoop();
}
async function viewDepartments() {
  const [rows, fields] = await db
    .promise()
    .query(`SELECT department.name AS Departments FROM department;`);
  console.table(fields);
  console.table(rows);
  questionLoop();
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department",
        name: "department",
      },
    ])
    .then((ans) => {
      db.query(
        `INSERT INTO department (name) VALUES (?);`,
        [ans.department],
        function (err, results) {}
      );
      questionLoop();
    });
}

questionLoop();
