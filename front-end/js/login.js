const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
    const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
        document.getElementById("login-message").textContent = data.message || "Erreur de connexion";
    } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username)
        window.location.href = "dashboard.html";
    }
    } catch (err) {
    console.error(err);
    document.getElementById("login-message").textContent = "Erreur serveur";
    }
});

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    try {
    const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
        document.getElementById("signup-message").textContent = data.message || "Erreur à l'inscription";
    } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username)
        window.location.href = "dashboard.html";
    }
    } catch (err) {
    console.error(err);
    document.getElementById("signup-message").textContent = "Erreur serveur";
    }
});