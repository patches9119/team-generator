const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

inquirer.registerPrompt('recursive', require('inquirer-recursive'));

const employees = [];


const collectInputs = async (inputs = []) => {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter employee Name: '
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter employee ID: '
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter employee email: '
      },
      {
        type: 'input',
        name: 'role',
        message: 'Enter employee role: '
      },
      {
        type: 'input',
        name: 'extra',
        message: 'Enter the additional employee details: '
      },
      {
        type: 'confirm',
        name: 'again',
        message: 'Enter another employee? ',
        default: true
      }
    ];
  
    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? collectInputs(newInputs) : newInputs;
  };
  
  const main = async () => {
    const inputs = await collectInputs();
    console.log(inputs);
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].role.toLowerCase() === 'engineer' ) {
            let x = new Engineer(inputs[i].name,inputs[i].id,inputs[i].email,inputs[i].extra);
            employees.push(x);
        } else if(inputs[i].role.toLowerCase() === 'intern') {
            let x = new Intern(inputs[i].name,inputs[i].id,inputs[i].email,inputs[i].extra);
            employees.push(x);
        } else if(inputs[i].role.toLowerCase() === 'manager') {
            let x = new Manager(inputs[i].name,inputs[i].id,inputs[i].email,inputs[i].extra);
            employees.push(x);
        }
    }
    //console.log(render(employees));
    fs.writeFile("output.html", render(employees), function(err) {
        if (err) {
            console.log(err)
        }
        console.log("complete!");
    })
  };
  
  main();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
