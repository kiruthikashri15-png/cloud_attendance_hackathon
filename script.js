const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!role || !email || !password) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    message.textContent =
        "Login page ready! Firebase authentication will be connected next.";
});