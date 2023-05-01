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
    console.log(`Connected to the movies_db database.`)
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
    console.log('selected add an employee')
    questionLoop()
}
function updateEmployee(){
    console.log('selected view update an employee role')
    questionLoop()
}
function viewRoles(){
    console.log('selected view all roles')
    questionLoop()
}
function addRole(){
    console.log('selected to add a role')
    questionLoop()
}
function viewDepartments(){
    console.log('selected view all departments')
    questionLoop()
}
function addDepartment(){
    console.log('selected to add a department')
    questionLoop()
}

questionLoop()