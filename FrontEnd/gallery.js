// Récupération des données dans l'API
const reponseImg = await fetch("http://localhost:5678/api/works");
const portfolio = await reponseImg.json();

// Création des cartes du portfolio

function createPortfolio(balise, fiches) {

    for (let i = 0; i < fiches.length; i++) {
// Récupération de l'élément du DOM qui accueillera les fiches
        const sectionPortfolio = document.querySelector(balise);
// Création d’une balise dédiée à une fiche du portfolio
        const fichesPortfolio = document.createElement("figure");
//Création des balises
        const imgElement = document.createElement("img");
        imgElement.src = fiches[i].imageUrl;
        const descriptionElement = document.createElement("figcaption");
        descriptionElement.innerText = `${fiches[i].title}`;

        sectionPortfolio.appendChild(fichesPortfolio);
        fichesPortfolio.appendChild(imgElement);
        fichesPortfolio.appendChild(descriptionElement);
    }

}


// Première génération du portfolio

createPortfolio(".gallery", portfolio)


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

    createPortfolio(".gallery", portfolio);


})

// Bouton Objets

const btnObjets = document.querySelector(".btn-objects")

btnObjets.addEventListener("click", () => {

    const objetsFiltre = portfolio.filter(function (objet) {

        return objet.categoryId === 1;

    });
    document.querySelector(".gallery").innerHTML = "";
    createPortfolio(".gallery", objetsFiltre);


})


// Bouton Appartements


const btnAppart = document.querySelector(".btn-appart");


btnAppart.addEventListener("click", () => {

    const appartFiltre = portfolio.filter(function (appart) {

        return appart.categoryId === 2;

    });

    document.querySelector(".gallery").innerHTML = "";
    createPortfolio(".gallery", appartFiltre);

})

// Bouton Hôtels et restaurant

const btnHotel = document.querySelector(".btn-hotel");


btnHotel.addEventListener("click", () => {

    const hotelFiltre = portfolio.filter(function (hotel) {

        return hotel.categoryId === 3;

    });
    document.querySelector(".gallery").innerHTML = "";
    createPortfolio(".gallery", hotelFiltre);

})

// Interface admin


//Connexion et Ajout d'élément

let token = localStorage.getItem("token")

if (token !== null) {

    const logout = document.querySelector("#login a");
    const editionMode = document.querySelector(".edition-mode-btn")

    //Changement du bouton Login en Logout
    logout.innerText = `logout`;
    logout.style.fontWeight = "normal";

    //Création du bandeau noir en haut de la page
    logout.classList.add("selected-items");

    document.querySelector("body").style = "padding-top : 40px";

    //Affichage de tous les boutons du mode Edition
    document.querySelectorAll(".js-edition-mode").forEach(a => {
        a.style.display = null;
        // Masquer le menu de filtre
        document.querySelector("#filtre-portfolio").style.display = "none"

    })
}

function createPortfolioModal(balise, fiches) {

    for (let i = 0; i < fiches.length; i++) {
// Récupération de l'élément du DOM qui accueillera les fiches
        const sectionPortfolio = document.querySelector(balise);
// Création d’une balise dédiée à une fiche du portfolio
        const fichesPortfolio = document.createElement("figure");
//Création des balises
        const imgElement = document.createElement("img");
        imgElement.src = fiches[i].imageUrl;

        sectionPortfolio.appendChild(fichesPortfolio);
        fichesPortfolio.appendChild(imgElement);
    }

}


const removeModal = function (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}




const openModal = function () {


    const sectionPortfolio = document.getElementById("portfolio")


//Création du conteneur de la modale

    let modalContainer = document.querySelector("aside");
    modalContainer.style.display = null
    modalContainer.setAttribute("id", "modal1");
    modalContainer.classList.add("modal");

    //Création de l'enveloppe de la modale
    const modalWrapper = document.createElement("div")
    modalWrapper.classList.add("modal-wrapper")

// Création de l'icône pour fermer la modale
    const closeModalBtn = document.createElement("div")
    closeModalBtn.classList.add("close-modal")
    closeModalBtn.classList.add("js-modal-close")
    const fontAwesomeIcon = document.createElement("i")
    fontAwesomeIcon.classList.add("fa-solid")
    fontAwesomeIcon.classList.add("fa-xmark");

//Création du titre de la modale

    const titleModal = document.createElement("h2");
    titleModal.innerText = "Galerie photo"

//Création du conteneur du portfolio

    const modalPhotoContainer = document.createElement("div")
    modalPhotoContainer.classList.add("modal-photo-container")

//Création de la barre horizontale

    const lineStyle = document.createElement("div")
    lineStyle.classList.add("line-style")

//Création du bouton d'ajout de la photo

    const addPhoto = document.createElement("div")
    addPhoto.classList.add("send-btn")
    const addPhotoBtn = document.createElement("input")
    addPhotoBtn.classList.add("add-photo-btn")
    addPhotoBtn.setAttribute("type", "submit")
    addPhotoBtn.setAttribute("value", "Ajouter une photo")


// Ajout des éléments dans le HTML
    sectionPortfolio.appendChild(modalContainer)
    modalContainer.appendChild(modalWrapper)
    modalWrapper.appendChild(closeModalBtn)
    modalWrapper.appendChild(titleModal)
    modalWrapper.appendChild(modalPhotoContainer)
    modalWrapper.appendChild(lineStyle)
    modalWrapper.appendChild(addPhoto)
    closeModalBtn.appendChild(fontAwesomeIcon)
    addPhoto.appendChild(addPhotoBtn)

//Récupération des données API 
    createPortfolioModal(".modal-photo-container", portfolio)

// Ajout des éléments dans le HTML


    document.querySelectorAll(".modal-photo-container figure").forEach(figureElement => {
        const trash = document.createElement("div")
        trash.classList.add("bckg-trash")
        const trashIcon = document.createElement("i")
        trashIcon.classList.add("fa-solid")
        trashIcon.classList.add("fa-trash-can")
        trashIcon.style.color = "#FFFEF8"
        figureElement.appendChild(trash)
        figureElement.appendChild(trashIcon)

    })
// Bouton Ajouter une photo

    let sendBtn = document.querySelector(".send-btn");

    sendBtn.addEventListener("click", () => {

        addPhotoModal()

    })

    //Fermeture de la fenêtre modale
    
    const closeBtn = document.querySelector(".fa-xmark")
    closeBtn.addEventListener("click", () =>{
    const asideElt = document.querySelector("aside")
    asideElt.classList.remove("modal")
    removeModal(asideElt)
    
    } )

    

}


const modalBtn = document.querySelector("#edition-modal-button a");
modalBtn.addEventListener("click", (event) => {
    event.preventDefault()
    openModal()
})


    //Retour à la modale précédente

    const goBack = function (){

        const goBackBtn = document.querySelector(".fa-arrow-left")
        goBackBtn.addEventListener("click", () =>{
        const asideElt = document.querySelector("aside")
        removeModal(asideElt)
        openModal()
    })}



const addPhotoModal = function () {


    //suppression du portfolio de la modale

    const modalPortfolio = document.querySelector(".modal-photo-container")
    removeModal(modalPortfolio)


    //Modification de la classe et ajout du bouton de retour arrière

    const modalCloseClass = document.querySelector(".js-modal-close")
    modalCloseClass.classList.add("window-control-modal")
    modalCloseClass.classList.remove("close-modal")
    document.querySelector(".fa-xmark").classList.add("fa-arrow-left")
    document.querySelector(".fa-arrow-left").classList.remove("fa-xmark")
    const previousWindowBtn = document.createElement("i")
    previousWindowBtn.classList.add("fa-solid")
    previousWindowBtn.classList.add("fa-xmark")

    //Changement du titre de la  fenêtre
    document.querySelector(".modal-wrapper h2").innerText = ""
    document.querySelector(".modal-wrapper h2").innerText = "Ajout Photo"

    //Création du formulaire pour ajouter une photo

    document.querySelector(".modal-photo-container").classList.add("modal-add-photo-container")
    document.querySelector(".modal-add-photo-container").classList.remove("modal-photo-container")

    //Fonction ajout photo

    const addFormPhoto = document.createElement("form")
    addFormPhoto.setAttribute("method", "post")
    const imgUpload = document.createElement("div")
    imgUpload.classList.add("image-upload")
    const imgUploadIcon = document.createElement("img")
    imgUploadIcon.src = "./assets/icons/upload-icon.svg"
    imgUploadIcon.classList.add("upload-icon")
    const addPhotoLabel = document.createElement("label")
    addPhotoLabel.setAttribute("for", "image-upload")
    addPhotoLabel.innerText = "+ Ajouter photo"
    const uploadInfo = document.createElement("p")
    uploadInfo.classList.add("upload-info")
    uploadInfo.innerText = " jpg, png : 4mo max"
    const inputUpload = document.createElement("input")
    inputUpload.setAttribute("id", "image-upload")
    inputUpload.setAttribute("name", "image-upload")
    inputUpload.setAttribute("type", "file")
    inputUpload.setAttribute("accept", "image/jpeg, image/jpg, image/png")
    inputUpload.setAttribute("size", "4194304")
    inputUpload.setAttribute("required", "")

    //Champ Titre

    const titleLabel = document.createElement("label")
    titleLabel.classList.add("upload-label")
    titleLabel.setAttribute("for", "title-img")
    titleLabel.innerText = "Titre"
    const titleField = document.createElement("input")
    titleField.setAttribute("id", "title-img")
    titleField.setAttribute("type", "text")
    titleField.setAttribute("name", "title")
    // Catégorie: Liste Déroulante

    const categoryLabel = document.createElement("label")
    categoryLabel.classList.add("upload-label")
    categoryLabel.setAttribute("for", "category")
    categoryLabel.innerText = "Catégorie"
    const dropDownMenu = document.createElement("select")
    dropDownMenu.setAttribute("name", "categories")
    dropDownMenu.setAttribute("id", "category")
    const optionMenu0 = document.createElement("option")
    optionMenu0.setAttribute("value", "")
    const optionMenu1 = document.createElement("option")
    optionMenu1.setAttribute("value", "1")
    optionMenu1.innerText = "Objets"
    const optionMenu2 = document.createElement("option")
    optionMenu2.setAttribute("value", "2")
    optionMenu2.innerText = "Appartements"
    const optionMenu3 = document.createElement("option")
    optionMenu3.setAttribute("value", "3")
    optionMenu3.innerText = "Hôtels & restaurants"

    //Modification bouton

    document.querySelector(".send-btn").classList.add("modal-color-btn")
    document.querySelector(".send-btn").classList.remove("add-photo-btn")
    document.querySelector(".modal-color-btn input").setAttribute("value", "Valider")
    document.querySelector(".modal-color-btn input").setAttribute("disabled", "disabled")

    // Ajout au code HTML

    document.querySelector(".modal-add-photo-container").appendChild(addFormPhoto)
    document.querySelector(".window-control-modal").appendChild(previousWindowBtn)
    addFormPhoto.appendChild(imgUpload)
    imgUpload.appendChild(imgUploadIcon)
    imgUpload.appendChild(addPhotoLabel)
    imgUpload.appendChild(uploadInfo)
    imgUpload.appendChild(inputUpload)
    addFormPhoto.appendChild(titleLabel)
    addFormPhoto.appendChild(titleField)
    addFormPhoto.appendChild(categoryLabel)
    addFormPhoto.appendChild(dropDownMenu)
    dropDownMenu.appendChild(optionMenu0)
    dropDownMenu.appendChild(optionMenu1)
    dropDownMenu.appendChild(optionMenu2)
    dropDownMenu.appendChild(optionMenu3)

    //Fermeture de la fenêtre modale
    
const closeBtn = document.querySelector(".fa-xmark")
closeBtn.addEventListener("click", () =>{
const asideElt = document.querySelector("aside")
asideElt.classList.remove("modal")
removeModal(asideElt)

} )

    //Retour à la modale précédente

    goBack()
 
// afficher les données de l'api
 console.log(portfolio[2])

}

window.addEventListener("click", (event)=>{
    const asideElt = document.querySelector("aside")
    if(event.target === asideElt){
     asideElt.classList.remove("modal")
    removeModal(asideElt)
    }


})

openModal()

console.log(portfolio);

const trashDelTest = document.querySelectorAll(".fa-trash-can")

let testSup = document.querySelector(".modal-photo-container")
const galleryTest =document.querySelector(".gallery")

trashDelTest.forEach(trashDelTest =>{

    trashDelTest.addEventListener("click", async function(event) {
        
        let  positionTrash = event.target
        


        let response = await fetch(`http://localhost:5678/api/works/${idFiches}`, {
      
        method: "DELETE",
        headers: {
            
          accept :" */*",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjYzMTM4NSwiZXhwIjoxNzAyNzE3Nzg1fQ.mazngghS8eD57eiNAP6YWIDGZOmI6u4J7gx37xhiDCQ"
      
        }
      
        
      })
      
      if (response.ok !== false) {
      
          console.log("image supprimée")
       const figureElt  = document.querySelector(".modal-photo-container figure")
       const figureEltGallery  = document.querySelector(".gallery figure")
      testSup.removeChild(figureElt)
      galleryTest.removeChild(figureEltGallery)
          console.log(figureElt)
          console.log(portfolio);
      
      
       } else {
           console.log("erreur dans la suppression")
       }
      
      
      })


})
  


