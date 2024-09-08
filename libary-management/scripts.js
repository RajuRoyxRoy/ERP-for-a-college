document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    loadStudents();
});

function showAddBookForm() {
    document.getElementById('addBookForm').style.display = 'block';
}

function hideAddBookForm() {
    document.getElementById('addBookForm').style.display = 'none';
    clearBookForm();
}

function clearBookForm() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookISBN').value = '';
}

function saveBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const isbn = document.getElementById('bookISBN').value;

    if (title && author && isbn) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push({ title, author, isbn });
        localStorage.setItem('books', JSON.stringify(books));
        loadBooks();
        hideAddBookForm();
    }
}

function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const bookTableBody = document.getElementById('bookTableBody');
    bookTableBody.innerHTML = '';

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="actions">
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        bookTableBody.appendChild(row);
    });
}

function editBook(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books[index];
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookISBN').value = book.isbn;
    deleteBook(index);
    showAddBookForm();
}

function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    loadBooks();
}

function showAddStudentForm() {
    document.getElementById('addStudentForm').style.display = 'block';
}

function hideAddStudentForm() {
    document.getElementById('addStudentForm').style.display = 'none';
    clearStudentForm();
}

function clearStudentForm() {
    document.getElementById('studentName').value = '';
    document.getElementById('studentRoll').value = '';
    document.getElementById('studentDept').value = '';
    document.getElementById('bookTaken').value = '';
    document.getElementById('dateTaken').value = '';
    document.getElementById('returnDate').value = '';
}

function saveStudent() {
    const name = document.getElementById('studentName').value;
    const roll = document.getElementById('studentRoll').value;
    const dept = document.getElementById('studentDept').value;
    const bookTaken = document.getElementById('bookTaken').value;
    const dateTaken = document.getElementById('dateTaken').value;
    const returnDate = document.getElementById('returnDate').value;

    if (name && roll && dept && bookTaken && dateTaken && returnDate) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name, roll, dept, bookTaken, dateTaken, returnDate });
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
        hideAddStudentForm();
    }
}

function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.dept}</td>
            <td>${student.bookTaken}</td>
            <td>${student.dateTaken}</td>
            <td>${student.returnDate}</td>
            <td class="actions">
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentRoll').value = student.roll;
    document.getElementById('studentDept').value = student.dept;
    document.getElementById('bookTaken').value = student.bookTaken;
    document.getElementById('dateTaken').value = student.dateTaken;
    document.getElementById('returnDate').value = student.returnDate;
    deleteStudent(index);
    showAddStudentForm();
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}
