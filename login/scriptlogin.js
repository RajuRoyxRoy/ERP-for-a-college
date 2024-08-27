document.addEventListener("DOMContentLoaded", () => {
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const loginForm = document.getElementById("loginForm");

    // Auto-fill the username and password if they exist in localStorage
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
        usernameField.value = localStorage.getItem("username");
        passwordField.value = localStorage.getItem("password");
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = usernameField.value;
        const password = passwordField.value;

        // Basic username and password validation
        if (username === "admin" && password === "1234") {
            // Save username and password to localStorage
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            window.location.href = "./index.html";
        } else {
            window.location.href = "error.html";
        }
    });
});
