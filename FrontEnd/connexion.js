const btnConnexion = document.getElementById("login-validation");


async function verifLogin(reponse) {

    const errorLogin = document.getElementById("error-login");

    if (reponse.ok !== false) {


        window.location.href = "index.html"
    } else {
        errorLogin.innerText = `Erreur dans l’identifiant ou le mot de passe`
    }
}


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

    let reponse1 = await response.json()

    console.log(reponse1.token)
})

btnConnexion.addEventListener("submit", (event) => {


})