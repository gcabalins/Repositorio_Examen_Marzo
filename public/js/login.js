function mostrarFormularioLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

function mostrarFormularioRegistro() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function showLogin(){
    document.getElementById("loginForm").style.display="block";
    document.getElementById("registerForm").style.display="none";
}

function showRegister(){
    document.getElementById("loginForm").style.display="none";
    document.getElementById("registerForm").style.display="block";
}
const formularioLogin = document.getElementById("loginForm");
const formularioRegistro = document.getElementById("registerForm");

formularioLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const respuesta = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const datos = await respuesta.json();

    if (datos.token) {
        localStorage.setItem("token", datos.token);
        window.location = "/dashboard";
    } else {
        alert("Login incorrecto");
    }
});

formularioRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    });

    alert("Usuario creado, ahora puedes hacer login");
    mostrarFormularioLogin();
});
