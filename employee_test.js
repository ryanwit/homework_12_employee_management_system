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

// connection.connect(err => {
//     if(err) throw err;
//     console.log(`connect as id ${connection.threadId}`);

// });

// pageLoad();

// function pageLoad() {
//     var logoText = logo({ name: "RYRY MGMT"}.render());
//     console.log(logoText);
//     start();
// }

start();

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
                "Add Department",
                "Update Employee Role",
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
                case"Add Department":
                    addDepartment();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                    default:
                    connection.end();
            }
        })

}

/* --------------------------- view all employees --------------------------- */

function viewAllEmployees () {
    connection.query("SELECT employees.firstName, employees.lastName, role.title, role.salary FROM employees LEFT JOIN role ON employees.roleId = role.id;", (err, res) => {
        if(err) throw err;
            console.table(res);
            start();
        });
}

/* ----------------------------- view all roles ----------------------------- */

function viewAllEmployeesRoles () {
    connection.query("SELECT department.departmentName AS department, role.title FROM role LEFT JOIN department on role.departmentId = department.id;", (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
        });
}

/* -------------------------------- add role -------------------------------- */

function addRole () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the title of the role?",
                name: "roleTitle"
            },
            {
                type: "input",
                message: "What is salary of the role?",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "What is the department Id?",
                name: "departmentId"
            },
        ])
        .then(function(answer){
            connection.query(
                "INSERT INTO role SET?",
                {
                  title: answer.roleTitle,
                  salary: answer.roleSalary,
                  departmentId: answer.departmentId
                },
                function(err) {
                    if(err) throw err;
                    console.log("Your new role was successfully added!");
                    start();
                }  
            )
        })
}

/* ------------------------------ add employee ------------------------------ */

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


/* -------------------------------- add department -------------------------------- */
function addDepartment () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "deptName"
            },
        ])
        .then(function(answer){
            connection.query(
                "INSERT INTO department SET?",
                {
                    departmentName: answer.deptName,
                },
                function(err) {
                    if(err) throw err;
                    console.log("Your department was successfully added!");
                    start();
                }  
            )
        })
}

/* -------------------------- update employee role -------------------------- */
function updateEmployeeRole () {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM role", function (err, results){
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "empId",
                    message: "What is the employee Id whose role you'd like to update?",
                    type: "input"
                },
                {
                    name: "choice",
                    type: "rawlist", 
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    },
                    message: "What role would you like to update?"
                },
                
            ])
            .then (function (answer){
                // get the information of the chose item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if(results[i].title === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                    connection.query(
                        "UPDATE employees SET ? WHERE ?",
                        [
                            {
                                roleId: chosenItem.id
                            },
                            {
                                id: answer.empId
                            }
                        ],
                        function (error) {
                            if(error) throw (err);
                            console.log("Update role Successfully!"); 
                            start();
                        }
                    );
                }
               
        );
    });
}
        



