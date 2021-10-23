const Choices = require("inquirer/lib/objects/choices");

module.exports = {

    interfaceChoices : [
        
        {
            type:"list",
            name: 'program',
            message : 'What would you like to do?',
            choices: ['View All Employees','Update Employee ROle','View All Roles','Add Role','View All Departments','Add Department']

        }
        
            
    
    ],



}