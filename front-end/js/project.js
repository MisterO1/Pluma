// redirection if not logged on
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "./login.html";
}
const baseUrl = "http://localhost:5000"

// GET THE PROJECT
const projectId = localStorage.getItem("projectId")
if (!projectId) {   console.log("!!! projectId not present in localStorage !!!")  }
async function lastProjectState() {
    try {
        const response = await fetch(
            `${baseUrl}/api/projects/${projectId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (!response.ok) throw new Error("Erreur lors de la recuperation du projet");
        return response.json()
    } catch (err) {
        response.status(400).json({ message: err.message });
        return
    }
}

let project = await lastProjectState();// use "let" because project will be updated after each user's modification
// console.log(project)
let characters = project.characters

// WRITE THE PROJECT TITLE
document.getElementById("project-title").textContent = `Projet : ${project.title}`

// DISPLAY CHARACTERS FROM THAT PROJECTS
function displayCharacters(characters) {
    const characterList = document.getElementById("character-list");
    characterList.innerHTML = '';

    characters.forEach(char => {
        const card = document.createElement("div");
        card.className = "character-card";

        const imageSrc = char.imageUrl || "./assets/images/default.avif"; // image par défaut

        card.innerHTML = `
        <img src="${imageSrc}" alt="Photo de ${char.name}">
        <div class="character-info">
            <h3>${char.name}</h3>
            <p><strong>Âge :</strong> ${char.age || "non défini"}</p>
            <p><strong>Rôle :</strong> ${char.role || "Non défini"}</p>
            <p><strong>Biography :</strong> ${char.biography || "non défini"}</p>
            <button class="edit-btn" data-id=${char._id}>✏️ Modifier</button>
            <button class="delete-btn" data-id=${char._id}>🗑 Supprimer</button>
        </div>
        `;

        characterList.appendChild(card);
        card.querySelector(".edit-btn").addEventListener("click", () => openEditCharacterModal(char));
        card.querySelector(".delete-btn").addEventListener("click", () => deleteCharacter(char))
    });
}
if (project.characters.length) { 
    displayCharacters(project.characters)
}else {
    document.getElementById("character-list").textContent = "Aucun personnage pour l'instant !"
}

// -------------    CREATE A CHARACTER  --------------------- //

// DISPLAY MODALS TO CREATE A CHARACTER
const openModalBtn = document.getElementById("openCharacterModal");
const closeModalBtn = document.getElementById("closeCharacterModal");
const modal = document.getElementById("characterModal");
const modalOverlay = document.getElementById("characterModalOverlay");

openModalBtn.addEventListener("click", () => {
    modal.classList.add("open");
    modalOverlay.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    modalOverlay.classList.remove("active");
});

// SUBMIT
const characterForm = document.getElementById("characterForm");
characterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(characterForm);
    const data = {
        name: formData.get("name"),
        age: formData.get("age"),
        role: formData.get("role"),
        biography: formData.get("biography"),
        imageUrl: formData.get("imageUrl"), // to change after
        project: projectId,
    };

    try {
        const response = await fetch(`${baseUrl}/api/characters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Erreur lors de la création du personnage");

        // const newChar = await response.json();
        project = await lastProjectState() // update locally project with the updatedCharacter
        characters = project.characters
        displayCharacters(characters); // Mets à jour l’affichage

        characterForm.reset();
        modal.classList.remove("open");
        modalOverlay.classList.remove("active");

    } catch (err) {
        console.error(err);
    }
});


// -------------    EDIT A CHARACTER  --------------------- //

// DISPLAY MODALS TO EDIT A CHARACTER
const editCharacterModal = document.getElementById("editCharacterModal");
const editCharacterModalOverlay = document.getElementById("editCharacterModalOverlay");
const editCharacterForm = document.getElementById("editCharacterForm");
const closeEditCharacterModal = document.getElementById("closeEditCharacterModal");

// Fermer la modale
closeEditCharacterModal.addEventListener("click", () => {
    editCharacterModal.classList.remove("open");
    editCharacterModalOverlay.classList.remove("active");
});

// Préremplir et ouvrir la modale
function openEditCharacterModal(character) {
    editCharacterForm.name.value = character.name;
    editCharacterForm.age.value = character.age;
    editCharacterForm.role.value = character.role;
    editCharacterForm.biography.value = character.biography;
    editCharacterForm.imageUrl.value = character.imageUrl;
    editCharacterForm.id.value = character._id;

    editCharacterModal.classList.add("open");
    editCharacterModalOverlay.classList.add("active");
}

// SUBMIT
editCharacterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = editCharacterForm.id.value;
    const updatedData = {
        name: editCharacterForm.name.value,
        age: editCharacterForm.age.value,
        role: editCharacterForm.role.value,
        biography: editCharacterForm.biography.value,
        imageUrl: editCharacterForm.imageUrl.value,
    };

    try {
        const response = await fetch(`${baseUrl}/api/characters/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) throw new Error("Erreur lors de la modification");

        const updatedCharacter = await response.json();
        project = await lastProjectState() // update locally project with the updatedCharacter
        characters = project.characters
        // update characters
        // characters = characters.map((char) =>
        //     char._id === updatedCharacter._id ? updatedCharacter : char
        // );

        displayCharacters(characters); // Réaffiche les cards avec les données à jour

        editCharacterModal.classList.remove("open");
        editCharacterModalOverlay.classList.remove("active");

    } catch (err) {
        console.error(err);
    }
});


// -------------    DELETE A CHARACTER  --------------------- //

async function deleteCharacter(char) {
    if (confirm(`Etes vous sûr de supprimer le personnage "${char.name}" ?`)) {
        try {
            const response = await fetch(`${baseUrl}/api/characters/${char._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (!response.ok) throw new Error("Erreur lors de la suppression");

            project = await lastProjectState()
            characters = project.characters
            displayCharacters(characters);
        } catch (err) {
            console.error("Erreur suppression :", err.message);
        }
    }
}

