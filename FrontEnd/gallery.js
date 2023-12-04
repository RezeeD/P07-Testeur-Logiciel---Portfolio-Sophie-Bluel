// Récupération des données dans l'API
const reponseImg = await fetch("http://localhost:5678/api/works");
const portfolio = await reponseImg.json();

// Création des cartes du portfolio

function createPortfolio(fiches) {

    for (let i = 0; i < fiches.length; i++) {
// Récupération de l'élément du DOM qui accueillera les fiches
        const sectionPortfolio = document.querySelector(".gallery");
// Création d’une balise dédiée à une fiche du portfolio
        const fichesPortfolio = document.createElement("figure");
//Création des balises
        const imgElement = document.createElement("img");
        imgElement.src = fiches[i].imageUrl;
        const descriptionElement = document.createElement("figcaption");
        descriptionElement.innerText = `${fiches[0].title}`;

        sectionPortfolio.appendChild(fichesPortfolio);
        fichesPortfolio.appendChild(imgElement);
        fichesPortfolio.appendChild(descriptionElement);
    }

}

// Première génération du portfolio

createPortfolio(portfolio)


// Fonction pour créer des boutons
function createBtn(name, attribut, tagElement) {
    const btn = document.createElement("button")
    btn.innerText = name
    btn.classList.add("btn");
    btn.classList.add(attribut);
    tagElement.appendChild(btn);
}


// Création des boutons de filtres
const filtrePortfolio = document.querySelector("#filtre-portfolio");

createBtn("Tous", "btn-all", filtrePortfolio)
createBtn("Objets", "btn-objects", filtrePortfolio)
createBtn("Appartements", "btn-appart", filtrePortfolio)
createBtn("Hôtels & restaurants", "btn-hotel", filtrePortfolio)

// Creation des filtres

// Bouton Tous

const btnAll = document.querySelector(".btn-all");

btnAll.addEventListener("click", () => {

    document.querySelector(".gallery").innerHTML = "";

    createPortfolio(portfolio);

    console.log(portfolio)
})

// Bouton Objets

const btnObjets = document.querySelector(".btn-objects")

btnObjets.addEventListener("click", () => {

    const objetsFiltre = portfolio.filter(function (objet) {

        return objet.categoryId === 1;

    });

    createPortfolio(objetsFiltre);

})


// Bouton Appartements


const btnAppart = document.querySelector(".btn-appart");


btnAppart.addEventListener("click", () => {

    const appartFiltre = portfolio.filter(function (appart) {

        return appart.categoryId === 2;

    });

    document.querySelector(".gallery").innerHTML = "";
    createPortfolio(appartFiltre);

})

// Bouton Hôtels et restaurant

const btnHotel = document.querySelector(".btn-hotel");


btnHotel.addEventListener("click", () => {

    const hotelFiltre = portfolio.filter(function (hotel) {

        return hotel.categoryId === 3;

    });
    document.querySelector(".gallery").innerHTML = "";
    createPortfolio(hotelFiltre);

})

// Interface admin







