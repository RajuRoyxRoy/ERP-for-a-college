<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $fullName = $data['fullName'];
    $position = $data['position'];
    $department = $data['department'];
    $dob = $data['dob'];
    $gender = $data['gender'];
    $email = $data['email'];
    $contactNumber = $data['contactNumber'];
    $permanentAddress = $data['permanentAddress'];
    $currentAddress = $data['currentAddress'];
    $emergencyName = $data['emergencyName'];
    $emergencyRelationship = $data['emergencyRelationship'];
    $emergencyContact = $data['emergencyContact'];
    $joiningDate = $data['joiningDate'];
    $employeeId = $data['employeeId'];
    $qualification = $data['qualification'];
    $experience = $data['experience'];
    $skills = $data['skills'];

    $sql = "INSERT INTO staff (fullName, position, department, dob, gender, email, contactNumber, permanentAddress, currentAddress, emergencyName, emergencyRelationship, emergencyContact, joiningDate, employeeId, qualification, experience, skills)
            VALUES ('$fullName', '$position', '$department', '$dob', '$gender', '$email', '$contactNumber', '$permanentAddress', '$currentAddress', '$emergencyName', '$emergencyRelationship', '$emergencyContact', '$joiningDate', '$employeeId', '$qualification', '$experience', '$skills')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "New record created successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
    }
} elseif ($method == 'GET') {
    $sql = "SELECT * FROM staff";
    $result = $conn->query($sql);

    $staff = [];
    while ($row = $result->fetch_assoc()) {
        $staff[] = $row;
    }
    echo json_encode($staff);
}

$conn->close();
?>
