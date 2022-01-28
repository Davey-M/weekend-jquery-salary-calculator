$(main);

function main() {
    console.log('Jquery is ready');

    // Get the values from the form on submit
    $('#employeeForm').on('submit', handleFormSubmit);
}

class Employee {
    constructor(
        public firstName: string,
        public lastName: string,
        public idNumber: number,
        public jobTitle: string,
        public annualSalary: number,
    ) {};
}

function handleFormSubmit(e: any) {
    e.preventDefault();

    console.log(e);
}