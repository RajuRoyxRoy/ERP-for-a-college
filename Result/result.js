let students = [];
let currentEditIndex = -1;

// Function to add a student
function addStudent() {
    const studentClass = document.getElementById('studentClass').value;
    const rollNumber = parseInt(document.getElementById('rollNumber').value);
    const name = document.getElementById('studentName').value;
    const subjects = [];

    document.querySelectorAll('.subject').forEach(subject => {
        const subjectName = subject.querySelector('.subject-name').textContent.replace(':', '').trim();
        const subjectMarks = parseInt(subject.querySelector('.subject-marks').value);
        subjects.push({ name: subjectName, marks: subjectMarks });
    });

    const totalMarks = subjects.reduce((total, subject) => total + subject.marks, 0);
    const percentage = (totalMarks / (subjects.length * 100)) * 100;
    const status = percentage >= 40 ? 'pass' : 'fail';

    const student = {
        studentClass,
        rollNumber,
        name,
        subjects,
        totalMarks,
        percentage: percentage.toFixed(2),
        status
    };

    students.push(student);
    displayStudents();
    resetForm();
}

// Function to update student data
function updateStudent() {
    const studentClass = document.getElementById('studentClass').value;
    const rollNumber = parseInt(document.getElementById('rollNumber').value);
    const name = document.getElementById('studentName').value;
    const subjects = [];

    document.querySelectorAll('.subject').forEach(subject => {
        const subjectName = subject.querySelector('.subject-name').textContent.replace(':', '').trim();
        const subjectMarks = parseInt(subject.querySelector('.subject-marks').value);
        subjects.push({ name: subjectName, marks: subjectMarks });
    });

    const totalMarks = subjects.reduce((total, subject) => total + subject.marks, 0);
    const percentage = (totalMarks / (subjects.length * 100)) * 100;
    const status = percentage >= 40 ? 'pass' : 'fail';

    const updatedStudent = {
        studentClass,
        rollNumber,
        name,
        subjects,
        totalMarks,
        percentage: percentage.toFixed(2),
        status
    };

    students[currentEditIndex] = updatedStudent;
    displayStudents();
    resetForm();
    hideUpdateButton();
}

// Function to display students in the results section
function displayStudents() {
    const studentsList = document.getElementById('studentsList');
    studentsList.innerHTML = '';

    students.forEach((student, index) => {
        const studentDiv = document.createElement('div');
        studentDiv.className = `student-item ${student.status}`;
        
        let subjectsHTML = '';
        student.subjects.forEach(subject => {
            subjectsHTML += `<strong>${subject.name}:</strong> ${subject.marks}<br>`;
        });
        
        studentDiv.innerHTML = `
            <strong>Class:</strong> ${student.studentClass}<br>
            <strong>Roll Number:</strong> ${student.rollNumber}<br>
            <strong>Name:</strong> ${student.name}<br>
            ${subjectsHTML}
            <strong>Total Marks:</strong> ${student.totalMarks}<br>
            <strong>Percentage:</strong> ${student.percentage}%<br>
            <strong>Status:</strong> ${student.status.toUpperCase()}<br>
            <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
        `;

        studentsList.appendChild(studentDiv);
    });
}

// Function to edit a student
function editStudent(index) {
    currentEditIndex = index;
    const student = students[index];

    document.getElementById('studentClass').value = student.studentClass;
    document.getElementById('rollNumber').value = student.rollNumber;
    document.getElementById('studentName').value = student.name;

    clearSubjects();
    student.subjects.forEach(subject => {
        addSubjectInput(subject.name, subject.marks);
    });

    showUpdateButton();
}

// Function to delete a student
function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

// Function to clear all subjects
function clearAllSubjects() {
    const subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = '';
}

// Function to add a subject input dynamically
function addSubjectInput(subjectName = '', subjectMarks = '') {
    const subjectsContainer = document.getElementById('subjectsContainer');
    const selectedSubject = document.getElementById('subjectSelect').value;
    
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';

    const subjectLabel = document.createElement('label');
    subjectLabel.className = 'subject-name';
    subjectLabel.textContent = `${selectedSubject}:`;

    const subjectInput = document.createElement('input');
    subjectInput.className = 'subject-marks';
    subjectInput.type = 'number';
    subjectInput.value = subjectMarks;
    subjectInput.required = true;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'subject-delete-btn';
    deleteButton.onclick = function() {
        subjectsContainer.removeChild(subjectDiv);
    };

    subjectDiv.appendChild(subjectLabel);
    subjectDiv.appendChild(subjectInput);
    subjectDiv.appendChild(deleteButton);
    
    subjectsContainer.appendChild(subjectDiv);
}

// Function to reset the form
function resetForm() {
    document.getElementById('marksForm').reset();
}

// Function to show the update button
function showUpdateButton() {
    document.getElementById('updateButton').style.display = 'block';
}

// Function to hide the update button
function hideUpdateButton() {
    document.getElementById('updateButton').style.display = 'none';
}

// Function to save student marks data
function saveMarks() {
    localStorage.setItem('studentsData', JSON.stringify(students));
    alert('Student marks data saved successfully!');
}

// Function to download student marks data as a PDF
function downloadMarks() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('Student Marks Report', 14, 22);

    // Filter students based on pass/fail status
    const passedStudents = students.filter(student => student.status === 'pass');
    const failedStudents = students.filter(student => student.status === 'fail');

    // Add passed students section
    if (passedStudents.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(0, 128, 0); // Green color for passed students
        doc.text('Passed Students:', 14, 30);
        doc.setTextColor(0); // Reset color
        let startY = 35;
        passedStudents.forEach(student => {
            const text = `${student.name} (${student.studentClass}, Roll Number: ${student.rollNumber})`;
            doc.text(text, 14, startY);
            startY += 10;
        });
    }

    // Add failed students section
    if (failedStudents.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(255, 0, 0); // Red color for failed students
        doc.text('Failed Students:', 14, 100);
        doc.setTextColor(0); // Reset color
        let startY = 105;
        failedStudents.forEach(student => {
            const text = `${student.name} (${student.studentClass}, Roll Number: ${student.rollNumber})`;
            doc.text(text, 14, startY);
            startY += 10;
        });
    }

    // Save the PDF
    doc.save('student_marks_report.pdf');
}

// Function to update subjects dropdown based on selected class
function updateSubjects() {
    const selectedClass = document.getElementById('studentClass').value;
    const subjectSelect = document.getElementById('subjectSelect');

    // Clear existing options
    subjectSelect.innerHTML = '';

    // Add subjects based on selected class
    switch (selectedClass) {
        case 'Class 1':
        case 'Class 2':
        case 'Class 3':
            addSubjectOption('Maths');
            addSubjectOption('Science');
            addSubjectOption('English');
            addSubjectOption('Geography');
            addSubjectOption('Computer');
            addSubjectOption('History');
            addSubjectOption('Hindi');
            addSubjectOption('Physics');
            addSubjectOption('Chemistry');
            break;
        // Add more cases for other classes if needed
        default:
            break;
    }
}

// Helper function to add subject options dynamically
function addSubjectOption(subject) {
    const subjectSelect = document.getElementById('subjectSelect');
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
}

// Load student data from localStorage on page load
window.onload = function() {
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
        students = JSON.parse(storedData);
        displayStudents();
    }
};
