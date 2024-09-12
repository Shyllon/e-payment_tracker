// Array to hold payment data
let payments = [];

// Function to handle form submission
document.querySelector('#payment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the form values
    const name = document.querySelector('#name').value;
    const amount = document.querySelector('#amount').value;
    const month = document.querySelector('#month').value;
    const year = document.querySelector('#year').value;
    const date = new Date().toLocaleDateString();

    // Add the payment to the array
    payments.push({ name, amount, month, year, date });

    // Update the payment log and check payments
    updatePaymentLog();
    checkPayments();

    // Clear the form
    document.querySelector('#name').value = '';
    document.querySelector('#amount').value = '';
    document.querySelector('#month').value = 'January';
    document.querySelector('#year').value = new Date().getFullYear();
});

// Function to update the payment log
function updatePaymentLog() {
    const paymentLog = document.querySelector('#payment-log tbody');
    paymentLog.innerHTML = ''; // Clear existing log

    // Loop through payments and display them
    payments.forEach((payment) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.name}</td>
            <td>${payment.amount}</td>
            <td>${payment.month} ${payment.year}</td>
            <td>${payment.date}</td>
        `;
        paymentLog.appendChild(row);
    });
}

// Function to check who has not paid for the current month and display alert
function checkPayments() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    
    let residentsPaid = payments.filter(payment => payment.month === currentMonth && payment.year == currentYear);

    const paymentAlert = document.getElementById('payment-alert');
    if (residentsPaid.length > 0) {
        paymentAlert.innerHTML = `<p>All residents have paid for <strong>${currentMonth} ${currentYear}</strong>.</p>`;
    } else {
        paymentAlert.innerHTML = `<p>Reminder: Payments for <strong>${currentMonth} ${currentYear}</strong> are due! Please make your payment.</p>`;
    }
}

// Initial call to check payments on page load
checkPayments();

// Array to hold resident data
let residents = [];

// Handle resident registration
document.querySelector('#resident-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#resident-name').value;
    const apartmentNumber = document.querySelector('#apartment-number').value;

    // Add resident to the list
    residents.push({ name, apartmentNumber });

    // Update the resident list
    updateResidentList();

    // Clear the form
    document.querySelector('#resident-name').value = '';
    document.querySelector('#apartment-number').value = '';
});

// Function to update the resident list
function updateResidentList() {
    const residentList = document.querySelector('#resident-list tbody');
    residentList.innerHTML = ''; // Clear existing list

    // Display all registered residents
    residents.forEach(resident => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${resident.name}</td>
            <td>${resident.apartmentNumber}</td>
        `;
        residentList.appendChild(row);
    });
}

// Building updates
document.querySelector('#update-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const updateText = document.querySelector('#update').value;
    const latestUpdateSection = document.querySelector('#latest-update');
    latestUpdateSection.innerText = updateText;

    // Clear the form after posting
    document.querySelector('#update').value = '';
});

// Sample users for authentication
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'resident1', password: 'pass123', role: 'resident' }
];

// Handle login
document.querySelector('#login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // Check if the user exists and credentials match
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Hide login form and show admin content based on role
        document.querySelector('#login-section').style.display = 'none';
        
        if (user.role === 'admin') {
            document.querySelector('#admin-content').style.display = 'block';
        } else {
            alert('You are logged in as a resident, limited access!');
        }
    } else {
        // Show error message for invalid credentials
        document.querySelector('#login-error').style.display = 'block';
    }
});

// Restrict posting updates based on role
function canPostUpdate(userRole) {
    if (userRole !== 'admin') {
        alert('You do not have permission to post updates.');
        return false;
    }
    return true;
}

document.querySelector('#update-form').addEventListener('submit', function(e) {
    const userRole = 'admin'; // This should come from your login system

    if (!canPostUpdate(userRole)) {
        e.preventDefault();
    }
});
