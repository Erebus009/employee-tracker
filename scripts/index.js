const inquirer = require('inquirer')
const prompts = require('./prompts')


function BeginApp(){
inquirer.prompt(prompts.interfaceChoices)
    .then((answers)=> {
        console.log(answers);
    }).catch((error) => {
        if(error){
            console.log(error);
        }

    })
}


BeginApp()