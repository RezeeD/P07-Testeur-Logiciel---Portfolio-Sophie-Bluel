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
    fichesPortfolio.setAttribute("id", `${i}`);
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

createPortfolio(".gallery", portfolio);

// Fonction pour créer des boutons
function createBtn(name, attribut, tagElement) {
  const btn = document.createElement("button");
  btn.innerText = name;
  btn.classList.add("btn");
  btn.classList.add(attribut);
  tagElement.appendChild(btn);
}

// Création des boutons de filtres
const filtrePortfolio = document.querySelector("#filtre-portfolio");

createBtn("Tous", "btn-all", filtrePortfolio);
createBtn("Objets", "btn-objects", filtrePortfolio);
createBtn("Appartements", "btn-appart", filtrePortfolio);
createBtn("Hôtels & restaurants", "btn-hotel", filtrePortfolio);

// Creation des filtres

// Bouton Tous

const btnAll = document.querySelector(".btn-all");

btnAll.addEventListener("click", () => {
  document.querySelector(".gallery").innerHTML = "";

  createPortfolio(".gallery", portfolio);
});

// Bouton Objets

const btnObjets = document.querySelector(".btn-objects");

btnObjets.addEventListener("click", () => {
  const objetsFiltre = portfolio.filter(function (objet) {
    return objet.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  createPortfolio(".gallery", objetsFiltre);
});

// Bouton Appartements

const btnAppart = document.querySelector(".btn-appart");

btnAppart.addEventListener("click", () => {
  const appartFiltre = portfolio.filter(function (appart) {
    return appart.categoryId === 2;
  });

  document.querySelector(".gallery").innerHTML = "";
  createPortfolio(".gallery", appartFiltre);
});

// Bouton Hôtels et restaurant

const btnHotel = document.querySelector(".btn-hotel");

btnHotel.addEventListener("click", () => {
  const hotelFiltre = portfolio.filter(function (hotel) {
    return hotel.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  createPortfolio(".gallery", hotelFiltre);
});

// Interface admin

//Connexion et Ajout d'élément

let token = localStorage.getItem("token");

if (token !== null) {
  const logout = document.querySelector("#login a");

  //Changement du bouton Login en Logout
  logout.innerText = `logout`;
  logout.style.fontWeight = "normal";

  //Création du bandeau noir en haut de la page
  logout.classList.add("selected-items");

  document.querySelector("body").style = "padding-top : 40px";

  //Affichage de tous les boutons du mode Edition
  document.querySelectorAll(".js-edition-mode").forEach((a) => {
    a.style.display = null;
    // Masquer le menu de filtre
    document.querySelector("#filtre-portfolio").style.display = "none";
  });
}

function createPortfolioModal(balise, fiches) {
  for (let i = 0; i < fiches.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionPortfolio = document.querySelector(balise);
    // Création d’une balise dédiée à une fiche du portfolio
    const fichesPortfolio = document.createElement("figure");
    //Création des balises
    const imgElement = document.createElement("img");
    imgElement.classList.add("image-container");
    imgElement.src = fiches[i].imageUrl;
    sectionPortfolio.appendChild(fichesPortfolio);
    fichesPortfolio.appendChild(imgElement);
  }
}

const removeModal = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const deleteFiles = async function (event) {
  const trashIcon = document.querySelectorAll(".fa-trash-can");
  const containerFichesModal = document.querySelector(".modal-photo-container");
  const galleryPortfolio = document.querySelector(".gallery");
  const imgGallery = document.querySelectorAll(".gallery figure");
  const imgFichesModal = document.querySelectorAll(
    ".modal-photo-container figure"
  );

  const TOKEN = localStorage.token;

  for (let i = 0; i < portfolio.length; i++) {
    trashIcon[i].addEventListener("click", async (event) => {
      event.preventDefault();

      const PORTFOLIO_ID = portfolio[i].id;
      let deleteResponse = await fetch(
        `http://localhost:5678/api/works/${PORTFOLIO_ID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (deleteResponse.ok === true) {
        console.log(`Le statut de la requête est ${deleteResponse.ok}`);
        containerFichesModal.removeChild(imgFichesModal[i]);
        galleryPortfolio.removeChild(imgGallery[i]);
      } else {
        alert("Erreur: Image non supprimée");
      }
    });
  }
};

const openModal = function () {
  const sectionPortfolio = document.getElementById("portfolio");

  //Création du conteneur de la modale

  let modalContainer = document.querySelector("aside");
  modalContainer.style.display = null;
  modalContainer.setAttribute("id", "modal1");
  modalContainer.classList.add("modal");

  //Création de l'enveloppe de la modale
  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal-wrapper");

  // Création de l'icône pour fermer la modale
  const closeModalBtn = document.createElement("div");
  closeModalBtn.classList.add("close-modal");
  closeModalBtn.classList.add("js-modal-close");
  const fontAwesomeIcon = document.createElement("i");
  fontAwesomeIcon.classList.add("fa-solid");
  fontAwesomeIcon.classList.add("fa-xmark");

  //Création du titre de la modale

  const titleModal = document.createElement("h2");
  titleModal.innerText = "Galerie photo";

  //Création du conteneur du portfolio

  const modalPhotoContainer = document.createElement("div");
  modalPhotoContainer.classList.add("modal-photo-container");

  //Création de la barre horizontale

  const lineStyle = document.createElement("div");
  lineStyle.classList.add("line-style");

  //Création du bouton d'ajout de la photo

  const addPhoto = document.createElement("div");
  addPhoto.classList.add("send-btn");
  const addPhotoBtn = document.createElement("input");
  addPhotoBtn.classList.add("add-photo-btn");
  addPhotoBtn.setAttribute("type", "submit");
  addPhotoBtn.setAttribute("value", "Ajouter une photo");

  // Ajout des éléments dans le HTML
  sectionPortfolio.appendChild(modalContainer);
  modalContainer.appendChild(modalWrapper);
  modalWrapper.appendChild(closeModalBtn);
  modalWrapper.appendChild(titleModal);
  modalWrapper.appendChild(modalPhotoContainer);
  modalWrapper.appendChild(lineStyle);
  modalWrapper.appendChild(addPhoto);
  closeModalBtn.appendChild(fontAwesomeIcon);
  addPhoto.appendChild(addPhotoBtn);

  //Récupération des données API
  createPortfolioModal(".modal-photo-container", portfolio);

  // Ajout des éléments dans le HTML

  document
    .querySelectorAll(".modal-photo-container figure")
    .forEach((figureElement) => {
      const trash = document.createElement("div");
      trash.classList.add("bckg-trash");
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid");
      trashIcon.classList.add("fa-trash-can");
      trashIcon.style.color = "#FFFEF8";
      figureElement.appendChild(trash);
      figureElement.appendChild(trashIcon);
    });

  // Supresssion Image

  deleteFiles();

  // Bouton Ajouter une photo

  let sendBtn = document.querySelector(".send-btn");

  sendBtn.addEventListener("click", addPhotoModal);

  //Fermeture de la fenêtre modale

  const closeBtn = document.querySelector(".fa-xmark");
  closeBtn.addEventListener("click", () => {
    const asideElt = document.querySelector("aside");
    asideElt.classList.remove("modal");
    removeModal(asideElt);
  });
};

const modalBtn = document.querySelector("#edition-modal-button a");
modalBtn.addEventListener("click", (event) => {
  event.preventDefault();
  openModal();
});

//Retour à la modale précédente

const goBack = function () {
  const goBackBtn = document.querySelector(".fa-arrow-left");
  goBackBtn.addEventListener("click", () => {
    const asideElt = document.querySelector("aside");
    removeModal(asideElt);
    openModal();
  });
};

const addPhotoModal = function () {
  // Suppression du portfolio de la modale
  const modalPortfolio = document.querySelector(".modal-photo-container");
  removeModal(modalPortfolio);

  // Modification de la classe et ajout du bouton de retour arrière
  const modalCloseClass = document.querySelector(".js-modal-close");
  modalCloseClass.classList.add("window-control-modal");
  modalCloseClass.classList.remove("close-modal");
  document.querySelector(".fa-xmark").classList.add("fa-arrow-left");
  document.querySelector(".fa-arrow-left").classList.remove("fa-xmark");
  const previousWindowBtn = document.createElement("i");
  previousWindowBtn.classList.add("fa-solid");
  previousWindowBtn.classList.add("fa-xmark");

  // Changement du titre de la fenêtre
  document.querySelector(".modal-wrapper h2").innerText = "";
  document.querySelector(".modal-wrapper h2").innerText = "Ajout Photo";

  // Création du formulaire pour ajouter une photo
  document
    .querySelector(".modal-photo-container")
    .classList.add("modal-add-photo-container");
  document
    .querySelector(".modal-add-photo-container")
    .classList.remove("modal-photo-container");

  // Fonction ajout photo
  const addFormPhoto = document.createElement("form");
  addFormPhoto.setAttribute("method", "post");
  const imgUpload = document.createElement("div");
  imgUpload.classList.add("image-upload");
  const imgUploadIcon = document.createElement("img");
  imgUploadIcon.src = "./assets/icons/upload-icon.svg";
  imgUploadIcon.classList.add("upload-icon");
  imgUploadIcon.classList.add("image-container");
  const addPhotoLabel = document.createElement("label");
  addPhotoLabel.setAttribute("for", "image-upload");
  addPhotoLabel.innerText = "+ Ajouter photo";
  const uploadInfo = document.createElement("p");
  uploadInfo.classList.add("upload-info");
  uploadInfo.innerText = " jpg, png : 4mo max";
  const inputUpload = document.createElement("input");
  inputUpload.setAttribute("id", "image-upload");
  inputUpload.setAttribute("name", "image");
  inputUpload.setAttribute("type", "file");
  inputUpload.setAttribute("accept", "image/jpeg, image/jpg, image/png");
  inputUpload.setAttribute("size", "4194304");
  inputUpload.setAttribute("required", "");

  // Champ Titre
  const titleLabel = document.createElement("label");
  titleLabel.classList.add("upload-label");
  titleLabel.setAttribute("for", "title-img");
  titleLabel.innerText = "Titre";
  const titleField = document.createElement("input");
  titleField.setAttribute("id", "title-img");
  titleField.setAttribute("type", "text");
  titleField.setAttribute("name", "title");

  // Catégorie : Liste Déroulante
  const categoryLabel = document.createElement("label");
  categoryLabel.classList.add("upload-label");
  categoryLabel.setAttribute("for", "category");
  categoryLabel.innerText = "Catégorie";
  const dropDownMenu = document.createElement("select");
  dropDownMenu.setAttribute("name", "category");
  dropDownMenu.setAttribute("id", "category");
  const optionMenu0 = document.createElement("option");
  optionMenu0.setAttribute("value", "");
  const optionMenu1 = document.createElement("option");
  optionMenu1.setAttribute("value", "1");
  optionMenu1.innerText = "Objets";
  const optionMenu2 = document.createElement("option");
  optionMenu2.setAttribute("value", "2");
  optionMenu2.innerText = "Appartements";
  const optionMenu3 = document.createElement("option");
  optionMenu3.setAttribute("value", "3");
  optionMenu3.innerText = "Hôtels & restaurants";

  // Changement de classe pour la ligne de style du formulaire
  document.querySelector(".line-style").classList.add("line-style-form-modal");
  document
    .querySelector(".line-style-form-modal")
    .classList.remove("line-style");

  // Modification bouton
  document.querySelector(".send-btn").classList.add("submit-btn");
  document.querySelector(".submit-btn").classList.remove("send-btn");
  document.querySelector(".submit-btn input").classList.remove("add-photo-btn");
  document.querySelector(".submit-btn input").setAttribute("value", "Valider");

  // Ajout au code HTML
  document
    .querySelector(".modal-add-photo-container")
    .appendChild(addFormPhoto);
  document
    .querySelector(".window-control-modal")
    .appendChild(previousWindowBtn);
  addFormPhoto.appendChild(imgUpload);
  imgUpload.appendChild(imgUploadIcon);
  imgUpload.appendChild(addPhotoLabel);
  imgUpload.appendChild(uploadInfo);
  imgUpload.appendChild(inputUpload);
  addFormPhoto.appendChild(titleLabel);
  addFormPhoto.appendChild(titleField);
  addFormPhoto.appendChild(categoryLabel);
  addFormPhoto.appendChild(dropDownMenu);
  addFormPhoto.appendChild(document.querySelector(".line-style-form-modal"));
  addFormPhoto.appendChild(document.querySelector(".submit-btn"));
  dropDownMenu.appendChild(optionMenu0);
  dropDownMenu.appendChild(optionMenu1);
  dropDownMenu.appendChild(optionMenu2);
  dropDownMenu.appendChild(optionMenu3);

  // supprimer le listener

  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.removeEventListener("click", removeModal);
  submitBtn.removeEventListener("click", addPhotoModal);

  // Preview de la photo uploadée
  const imgPreview = document.querySelector("#image-upload");
  imgPreview.addEventListener("change", previewFile);

  // Ajout photo

  const form = document.querySelector(".modal-add-photo-container form");

  // Ajout d'un écouteur d'événement pour le formulaire
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Création d'un objet FormData
    const formData = new FormData(form);
    const TOKEN = localStorage.token;

    const formObject = Object.fromEntries(formData);

    function updateMainGallery(json) {
      // Récupération de l'élément du DOM qui accueillera les fiches
      const sectionPortfolio = document.querySelector(".gallery");
      // Création d’une balise dédiée à une fiche du portfolio
      const fichesPortfolio = document.createElement("figure");
      fichesPortfolio.setAttribute("id", `${json.id}`);
      //Création des balises
      const imgElement = document.createElement("img");
      imgElement.src = json.imageUrl;
      const descriptionElement = document.createElement("figcaption");
      descriptionElement.innerText = `${json.title}`;

      sectionPortfolio.appendChild(fichesPortfolio);
      fichesPortfolio.appendChild(imgElement);
      fichesPortfolio.appendChild(descriptionElement);
    }

    // Envoi des données via la méthode fetch
    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    })
      .then((response) => {
        // Gérer la réponse du serveur
        if (!response.ok) {
          throw new Error(`Echec de la requête. Statut: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        // Gérer la réponse du serveur
        console.log("Réponse du serveur", data);
        const dataUpload = JSON.parse(data);
        updateMainGallery(dataUpload);
        alert("Image ajouté avec succès");
      })

      .catch((error) => {
        // Gérer les erreurs lors de la requête
        console.error("Erreur lors de la requête", error);
      });
  });

  // Fermeture de la fenêtre modale
  const closeBtn = document.querySelector(".fa-xmark");
  closeBtn.addEventListener("click", () => {
    const asideElt = document.querySelector("aside");
    asideElt.classList.remove("modal");
    removeModal(asideElt);
  });

  window.addEventListener("click", (event) => {
    const asideElt = document.querySelector("aside");
    if (event.target === asideElt) {
      asideElt.classList.remove("modal");
      removeModal(asideElt);
    }
  });

  function previewFile() {
    const file = this.files[0];
    const file_reader = new FileReader();
    file_reader.readAsDataURL(file);
    file_reader.addEventListener("load", () => displayImage());
  }

  function displayImage() {
    const image = document.querySelector(".image-upload img");
    image.src = event.target.result;
    image.classList.remove("upload-icon");
    image.classList.add("preview-img");

    const imageUploadPreview = document.querySelector(".image-upload");
    const imgInfo = document.querySelector(".image-upload p");
    const imgLabel = document.querySelector(".image-upload label");
    const imageContainer = document.querySelector(".image-container");
    imageContainer.classList.remove("image-container");

    imageUploadPreview.removeChild(imgInfo);
    imageUploadPreview.removeChild(imgLabel);
  }
};
