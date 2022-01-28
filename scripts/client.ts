$(main);

function main() {
    console.log('Jquery is ready');

    // Get the values from the form on submit
    $('#employeeForm').on('submit', handleFormSubmit);
}

let totalMonthlySalary = 0;
let employeeIDs = [];

class Employee {

    public monthlySalary: number;

    constructor(
        public firstName: string,
        public lastName: string,
        public idNumber: number,
        public jobTitle: string,
        public annualSalary: number,
    ) {
        this.monthlySalary = this.annualSalary / 12;
        totalMonthlySalary += this.monthlySalary;

        employeeIDs.push(this.idNumber);
    };

    delete() {

    }
}

function handleFormSubmit(e: any) {
    e.preventDefault();

    console.log(e);
}