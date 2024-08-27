// Client-side validation example (basic example)
document.getElementById('studentForm').addEventListener('submit', function(event) {
    var fullname = document.getElementById('fullname').value;
    var dob = document.getElementById('dob').value;
    var address = document.getElementById('address').value;
    var course = document.getElementById('course').value;
    var admissionYear = document.getElementById('admission_year').value;
    var photo = document.getElementById('photo').value;
    var paymentStatus = document.getElementById('payment_status').checked;

    if (!fullname || !dob || !address || !course || !admissionYear || !photo) {
        alert('Please fill in all required fields.');
        event.preventDefault();
    }
});
