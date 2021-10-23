const { restoreDefaultPrompts } = require("inquirer");


module.exports = {

    interfaceChoices : [
        
        {
            type:"list",
            name: 'program',
            message : 'What would you like to do?',
            choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Quit'],
        }
        
            
    
    ],
    addEmployee : [
        {
            type: 'input',
            name: 'first_name',
            message: "First Name of the employee you wish to add?"

        },
        {
            type: 'input',
            name: 'last_name',
            message: "Last name of the employee you wish to add?"
        },
        {
            type: 'list',
            name: 'title',
            message: "Title of this employee?",
            choices: () => answers.map(choice => choice.d.name)
        },
        {
            type: 'input',
            name: 'employee',
            message: "Last name of the employee you wish to add?"
        },
        {
            type: 'input',
            name: 'employee',
            message: "Last name of the employee you wish to add?"
        },
    ]



}

