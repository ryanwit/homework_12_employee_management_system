// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = [];

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");
// const render = require("./lib/htmlRenderer"); 

/* -------------------------------------------------------------------------- */
/*                               INITIAL-PROMPT                               */
/* -------------------------------------------------------------------------- */


function initialPrompt() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "initialPrompt",
            message: "What would you like to do",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                    ]
        },

    ]).then(response => {
        switch(response.employeeSelection) {
            case "Engineer": 
            generateEngineer() 
            break;
            case "Intern":
            generateIntern()
            break;
            default: 
                buildTeam()
        }
    })
}   

/* ------------------------------ ADD EMPLOYEE ------------------------------ */

function addEmployee() {
    inquirer.prompt([
        {
        type: "input",
        message: "What is the employees first name?",
        name: "empName"
        },
        {
        type: "input",
        message: "What is the employees last name?",
        name: "empLast"
        },
        {
        type: "list",
        message: "What is the employees role?",
        name: "empRole",
        choices: [
            "Sales Lead",
            "Sales Person",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead"
                ]
        },
        {
        type: "list",
        message: "Who is the employee's manager?",
        name: "empMgr",
        choices: [
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Tupkin",
            "Malia Brown",
            "Sarah Lourd",
            "null"
                ]         //Todo: Ask about - MSG READS: Added {employee name} to the database - this would be a console log in the .then statement below 
        },
        
    ]).then((response) => {
        const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOffice)
        team.push(manager)
        createMember()
    })
}

addEmployee()
    
/* ------------------------- UPDATE EMPLOYEE MANAGER ------------------------ */

function updateEmployeeMgr() {
    inquirer.prompt([
        {
        type: "list",
        message: "Which employee's manager do you want to update?",
        name: "empUpdateMgrName",
        choices: [
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Tupkin",
            "Malia Brown",
            "Tom Allen",
            "John Doe",
            "NEWLY ADDED EMP" //Todo: Ask about - How would we have the newly added emp on this list?
                ]
        },
        {
        type: "list",
        message: "Which employee do you want to set as manager for the selected employee?",
        name: "empMgr",
        choices: [
            "John Doe",
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Tupkin",
            "Malia Brown",
            "Sarah Lourd",
            "Tom Allen"
                ]   //Todo: Ask about - MSG READS: "Added {employee name} to the database"
        },
    ]).then((response) => {
        const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)
        team.push(engineer)
        createMember()
    })
}

/* ------------------------- UPDATE EMPLOYEE ROLE ------------------------ */

function updateEmployeeRole() {
    inquirer.prompt([
        {
        type: "list",
        message: "Which employee's role do you wish to update",
        name: "empRoleName",
        choices: [
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Tupkin",
            "Malia Brown",
            "Tom Allen",
            "John Doe",
            "NEWLY ADDED EMP" //Todo: Ask about - How would we have the newly added emp on this list?
                ]
        },
        {
        type: "list",
        message: "Which role do you want to set for the selected employee?",
        name: "empRoleUpdate",
        choices: [
            "John Doe",
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Tupkin",
            "Malia Brown",
            "Sarah Lourd",
            "Tom Allen"
                ]   //Todo: Ask about - MSG READS: "Added {employee name} to the database"
        },
    ]).then((response) => {
        const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)
        team.push(engineer)
        createMember()
    })
}

/* ----------------------------- REMOVE EMPLOYEE ---------------------------- */

function removeEmp() {
    inquirer.prompt([
        {
        type: "list",
        message: "What employee would you like to remove?",
        name: "removeEmp",
        choices: [
            "John Doe",
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Tupkin",
            "Malia Brown",
            "Sarah Lourd",
            "Tom Allen"
                ]   //Todo: Ask about - MSG READS: "Removed Employee from the database"

        },
    ]).then((response) => {
        const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool)
        team.push(intern)
        createMember()
})
}
/* ------------------------------- Build Team ------------------------------- */

function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        console.log("test1")
        fs.mkdirSync(OUTPUT_DIR)
    }
    console.log("test")
    fs.writeFileSync(outputPath, render(team), 'utf-8')
 }
