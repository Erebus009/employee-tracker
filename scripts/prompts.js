const { restoreDefaultPrompts } = require("inquirer");


module.exports = {

    interfaceChoices : [
        
        {
            type:"list",
            name: 'program',
            message : 'What would you like to do?',
            choices: ['View All Departments','View All Employees','View All Roles','Add A Department','Add A Role','Add An Employee','Update Employee Role','Remove Role','Remove Employee','Remove Department','Quit'],
        }
        
            
    
    ],
    
    



}

