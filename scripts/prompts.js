const { restoreDefaultPrompts } = require("inquirer");


module.exports = {

    interfaceChoices : [
        
        {
            type:"list",
            name: 'program',
            message : 'What would you like to do?',
            choices: ['View All Employees','Add Employee','Update Employee Role','Remove Employee','View All Roles','Add Role','View All Departments','Add Department','Quit'],
        }
        
            
    
    ],
    
    



}

