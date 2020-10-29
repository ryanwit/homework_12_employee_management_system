const inquirer = require("inquirer");
const mysql = require("mysql"); //*Import mysql pkg to use it!
// const logo = require("asciiart-logo");
require("console.table"); //*helps with table formatting
const connection = mysql.createConnection({ //*createConnection is built in through sql
    host: "localhost", //* always the same - boiler
    user: "root", //* always do this as your username - boiler
    password: "7209880262", //* My sql password - boiler
    port: 3306, //*should be the same - boiler
    database: "employee_tracker_db" //*information needed to create connection - reference the db from mysql
});

connection.connect(err => {
    if(err) throw err;
    console.log(`connect as id ${connection.threadId}`);

});



function start() {
    inquirer
        .prompt({
            name:"begin",
            type:"list",
            message:"What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees Roles",
                "Add Role",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Exit"
            ]
        })
        .then(function(answer){
            switch(answer.begin) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Employees Roles":
                    viewAllEmployeesRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case"Add Employee":
                    addEmployee();
                    break;
                case"Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                    default:
                    connection.end();
            }
        })

}

start();

function viewAllEmployees () {
    connection.query("SELECT * FROM employees", (err, res) => {
        if(err) throw err;
            console.table(res);
            connection.end();
        });
}

function viewAllEmployeesRoles () {
    connection.query("SELECT department.departmentName AS department, role.title FROM role LEFT JOIN department on role.departmentId = department.id;", (err, res) => {
        if(err) throw err;
        console.table(res);
        });
}

function addEmployee () {
    inquirer
        .prompt([
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
                type: "input",
                message: "What is the Id of their role?",
                name: "roleId"
            },
            {
                type: "input",
                message: "What is the ID of their manager?",
                name: "mgrId"
            },
        ])
        .then(function(answer){
            connection.query(
                "INSERT INTO employees SET?",
                {
                  firstName: answer.empName,
                  lastName: answer.empLast,
                  roleId: answer.roleId,
                  managerId: answer.mgrId
                },
                function(err) {
                    if(err) throw err;
                    console.log("Your employee was successfully added!");
                    start();
                }  
            )
        })

}



        



