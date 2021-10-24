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
          allEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Roles":
          allRoles();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "View All Departments":
          
          viewAllDepartments();
          break;
        case "Add Department":
          
          addDepartment();
          break;
        case "Remove Department":
         
          removeDepartment();
          break;
        case "Quit":
          console.log("Cya later! :)");
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
    `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"FROM employee e  LEFT JOIN roles r  ON r.id = e.role_id 
    LEFT JOIN department d 
    ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id ORDER BY e.id;`,
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
    `SELECT DISTINCT employee.first_name as 'first', employee.last_name as 'last_name', roles.title FROM employee JOIN roles ON employee.role_id = roles.id`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
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
        ])
        .then((answer) => {
          db.query(
            `UPDATE employee SET role_id = (SELECT id FROM roles WHERE title = ?) Where id = (Select id from(Select id from employee WHERE last_name = ?) AS tmptable)`,
            [answer.role, answer.last],
            (err, results) => {
              if (err) throw err;
              console.log(results), 
              BeginApp();
            }
          );
        });
    }
  );
}
//------------------------------------------------------
// Displays all current roles in the company
//------------------------------------------------------
function allRoles() {
  db.query(
    `select * from roles order by department_id`,
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
//----------------------------------------------------------------||||
// removes employee based on employee id from database using user input value {example: user inputs 5, employee with id 5 is removed.}
//----------------------------------------------------------------||||


function removeEmployee() {
  db.query(
    `select  e.id, concat(e.first_name," ",e.last_name) as 'Full Employee Name',roles.title from employee e join roles on e.role_id = roles.id`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
      }
    }
  );
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter Id of the employee that you you wish to remove?",
      },
    ])
    .then((answer) => {
      db.query(
        `DELETE FROM employee Where ?`,
        { id: answer.name },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
          }
          BeginApp();
        }
      );
    });
}

//========================================
//same function as addDepartment with only changes db.query paths
//========================================
function addRole(){
  db.query('Select * from department', (err,results) => {
    if (err){
      console.log(err);
    } else {
      console.table(results);
    }
  

  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What role do you wish to add to the company?'

    },
    {
      type:'input',
      name: 'salary',
      message: 'What is the salary of this role?'
    },
    {
      type: 'list',
      name: 'department',
      choices: () => {
        let array = results.map((choices) => choices.name)
        return array
      }
    },
  ]
  ).then((answer) => {
    db.query(`INSERT INTO roles(title,salary,department_id) VALUES('${answer.role}', '${answer.salary}', (Select id from department where name = "${answer.department}"))`, (err,results) => {
      if(err){
        console.log(err);
      } else {
        console.log(results);
        BeginApp();
      }
    
    })
  })
})
}
//===============================
//same as remove department function just removes role instead
//===============================

function removeRole(){
  db.query(`SELECT * From roles`, (err,results) => {
    if (err){
      console.log(err);
    } else {
      console.table(results)
    }
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter Id of the role that you you wish to remove?",
      },
    ])
    .then((answer) => {
      db.query(
        `DELETE FROM roles Where ?`,
        { id: answer.name },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
          }
          BeginApp();
        }
      );
    });
})
}



//====================================================================================
//Displays all departments then takes user input and adds it to the table using db.query
//====================================================================================


function addDepartment() {
    db.query(`SELECT * from department`,(err,results) => {
      if(err){
        console.log(err);
      }else{
        console.table(results);
      }
    })


  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Which department do you wish to add?'
    }
  ]).then((answer) => {
    db.query(
      `INSERT INTO department(name) VALUES(?)`, answer.department)
     BeginApp()

  })

}
//==============================================================
// Takes department table and displays it as a console.table log 
//==============================================================


function viewAllDepartments() {
  db.query(`SELECT * From department`, (err,results) => {
    if (err){
      console.log(err);
    } else {
      console.table(results)
      BeginApp();
    }
  })



}
//=============================================
//Using the same fucntion as remove employee going to remove department from list by it's id from user input
//=============================================
function removeDepartment(){
  db.query(`SELECT * From department`, (err,results) => {
    if (err){
      console.log(err);
    } else {
      console.table(results)
    }
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter Id of the department that you you wish to remove?",
      },
    ])
    .then((answer) => {
      db.query(
        `DELETE FROM department Where ?`,
        { id: answer.name },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
          }
          BeginApp();
        }
      );
    });
})
}



//______________________
// Adds a listener to port
//_______________________
app.listen(PORT, () => {});

BeginApp();
