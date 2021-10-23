const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 3000;
const prompts = require("./scripts/prompts");
const inquirer = require("inquirer");
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
          let array = results.map(choice => choice.title)
          return array;
        }
      },
    // Takes user answers and then converts into a query for SQL to add to the employee data table.
    ]).then((answers) => {
      db.query(
        `INSERT INTO employee(first_name, last_name, role_id) 
         VALUES('${answers.first_name}', '${answers.last_name}',
         (SELECT id FROM roles WHERE title = "${answers.role}"));`
    )
    })
  
  });
}



//______________________
// Adds a listener to port
//_______________________
app.listen(PORT, () => {});

BeginApp();
