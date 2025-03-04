function toggleForm() {
    const signupForm = document.getElementById("signupContainer");
    const loginForm = document.getElementById("loginContainer");

    signupForm.classList.toggle("active");
    loginForm.classList.toggle("active");
}

const buttons = document.querySelectorAll(".submitButton");

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        window.location.href="index.html";
    })
});
