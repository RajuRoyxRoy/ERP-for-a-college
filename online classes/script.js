document.getElementById('classForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('classDate').value;
    const video = document.getElementById('classVideo').value;
    const teacher = document.getElementById('teacherName').value;
    const studentSelects = document.querySelectorAll('#studentSelects select');
    const students = Array.from(studentSelects).map(select => select.value);

    const table = document.getElementById('recordsTable');
    const row = table.insertRow();

    row.insertCell(0).textContent = date;
    row.insertCell(1).innerHTML = `<a href="${video}" target="_blank">Watch Video</a>`;
    row.insertCell(2).textContent = teacher;
    row.insertCell(3).textContent = students.join(', ');
    row.insertCell(4).innerHTML = '<button onclick="deleteRecord(this)">Delete</button>';

    document.getElementById('classForm').reset();
    clearStudentSelects();
});

function addTeacher() {
    const teacherName = prompt("Enter teacher's name:");
    if (teacherName) {
        const teacherSelect = document.getElementById('teacherName');
        const option = document.createElement('option');
        option.value = teacherName;
        option.textContent = teacherName;
        teacherSelect.appendChild(option);
    }
}

function addStudentSelect() {
    const studentRow = document.createElement('div');
    studentRow.className = 'student-row';
    studentRow.innerHTML = `
        <select name="students" required>
            <!-- Student options will be populated here -->
        </select>
        <button type="button" onclick="removeStudentSelect(this)">Remove</button>
    `;
    document.getElementById('studentSelects').appendChild(studentRow);
    populateStudentOptions();
}

function removeStudentSelect(button) {
    button.parentElement.remove();
}

function deleteRecord(button) {
    button.parentElement.parentElement.remove();
}

function populateStudentOptions() {
    const studentSelects = document.querySelectorAll('#studentSelects select');
    const students = ['Student A', 'Student B', 'Student C']; // Replace with your student data source

    studentSelects.forEach(select => {
        select.innerHTML = '';
        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student;
            option.textContent = student;
            select.appendChild(option);
        });
    });
}

function clearStudentSelects() {
    document.getElementById('studentSelects').innerHTML = `
        <div class="student-row">
            <select name="students" required>
                <!-- Student options will be populated here -->
            </select>
            <button type="button" onclick="addStudentSelect()">Add Student</button>
        </div>
    `;
    populateStudentOptions();
}

// Initial population of student options
populateStudentOptions();
