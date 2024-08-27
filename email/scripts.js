document.addEventListener('DOMContentLoaded', () => {
    loadEmails();
});

function loadEmails() {
    const parentsTable = document.getElementById('parentsTable');
    const teachersTable = document.getElementById('teachersTable');
    const studentsTable = document.getElementById('studentsTable');

    parentsTable.innerHTML = '';
    teachersTable.innerHTML = '';
    studentsTable.innerHTML = '';

    const emails = JSON.parse(localStorage.getItem('emails')) || [];

    emails.forEach((email, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-index', index);
        row.innerHTML = `
            <td><input type="checkbox" class="emailCheckbox"></td>
            <td>${email.name}</td>
            <td>${email.email}</td>
        `;

        if (email.role === 'Parent') {
            parentsTable.appendChild(row);
        } else if (email.role === 'Teacher') {
            teachersTable.appendChild(row);
        } else if (email.role === 'Student') {
            studentsTable.appendChild(row);
        }
    });
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.getElementById('addEmailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addEmail();
    closeModal('addModal');
});

document.getElementById('editEmailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateEmail();
    closeModal('editModal');
});

function addEmail() {
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;

    const emails = JSON.parse(localStorage.getItem('emails')) || [];
    emails.push({ name, role, email });

    localStorage.setItem('emails', JSON.stringify(emails));
    loadEmails();
}

function editEmail() {
    const checkboxes = document.querySelectorAll('.emailCheckbox:checked');
    if (checkboxes.length !== 1) {
        alert('Please select exactly one email to edit.');
        return;
    }

    const row = checkboxes[0].closest('tr');
    const index = row.getAttribute('data-index');

    const emails = JSON.parse(localStorage.getItem('emails'));

    document.getElementById('editName').value = emails[index].name;
    document.getElementById('editRole').value = emails[index].role;
    document.getElementById('editEmail').value = emails[index].email;

    document.getElementById('editEmailForm').setAttribute('data-index', index);
    openModal('editModal');
}

function updateEmail() {
    const index = document.getElementById('editEmailForm').getAttribute('data-index');
    const emails = JSON.parse(localStorage.getItem('emails'));

    emails[index].name = document.getElementById('editName').value;
    emails[index].role = document.getElementById('editRole').value;
    emails[index].email = document.getElementById('editEmail').value;

    localStorage.setItem('emails', JSON.stringify(emails));
    loadEmails();
}

function deleteEmail() {
    const checkboxes = document.querySelectorAll('.emailCheckbox:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one email to delete.');
        return;
    }

    const emails = JSON.parse(localStorage.getItem('emails'));
    const remainingEmails = emails.filter((email, index) => {
        return !checkboxes[index].checked;
    });

    localStorage.setItem('emails', JSON.stringify(remainingEmails));
    loadEmails();
}

function prepareEmail() {
    const subject = document.getElementById('emailSubject').value;
    const body = document.getElementById('emailBody').value;
    const checkboxes = document.querySelectorAll('.emailCheckbox:checked');

    if (checkboxes.length === 0) {
        alert('Please select at least one recipient.');
        return;
    }

    const emails = JSON.parse(localStorage.getItem('emails'));
    const selectedEmails = [];

    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const index = row.getAttribute('data-index');
        selectedEmails.push(emails[index].email);
    });

    // Construct the mailto link
    const mailtoLink = `mailto:${selectedEmails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the default email client
    window.location.href = mailtoLink;
}

function saveEmails() {
    const emails = JSON.parse(localStorage.getItem('emails')) || [];
    localStorage.setItem('emails', JSON.stringify(emails));
    alert('Emails saved successfully!');
}
