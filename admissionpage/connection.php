<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admission_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$fullName = $_POST['fullName'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];
$nationality = $_POST['nationality'];
$address = $_POST['address'];
$contactNumber = $_POST['contactNumber'];
$email = $_POST['email'];

// Handle file upload
$photo = $_FILES['photo']['name'];
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["photo"]["name"]);

if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
    // File uploaded successfully
} else {
    echo "Sorry, there was an error uploading your file.";
}

$previousInstitutions = $_POST['previousInstitutions'];
$grades = $_POST['grades'];
$course = $_POST['course'];
$campus = $_POST['campus'];
$modeOfStudy = $_POST['modeOfStudy'];
$entryTerm = $_POST['entryTerm'];
$parentNames = $_POST['parentNames'];
$parentContact = $_POST['parentContact'];
$parentOccupation = $_POST['parentOccupation'];
$signature = $_POST['signature'];
$submissionDate = $_POST['submissionDate'];

// Insert data into database
$sql = "INSERT INTO admission (full_name, dob, gender, nationality, address, contact_number, email, photo, previous_institutions, grades, course, campus, mode_of_study, entry_term, parent_names, parent_contact, parent_occupation, signature, submission_date) VALUES ('$fullName', '$dob', '$gender', '$nationality', '$address', '$contactNumber', '$email', '$photo', '$previousInstitutions', '$grades', '$course', '$campus', '$modeOfStudy', '$entryTerm', '$parentNames', '$parentContact', '$parentOccupation', '$signature', '$submissionDate')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
