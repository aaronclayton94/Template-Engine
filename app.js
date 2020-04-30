const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

async function askquestions() {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
      },
      {
        type: "list",
        name: "role",
        message: "Select the employee's role?",
        choices: ["Manager", "Engineer", "Intern"]
      }
    ]);
  
  
    switch (answers.role) {
      case "Manager":
        const phone = await inquirer.prompt([
          {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
          }
        ]);
        teamMembers.push(
          new Manager(answers.name, answers.id, answers.email, phone.officeNumber)
        );
        addAnotherEmployee();
        break;
      case "Engineer":
        const gitHub = await inquirer.prompt([
          {
            type: "input",
            name: "gitHubUsername",
            message: "What is the engineer's github username?"
          }
        ]);
        teamMembers.push(
          new Engineer(answers.name, answers.id, answers.email, gitHub.gitHubUsername)
        );
        addAnotherEmployee();
        break;
      case "Intern":
        const school = await inquirer.prompt([
          {
            type: "input",
            name: "school",
            message: "What is your interns school?"
          }
        ]);
        teamMembers.push(
          new Intern(answers.name, answers.id, answers.email, school.school)
        );
        addAnotherEmployee();
        break;
      default:
    }
}
askquestions();
  
async function addAnotherEmployee() {
  const addMoreEmployee = await inquirer.prompt([
    {
      type: "confirm",
      name: "addAgain",
      message: "Do you want to add another employee?"
    }
  ]);
    
    addMoreEmployee.addAgain == true ? askquestions() : buildTeam(teamMembers);
  }
  function buildTeam(teamMembers) {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }