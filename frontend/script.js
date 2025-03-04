function toggleForm() {
    const signupForm = document.getElementById("signupContainer");
    const loginForm = document.getElementById("loginContainer");

    signupForm.classList.toggle("active");
    loginForm.classList.toggle("active");
}

const title = document.getElementById("title");
function shrinkTitleOnLoad() {
    setTimeout(() => {
        title.classList.add("shrink");
    }, 500); 
}

window.onload = shrinkTitleOnLoad;

title.addEventListener("mouseenter", () => {
    title.classList.add("shrink");
});

title.addEventListener("mouseleave", () => {
    title.classList.remove("shrink");
});