const members = [
    {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
    {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
];



//OLD WAY DEMO - CONSTRUCTOR FUNCTION
// function Employee(firstName, lastName, email, birthdate, salary) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.birthdate = birthdate;
//     this.salary = salary;
//   }

//   Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
//     return new Employee(firstName, lastName, email, birthdate, salary);
//   };

//   Employee.prototype.editEmployee = function(updates) {
//     Object.assign(this, updates);
//   };

//   // Usage example:
//   const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
//   console.log(bill);

//   bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
//   console.log(bill);


//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate
// 2. Instantiate (i.e. create a new instance) of an Employee with your info and save it to a const with your first name
// 3. After step 2, console log your const and then try to console.log parts of the object
// 4. Then create a const array that creates many "new Employee" objects and says to an array.  Console this object as a whole and parts of it
// 5. Add methods to your class to "getEmployees" which just returns all the fields in the object.
//    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS
// 6. Try to get instances of your class object to display in the table.  You can set the innerhtml of the
//    of the table to be empty and then replace it with the looped-through values of your object

class Employee {
  constructor(firstName, lastName, email, birthdate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
  }

  getEmployee() {
    return this;
  }

  static addEmployee(firstName, lastName, email, birthdate) {
    return new Employee(firstName, lastName, email, birthdate);
  }

  editEmployee(updates) {
    Object.assign(this, updates);
  }
}

const alan = new Employee("Alan", "Cupul", "alancupul@utexas.edu", "08-27-2004");

console.log(alan.firstName);


const employees = [
  new Employee("John", "Doe", "john@gmail.com", "01-01-2001"),
  new Employee("Jane", "Doe", "jane@gmail.com", "01-01-2020"),
  new Employee("Bob", "Doe", "bob@gmail.com", "12-01-2001"),
];

const testAdd = [
  Employee.addEmployee("a", "b", "c", "d"),
  Employee.addEmployee("a", "b", "c", "d"),
  Employee.addEmployee("a", "b", "c", "d"),
];

console.log(employees[0].firstName);
console.log(employees);

console.log(testAdd);

const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
console.log(bill);

bill.editEmployee({firstName: "Boo", lastName: "Jane", email: "e@gmail.com", birthdate: "2020202020"})
console.log(bill);
//Try to output 3 instances of your class object into the table

//How Clint got his array of objects into the HTML Table
//get the table from the dom
const tableBody = document.querySelector("#employeeTable tbody");
// Clear existing rows in the table
tableBody.innerHTML = "";
// Populate the table
employees.forEach(employees => {
  // Use getFullDetails() to fetch employee data
  const details = employees.getEmployee();
//   console.log(details) ;
  // Create a new row
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${details.firstName}</td>
  <td>${details.lastName}</td>
  <td>${details.email}</td>
  <td>${details.birthdate}</td>
`;
// Append the row to the table
tableBody.appendChild(row);
});



/// CALLBACKS

function sendInvoice(clientName, callback) {
  console.log(`Generating invoice for ${clientName}...`);
  setTimeout(() => {
    callback(`Invoice sent to ${clientName}`);
  }, 1500);
}

sendInvoice("John Doe", (confirmation) => {
  console.log("Email sent:", confirmation);
});


// PROMISES
function verifyPayment(orderTotal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderTotal < 5000) {
        resolve(`Payment of $${orderTotal} approved`);
      } else {
        reject(`Payment of $${orderTotal} requires manager approval`);
      }
    }, 1500);
  });
}

verifyPayment(3000)
  .then(console.log)
  .catch(console.error);

verifyPayment(6000)
  .then(console.log)
  .catch(console.error);


// ASYNC/AWAIT
async function verifyRefund(requestId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Refund verification passed for request #${requestId}`) 
    }, 1000);
  });
}

async function reversePayment(requestId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Payment reversed for request #${requestId}`);
    }, 2000);
  });
}

async function processRefund(requestId) {
  try {
    const verification = await verifyRefund(requestId);
    console.log(verification);

    const reversal = await reversePayment(requestId);
    console.log(reversal);

    return `Refund complete for request #${requestId}`;
  } catch (error) {
    console.error("Refund process failed:", error);
    return error;
  }
}

// Test calls
// processRefund("01")
// processRefund("02")
processRefund("01").then(console.log);
processRefund("02").then(console.log);