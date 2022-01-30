"use strict";
$(main);

function main() {
	// Get the values from the form on submit
	$("#employeeForm").on("submit", handleFormSubmit);

	$("#tableBody").on("click", ".deleteButton", setRowRemover);
}

let totalMonthlySalary = 0;
let employeeIDs = [];
let employees = {};
let lightRow = true;

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
		$("#tableBody").append(`
            <tr id="${this.idNumber}">
                <td>${this.firstName}</td>
                <td>${this.lastName}</td>
                <td>${this.idNumber}</td>
                <td>${this.jobTitle}</td>
                <td>$${this.annualSalary.toFixed(2)}</td>
                <td>
                    <button class="deleteButton" row="${this.idNumber}" >Delete</button>
                </td>
            </tr>
        `);

		updateMonthlyCosts();
	}
}

function setRowRemover() {
	let id = $(this).attr("row");
	removeRow(id);
}

function removeRow(id) {
	let employee = employees[id];

	let idIndex = employeeIDs.indexOf(employee.idNumber);
	employeeIDs.splice(idIndex, 1);

	totalMonthlySalary -= employee.monthlySalary;

	$(`#${id}`).remove();

	updateMonthlyCosts();
}

function handleFormSubmit(e) {
	e.preventDefault();

	let inputs = e.target;

	if (
		inputs.firstName.value === "" ||
		inputs.lastName.value === "" ||
		inputs.jobTitle.value === "" ||
		inputs.annualSalary.value === ""
	) {
		alert("No fields can be left blank.");
		return;
	}

	if (employeeIDs.includes(inputs.idNumber.value)) {
		alert("You can't use the same ID twice.");
		return;
	}

    let id = inputs.idNumber.value === "" ? generateNewId() : inputs.idNumber.value;

	let newRow = new Employee(
		inputs.firstName.value,
		inputs.lastName.value,
		id,
		inputs.jobTitle.value,
		Number(inputs.annualSalary.value),
	);

	newRow.appendInfo();

    // Reset form inputs
    inputs.firstName.value = ""
    inputs.lastName.value = ""
    inputs.idNumber.value = ""
    inputs.jobTitle.value = ""
    inputs.annualSalary.value = ""
}

function generateNewId() {
    let id;

    do {
        id = Math.floor(Math.random() * 8999) + 1000;
    }
    while (employeeIDs.includes(id));

    return id.toString();
}

// Update the total monthly salary
function updateMonthlyCosts() {
    if (totalMonthlySalary > 20_000) {
        $('#totalMonthlySalaryHolder').css('color', 'var(--error)');
    }
    else {
        $('#totalMonthlySalaryHolder').css('color', 'var(--default)')
    }
	$(`#totalMonthlySalary`).text(totalMonthlySalary.toFixed(2));
}
