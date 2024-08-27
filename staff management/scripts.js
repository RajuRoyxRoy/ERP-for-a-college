const staffMembers = [
    {
        fullName: 'John Doe',
        position: 'Math Teacher',
        department: 'Mathematics',
        dob: '1980-05-14',
        gender: 'Male',
        email: 'johndoe@example.com',
        contactNumber: '123-456-7890',
        permanentAddress: '123 Main St, Hometown, USA',
        currentAddress: '456 Elm St, Cityville, USA',
        emergencyName: 'Jane Doe',
        emergencyRelationship: 'Spouse',
        emergencyContact: '987-654-3210',
        joiningDate: '2010-09-01',
        employeeId: 'T001',
        qualification: 'M.Sc Mathematics',
        experience: '12 years',
        skills: 'Algebra, Calculus, Geometry'
    },
    // Add more staff members as needed
];

document.addEventListener('DOMContentLoaded', () => {
    const staffTableBody = document.getElementById('staffTableBody');
    const staffDetails = document.getElementById('staffDetails');
    const staffForm = document.getElementById('staffForm');
    const saveButton = document.getElementById('saveButton');
    const editButton = document.getElementById('editButton');
    const addStaffButton = document.getElementById('addStaffButton');
    let editIndex = null;

    function populateStaffList() {
        staffTableBody.innerHTML = '';
        staffMembers.forEach((staff, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${staff.fullName}</td>
                <td>${staff.position}</td>
                <td>${staff.department}</td>
                <td>${staff.email}</td>
                <td>${staff.contactNumber}</td>
            `;
            row.addEventListener('click', () => showStaffDetails(index));
            staffTableBody.appendChild(row);
        });
    }

    function showStaffDetails(index) {
        const staff = staffMembers[index];
        staffForm.fullName.value = staff.fullName;
        staffForm.position.value = staff.position;
        staffForm.department.value = staff.department;
        staffForm.dob.value = staff.dob;
        staffForm.gender.value = staff.gender;
        staffForm.email.value = staff.email;
        staffForm.contactNumber.value = staff.contactNumber;
        staffForm.permanentAddress.value = staff.permanentAddress;
        staffForm.currentAddress.value = staff.currentAddress;
        staffForm.emergencyName.value = staff.emergencyName;
        staffForm.emergencyRelationship.value = staff.emergencyRelationship;
        staffForm.emergencyContact.value = staff.emergencyContact;
        staffForm.joiningDate.value = staff.joiningDate;
        staffForm.employeeId.value = staff.employeeId;
        staffForm.qualification.value = staff.qualification;
        staffForm.experience.value = staff.experience;
        staffForm.skills.value = staff.skills;
        editIndex = index;
        saveButton.style.display = 'none';
        editButton.style.display = 'inline-block';
    }

    function clearForm() {
        staffForm.reset();
        editIndex = null;
        saveButton.style.display = 'inline-block';
        editButton.style.display = 'none';
    }

    function saveStaffDetails(event) {
        event.preventDefault();
        const newStaff = {
            fullName: staffForm.fullName.value,
            position: staffForm.position.value,
            department: staffForm.department.value,
            dob: staffForm.dob.value,
            gender: staffForm.gender.value,
            email: staffForm.email.value,
            contactNumber: staffForm.contactNumber.value,
            permanentAddress: staffForm.permanentAddress.value,
            currentAddress: staffForm.currentAddress.value,
            emergencyName: staffForm.emergencyName.value,
            emergencyRelationship: staffForm.emergencyRelationship.value,
            emergencyContact: staffForm.emergencyContact.value,
            joiningDate: staffForm.joiningDate.value,
            employeeId: staffForm.employeeId.value,
            qualification: staffForm.qualification.value,
            experience: staffForm.experience.value,
            skills: staffForm.skills.value,
        };
        if (editIndex === null) {
            staffMembers.push(newStaff);
        } else {
            staffMembers[editIndex] = newStaff;
        }
        populateStaffList();
        clearForm();
    }

    saveButton.addEventListener('click', saveStaffDetails);
    editButton.addEventListener('click', saveStaffDetails);
    addStaffButton.addEventListener('click', clearForm);

    populateStaffList();
});
