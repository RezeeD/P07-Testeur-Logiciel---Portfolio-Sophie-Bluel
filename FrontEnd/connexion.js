const btnConnexion = document.getElementById("login-validation");

btnConnexion.addEventListener("click", async (event) => {
    event.preventDefault();
    let email = document.getElementById("email-info").value;
    let password = document.getElementById("password-info").value;

    let response = await fetch('http://localhost:5678/api/users/login', {

        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"

        },
        body: JSON.stringify({email: email, password: password})
    })

    const errorLogin = document.getElementById("error-login");
    let reponseLogin = await response.json()
    let token = reponseLogin.token

    console.log(token)

    if (response.ok !== false) {

        localStorage.setItem("token", token);

        window.location.href = "index.html";

    } else {
        errorLogin.innerText = `Erreur dans l’identifiant ou le mot de passe`
    }


})
