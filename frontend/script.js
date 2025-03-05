function toggleForm() {
    const signupForm = document.getElementById("signupContainer");
    const loginForm = document.getElementById("loginContainer");

    signupForm.classList.toggle("active");
    loginForm.classList.toggle("active");
}

