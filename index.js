const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const generateHTML = require('./src/generateHTML');

const employees = [];
let manager = {};

const mainMenu = async () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['Add Engineer', 'Add Intern', 'Finish building team'],
    },
  ]);
};

inquirer
  .prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'Name of Team Manager',
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'ID of Team Manager',
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'Email of Team Manager',
    },
    {
      type: 'input',
      name: 'managerOffice',
      message: 'Office number of Manager:',
    },
  ])
  .then((managerAnswers) => {
    manager = {
      managerName: managerAnswers.managerName,
      managerId: managerAnswers.managerId,
      managerEmail: managerAnswers.managerEmail,
      managerOffice: managerAnswers.managerOffice,
    };
    addEmployee();
});

function addEmployee() {
    mainMenu().then(async (answers) => {
        if (answers.choice === 'Add Engineer') {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Name of Engineer:',
              },
              {
                type: 'input',
                name: 'email',
                message: 'Email of Engineer:',
              },
              {
                type: 'input',
                name: 'id',
                message: 'ID of Engineer:',
              },
              {
                type: 'input',
                name: 'github',
                message: 'Github of Engineer:',
              },
          ])
          .then((engineerAnswers) => {
            const engineer = {
              name: engineerAnswers.name,
              role: 'Engineer',
              email: engineerAnswers.email,
              id: engineerAnswers.id,
              github: engineerAnswers.github,
            };
            employees.push(engineer);
            addEmployee();
          });
        } else if (answers.choice === 'Add Intern') {
          inquirer
          .prompt([
            {
              type: 'input',
              name: 'name',
              message: 'Name of Intern:',
            },
            {
              type: 'input',
              name: 'email',
              message: 'Email of Itern:',
            },
            {
              type: 'input',
              name: 'id',
              message: 'ID of Intern:',
            },
            {
              type: 'input',
              name: 'school',
              message: 'School of Intern:',
            },
        ])
        .then((internAnswers) => {
          const intern = {
            name: internAnswers.name,
            role: 'Intern',
            email: internAnswers.email,
            id: internAnswers.id,
            school: internAnswers.school,
          };
          employees.push(intern);
          addEmployee();
        });
        } else {
          const html = generateHTML(manager,employees);
          const filePath = path.join(__dirname, 'dist', 'index.html');
          fs.writeFileSync(filePath, html);
          console.log('Team built, exiting.');
        }
      })
    };