function toggleForm() {
    const signupForm = document.getElementById("signupContainer");
    const loginForm = document.getElementById("loginContainer");

    if (signupForm && loginForm) {
        signupForm.classList.toggle("active");
        loginForm.classList.toggle("active");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const urlInput = document.getElementById("url");
    const shortenedUrlDiv = document.getElementById("shortened-url");

    if (form && urlInput && shortenedUrlDiv) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const originalUrl = urlInput.value.trim();
            if (!originalUrl) {
                shortenedUrlDiv.innerHTML = "<p>Please enter a valid URL.</p>";
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:5000/shorten", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ originalUrl })
                });

                const data = await response.json();

                if (data.shortUrl) {
                    shortenedUrlDiv.innerHTML = `
                        <p>Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>
                    `;
                } else {
                    shortenedUrlDiv.innerHTML = "<p>Error shortening URL.</p>";
                }
            } catch (error) {
                shortenedUrlDiv.innerHTML = "<p>Server error. Try again later.</p>";
                console.error("Error:", error);
            }
        });
    }
});
