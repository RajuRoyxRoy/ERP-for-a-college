let users = [];
let students = [
  { id: 1, name: "Alice", rollNo: "10A01", class: "10" },
  { id: 2, name: "Bob", rollNo: "10A02", class: "10" },
  { id: 3, name: "Charlie", rollNo: "11A01", class: "11" },
  { id: 4, name: "David", rollNo: "12A01", class: "12" }
];
let attendanceRecords = [];

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
  if (tabId === 'attendanceReport') {
    populateStudentSelect();
  }
}

function showUserForm() {
  document.getElementById('userFormModal').style.display = 'block';
}

function closeUserForm() {
  document.getElementById('userFormModal').style.display = 'none';
}

function saveUser() {
  const user = {
    id: document.getElementById('userId').value || users.length + 1,
    name: document.getElementById('userName').value,
    email: document.getElementById('userEmail').value,
    gender: document.getElementById('userGender').value,
    mobile: document.getElementById('userMobile').value,
    role: document.getElementById('userRole').value,
    status: document.getElementById('userStatus').value,
  };

  if (user.id > users.length) {
    users.push(user);
  } else {
    users[user.id - 1] = user;
  }
  
  closeUserForm();
  renderUsers();
}

function renderUsers() {
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.gender}</td>
      <td>${user.mobile}</td>
      <td>${user.role}</td>
      <td>${user.status}</td>
      <td>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editUser(id) {
  const user = users.find(u => u.id == id);
  document.getElementById('userId').value = user.id;
  document.getElementById('userName').value = user.name;
  document.getElementById('userEmail').value = user.email;
  document.getElementById('userGender').value = user.gender;
  document.getElementById('userMobile').value = user.mobile;
  document.getElementById('userRole').value = user.role;
  document.getElementById('userStatus').value = user.status;
  showUserForm();
}

function deleteUser(id) {
  users = users.filter(u => u.id != id);
  renderUsers();
}

function showStudentForm() {
  document.getElementById('studentFormModal').style.display = 'block';
}

function closeStudentForm() {
  document.getElementById('studentFormModal').style.display = 'none';
}

function saveStudent() {
  const student = {
    id: document.getElementById('studentId').value || students.length + 1,
    name: document.getElementById('studentName').value,
    rollNo: `${document.getElementById('studentRollNo').value}${document.getElementById('studentSection').value}`,
    class: document.getElementById('studentClass').value,
    section: document.getElementById('studentSection').value,
  };

  if (student.id > students.length) {
    students.push(student);
  } else {
    students[student.id - 1] = student;
  }

  closeStudentForm();
  renderStudents();
}

function renderStudents() {
  const tbody = document.querySelector('#studentTable tbody');
  tbody.innerHTML = '';
  students.forEach(student => {
    const rollNoWithoutSection = student.rollNo.slice(0, -1); // remove the last character (section)
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${rollNoWithoutSection}</td>
      <td>${student.class}</td>
      <td>${student.section}</td>
      <td>
        <button onclick="editStudent(${student.id})">Edit</button>
        <button onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editStudent(id) {
  const student = students.find(s => s.id == id);
  document.getElementById('studentId').value = student.id;
  document.getElementById('studentName').value = student.name;
  document.getElementById('studentRollNo').value = student.rollNo;
  document.getElementById('studentClass').value = student.class;
  showStudentForm();
}

function deleteStudent(id) {
  students = students.filter(s => s.id != id);
  renderStudents();
}

function searchClass() {
  const classSelected = document.getElementById('classSelect').value;
  const sectionSelected = document.getElementById('classSection').value;
  const dateSelected = document.getElementById('attendanceDate').value;
  const attendanceForm = document.getElementById('attendanceForm');
  attendanceForm.innerHTML = '';

  students
    .filter(student => student.class === classSelected && student.rollNo.includes(sectionSelected))
    .forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.rollNo}</td>
        <td>${student.name}</td>
        <td>
          <input type="radio" name="attendance-${student.id}" value="Present" checked> Present
          <input type="radio" name="attendance-${student.id}" value="Absent"> Absent
          <input type="radio" name="attendance-${student.id}" value="Late"> Late
          <input type="radio" name="attendance-${student.id}" value="Half Day"> Half Day
        </td
      `;
      attendanceForm.appendChild(row);
    });
}

function saveAttendance() {
  const classSelected = document.getElementById('classSelect').value;
  const dateSelected = document.getElementById('attendanceDate').value;
  
  students
    .filter(student => student.class === classSelected)
    .forEach(student => {
      const attendanceStatus = document.querySelector(`input[name="attendance-${student.id}"]:checked`).value;
      attendanceRecords.push({
        studentId: student.id,
        date: dateSelected,
        status: attendanceStatus
      });
    });

  alert("Attendance saved successfully!");
}

function populateStudentSelect() {
  const studentSelect = document.getElementById('studentSelect');
  studentSelect.innerHTML = '';
  students.forEach(student => {
    const option = document.createElement('option');
    option.value = student.id;
    option.textContent = `${student.name} (${student.class})`;
    studentSelect.appendChild(option);
  });
}

function renderStudentAttendanceReport() {
  const studentId = document.getElementById('studentSelect').value;
  const studentAttendance = attendanceRecords.filter(record => record.studentId == studentId);

  const totalDays = studentAttendance.length;
  const presentDays = studentAttendance.filter(record => record.status === 'Present').length;
  const attendancePercentage = (presentDays / totalDays) * 100;

  const ctx = document.getElementById('attendanceChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Attendance'],
      datasets: [{
        label: 'Attendance Percentage',
        data: [attendancePercentage],
        backgroundColor: ['#007bff']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}
