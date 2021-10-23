const inquirer = require('inquirer')
const prompts = require('./prompts')
//--------------------------------------------------------
// Begins the CLI app to use choices from imported js file prompts
//--------------------------------------------------------
function BeginApp(){
inquirer.prompt(prompts.interfaceChoices)
    .then((answers)=> {
        //----------------------------------------------------------------------
        // All the cases for user choices to do something realted to user choice.
        //----------------------------------------------------------------------
        switch(answers.program){
            case 'View All Employees':
            console.log('List of all employees');
            BeginApp();
            break
            case 'Add Employee':
            console.log('Adding Employee');
            BeginApp();
            break
            case 'View All Roles':
            console.log('Viewing all Roles');
            BeginApp();
            break
            case 'Add Role':
            console.log('Add role to employee');
            BeginApp();
            break
            case 'View All Departments':
            console.log('Cya later');
            BeginApp();
            break
            case 'Add Department':
            console.log('Cya later');
            BeginApp();
            break
            case 'Quit':
            console.log('Cya later');
            break
            
        }
        console.log(answers);
    }).catch((error) => {
        if(error){
            console.log(error);
        }

    })
}


BeginApp()