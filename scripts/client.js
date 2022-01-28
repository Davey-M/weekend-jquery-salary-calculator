"use strict";
$(main);
function main() {
    console.log('Jquery is ready');
    // Get the values from the form on submit
    $('#employeeForm').on('submit', handleFormSubmit);
}
let totalMonthlySalary = 0;
let employeeIDs = [];
class Employee {
    firstName;
    lastName;
    idNumber;
    jobTitle;
    annualSalary;
    monthlySalary;
    constructor(firstName, lastName, idNumber, jobTitle, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
        this.monthlySalary = this.annualSalary / 12;
        totalMonthlySalary += this.monthlySalary;
        employeeIDs.push(this.idNumber);
    }
    ;
    delete() {
        totalMonthlySalary -= this.monthlySalary;
        $(`#${this.idNumber}`).remove();
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
                    <button class="deleteButton" remover="${this.idNumber}" >Delete</button>
                </td>
            </tr>
        `);
    }
}
function handleFormSubmit(e) {
    e.preventDefault();
    console.log(e);
}
