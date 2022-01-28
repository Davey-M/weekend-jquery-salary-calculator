"use strict";
$(main);

function main() {
    console.log('Jquery is ready');
    // Get the values from the form on submit
    $('#employeeForm').on('submit', handleFormSubmit);
}

let totalMonthlySalary = 0;
let employeeIDs = [];
let employees = {};

class Employee {

    constructor(firstName, lastName, idNumber, jobTitle, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
        this.monthlySalary = this.annualSalary / 12;

        totalMonthlySalary += this.monthlySalary;

        employeeIDs.push(this.idNumber);

        employees[this.idNumber] = this;
    }

    appendInfo() {
        $('#tableBody').append(`
            <tr id="${this.idNumber}">
                <td>${this.firstName}</td>
                <td>${this.lastName}</td>
                <td>${this.idNumber}</td>
                <td>${this.jobTitle}</td>
                <td>${this.annualSalary}</td>
                <td>
                    <button class="deleteButton" deleteTarget="${this.idNumber}" >Delete</button>
                </td>
            </tr>
        `);

        updateMonthlyCosts();
    }
}

function removeRow(id) {
    totalMonthlySalary -= employees[id].monthlySalary;
    $(`#${id}`).remove();
    updateMonthlyCosts();
}

function handleFormSubmit(e) {
    e.preventDefault();

    let inputs = e.target;

    let newRow = new Employee(
        inputs.firstName.value, 
        inputs.lastName.value, 
        inputs.idNumber.value, 
        inputs.jobTitle.value, 
        inputs.annualSalary.value,
    );

    newRow.appendInfo();
    
    console.log(e);
}

// Check for id already in use

// Update the total monthly salary
function updateMonthlyCosts() {
    $(`#totalMonthlySalary`).text(totalMonthlySalary);
}
