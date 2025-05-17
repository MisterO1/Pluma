// redirection if not logged on
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "./login.html";
}
const baseUrl = "http://localhost:5000"

// GET THE PROJECT
const projectId = localStorage.getItem("projectId")
if (!projectId) {   console.log("!!! projectId not present in localStorage !!!")  }
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
const project = await response.json();

// WRITE THE PROJECT TITLE
document.getElementById("project-title").textContent = `Projet : ${project.title}`

// DISPLAY CHARACTERS FROM THAT PROJECTS
function displayCharacters(characters) {
    const characterList = document.getElementById("character-list");
    characterList.innerHTML = '';
    // console.log("displaying character")
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
        </div>
        `;

        characterList.appendChild(card);
    });
}
if (project.characters.length) { 
    displayCharacters(project.characters)
}

// CREATE A CHARACTER
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
        displayCharacters(project.characters); // Mets à jour l’affichage
        

        characterForm.reset();
        modal.classList.remove("open");
        modalOverlay.classList.remove("active");

    } catch (err) {
        console.error(err);
    }
});



// DISPLAY MODALS
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
//
