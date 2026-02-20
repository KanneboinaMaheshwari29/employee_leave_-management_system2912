let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveToStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function addEmployee() {
    let name = document.getElementById("empName").value;
    let salary = parseFloat(document.getElementById("empSalary").value);

    if (name === "" || isNaN(salary)) {
        alert("Please enter valid details");
        return;
    }

    let employee = {
        name: name,
        salary: salary,
        leaves: 0,
        deduction: 0
    };

    employees.push(employee);
    saveToStorage();
    displayEmployees();
    updateDropdown();

    document.getElementById("empName").value = "";
    document.getElementById("empSalary").value = "";
}

function applyLeave() {
    let index = document.getElementById("employeeSelect").value;
    let leaveDays = parseInt(document.getElementById("leaveDays").value);

    if (isNaN(leaveDays) || leaveDays <= 0) {
        alert("Enter valid leave days");
        return;
    }

    employees[index].leaves += leaveDays;

    // Leave limit = 3
    if (employees[index].leaves > 3) {
        let extraLeaves = employees[index].leaves - 3;
        let dailySalary = employees[index].salary / 30;
        employees[index].deduction = extraLeaves * dailySalary;
    }

    saveToStorage();
    displayEmployees();

    document.getElementById("leaveDays").value = "";
}

function displayEmployees() {
    let table = document.getElementById("employeeTable");
    table.innerHTML = "";

    employees.forEach((emp) => {
        let row = `<tr>
            <td>${emp.name}</td>
            <td>${emp.salary}</td>
            <td>${emp.leaves}</td>
            <td>${emp.deduction.toFixed(2)}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function updateDropdown() {
    let dropdown = document.getElementById("employeeSelect");
    dropdown.innerHTML = "";

    employees.forEach((emp, index) => {
        dropdown.innerHTML += `<option value="${index}">${emp.name}</option>`;
    });
}

displayEmployees();
updateDropdown();