document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.querySelector(".sparkle-button");

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();  // Prevent the default form submission

        // Get the values of the username and password inputs
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        // Define the correct credentials
        const correctUsername = "admin";  // Replace with the correct username
        const correctPassword = "1234";  // Replace with the correct password

        // Check if the entered credentials are correct
        if (username === correctUsername && password === correctPassword) {
            // Redirect to index.html in the same folder
            window.location.href = './dashboard.html';
        } else {
            alert("Incorrect username or password.");  // Show an error message if incorrect
        }
    });
});
