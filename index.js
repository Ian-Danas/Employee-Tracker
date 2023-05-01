//  Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require('mysql2')
const cTable = require('console.table')

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'workplace_db'
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
          choices:['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Quit']
        },
      ])
      .then((ans) => {
        switch (ans.selection) {
            case 'View All Employees':
              viewEmployees()
              break;
            case 'Add Employee':
              addEmployees()
              break;
            case 'Update Employee Role':
               updateEmployee()
              break;
            case 'View All Roles':
              viewRoles()
              break;
            case 'Add Role':
              addRole()
              break;
            case 'View All Departments':
              viewDepartments()
              break;
            case 'Add Department':
              addDepartment()
              break;
            default:
                console.log('thanks for using the program!')
          }
      });
    }


function viewEmployees(){
    db.query(`SELECT employee.first_name, employee.last_name, employee.manager_id, role.title,role.salary,department.name
    FROM employee 
    JOIN role 
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id;`, function (err, results) {
    console.table(results);
    questionLoop()
      });
}
function addEmployees(){
    let allRoles = []
    db.query(`SELECT title FROM role;`, function (err, results) {
       for (let i = 0; i < results.length; i++) {
        const element = results[i];
        allRoles.push(element.title)
       }
    })  
    inquirer
    .prompt([
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
          choices: allRoles
        },
        {
          type: "input",
          message: "What is the employees manager",
          name: "manager",
        },
    ])
    .then((ans) => {
        let roleNum = 0
        db.query(`SELECT id FROM role WHERE title = ?;`,[ans.role], function (err, results){
            roleNum = results[0].id
            console.log(roleNum)
            db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) 
            VALUES (?, ?, ?,?);`,[ans.firstName,ans.lastName,roleNum,ans.manager], function (err, results) {
                if (err){
                    console.log(err)
                }
            });
            questionLoop()
        })
        })
}
function updateEmployee(){
    console.log('selected view update an employee role')
    questionLoop()
}
function viewRoles(){
    db.query(`SELECT department.name AS department, role.title, role.salary
    FROM role 
    JOIN department 
    ON role.department_id = department.id;;`, function (err, results) {
    console.table(results);
    questionLoop()
      });
}
function addRole(){
    console.log('selected to add a role')
    questionLoop()
}
function viewDepartments(){
    db.query(`SELECT department.name AS Departments
    FROM department;`, function (err, results) {
    console.table(results);
    questionLoop()
      });
}
function addDepartment(){
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
          `INSERT INTO department (name) VALUES (?);`, [ans.department],function (err, results) {
        });
        questionLoop();
      });
}

function getAllRoles(){
    let allRoles = []
    db.query(`SELECT title FROM role;`, function (err, results) {
       for (let i = 0; i < results.length; i++) {
        const element = results[i];
        allRoles.push(element.title)
        // console.log('inside the function',allRoles)
       }
    })  
    return allRoles
}

questionLoop()