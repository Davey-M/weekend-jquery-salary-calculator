"use strict";
$(main);
function main() {
    console.log('Jquery is ready');
    // Get the values from the form on submit
    $('#employeeForm').on('submit', handleFormSubmit);
}
class employee {
}
function handleFormSubmit(e) {
    e.preventDefault();
    console.log(e);
}
