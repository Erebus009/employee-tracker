const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 3000;
const prompts = require("./scripts/prompts");
const inquirer = require("inquirer");
const { log } = require("console");
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//--------------------------------------------------------------------|
//// Connection to localhost company database with data tables info..-|
//--------------------------------------------------------------------|
const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",

    password: "root",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);
//--------------------------------------------------------
// Begins the CLI app to use choices from imported js file prompts
//--------------------------------------------------------
function BeginApp() {
  inquirer
    .prompt(prompts.interfaceChoices)
    .then((answers) => {
      //----------------------------------------------------------------------
      // All the cases for user choices to do something realted to user choice.
      //----------------------------------------------------------------------
      switch (answers.program) {
        case "View All Employees":
          console.log("List of all employees");
          allEmployees();
          break;
        case "Add Employee":
          console.log("Adding Employee");
          addEmployee();
          break;
        case "Update Employee Role":
          console.log("update role");
          updateEmployeeRole();
          break;
        case "View All Roles":
          console.log("Viewing all Roles");
          BeginApp();
          break;
        case "Add Role":
          console.log("Add role to employee");
          BeginApp();
          break;
        case "View All Departments":
          console.log("Cya later");
          BeginApp();
          break;
        case "Add Department":
          console.log("Cya later");
          BeginApp();
          break;
        case "Quit":
          console.log("Cya later");
          break;
      }
      console.log(answers);
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
}
//------------------------------------------------------------------------|
//Displays all the current employees and sorts them by employee id number.|
//------------------------------------------------------------------------|
function allEmployees() {
  db.query(
    `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.name AS "Department", r.salary AS "Salary" FROM employee e
  INNER JOIN roles r ON r.id = e.role_id INNER JOIN department d ON d.id = r.department_id ORDER by e.id;`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
        BeginApp();
      }
    }
  );
}
//----------------------------------------------------------------------------------------
// Add employee function takes two inputs and then a choice from list of roles from SQL DB
// ---------------------------------------------------------------------------------------

function addEmployee() {
  db.query("SELECT title FROM roles", (err, results) => {
    console.log(results);
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "First Name of the employee you wish to add?",
        },
        {
          type: "input",
          name: "last_name",
          message: "Last name of the employee you wish to add?",
        },
        {
          type: "list",
          name: "role",
          message: "Role of this employee?",
          choices: function () {
            let array = results.map((choice) => choice.title);
            return array;
          },
        },
        // Takes user answer and then converts into a query for SQL to add to the employee data table.
      ])
      .then((answers) => {
        db.query(
          `INSERT INTO employee(first_name, last_name, role_id) 
         VALUES('${answers.first_name}', '${answers.last_name}',
         (SELECT id FROM roles WHERE title = "${answers.role}"));`,
          BeginApp()
        );
      });
  });
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//First gives list of all employees first and last name, then after choice gives list of all roles that can be added then pushes it to database table employee.""
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

function updateEmployeeRole() {
  db.query(
    `SELECT DISTINCT employee.last_name as 'last_name', roles.title FROM employee JOIN roles ON employee.role_id = roles.id`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "last",
            message: "Which employee do you wish to update role for.",
            choices: function () {
              let array = results.map((choice) => choice.last_name);
              return array;
            },
          },
          {
            type: "list",
            name: "role",
            message: "what role do you want to give this employee?",
            choices: function () {
              let array1 = results.map((choice) => choice.title);
              return array1;
            },
          },
        ]).then((answer) => {
            db.query(`UPDATE employee SET role_id = (SELECT id FROM roles WHERE title = ?) Where id = (Select id from(Select id from employee WHERE last_name = ?) AS tmptable)`, [answer.role, answer.last], 
            (err,results) => {
              if(err) throw err
              console.log(results),
              BeginApp()
            })

        })
    });
}

function allRoles() {}

function addRole() {}
function viewAllDepartments() {}
function addDepartment() {}

//______________________
// Adds a listener to port
//_______________________
app.listen(PORT, () => {});

BeginApp();
