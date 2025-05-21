// redirection if not logged on
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "./login.html";
}
const baseUrl = "http://localhost:5000"

document.getElementById("Back").addEventListener("click",()=>{
    localStorage.removeItem("projectId")
    window.location.href = "dashboard.html"
})

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
        console.error(err);
    }
}

let project = await lastProjectState();// use "let" because project will be updated after each user's modification
let characters = project.characters

// WRITE THE PROJECT TITLE
document.getElementById("project-title").textContent = `Projet : ${project.title}`

// ------------- ALL FORMS -------------
const createCharacterForm = document.getElementById("createCharacterForm");
const editCharacterForm = document.getElementById("editCharacterForm");
const createGroupForm = document.getElementById("createGroupForm");

// ------------- MODAL -------------
const modalOverlay = document.getElementById("modalOverlay");

function openForm(form) {
    modalOverlay.classList.add("active");
    form.classList.add("active");
}

function closeForm(form) {
    modalOverlay.classList.remove("active");
    form.classList.remove("active");
}

document.querySelectorAll(".modal-close-btn").forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e)=>{ 
        const form = e.target.parentElement
        closeForm(form)
    })
})

//// ------------------------------    CHARACTER  ----------------------------------- ////

// DISPLAY CHARACTERS FROM THAT PROJECTS
function displayCharacters(characters) {
    const characterList = document.getElementById("character-list");
    characterList.innerHTML = ''

    if (!characters.length) {
        characterList.innerText = "Aucun personnage pour l'instant !"
        return
    }

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
displayCharacters(characters)

// -------------    CREATE A CHARACTER  --------------------- //

document.getElementById("openCharacterForm").addEventListener("click",()=>{openForm(createCharacterForm)})
// SUBMIT
createCharacterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get("name"),
        type: formData.get("type"),
        age: formData.get("age"),
        sex: formData.get("sex"),
        role: formData.get("role"),
        biography: formData.get("biography"),
        imageUrl: formData.get("imageUrl"), // to change after
        project: projectId,
        // groups: 
    };

    try {
        const response = await fetch(`${baseUrl}/api/characters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        // Handle bad request with detailed message
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || errorData.message || "Une erreur est survenue");
        }
        const createdCharacter = await response.json();
        // console.log("Personnage créé avec succès :", createdCharacter)

        project = await lastProjectState() // update locally project with the updatedCharacter
        characters = project.characters
        displayCharacters(characters); // Mets à jour l’affichage

        e.target.reset();
        closeForm(e.target)

    } catch (err) {
        console.error("Erreur lors de la création du personnage :", err.message);
    }
});


// -------------    EDIT A CHARACTER  --------------------- //

// Préremplir et ouvrir la modale
function openEditCharacterModal(character) {
    const form = editCharacterForm;
    form.name.value = character.name;
    form.type.value = character.type;
    form.age.value = character.age;
    form.sex.value = character.sex;
    form.role.value = character.role;
    form.biography.value = character.biography;
    form.imageUrl.value = character.imageUrl;
    form.characterId.value = character._id;

    openForm(form)
}

// SUBMIT
editCharacterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const characterId = form.characterId.value;
    const updatedData = {
        name: form.name.value,
        type: form.type.value,
        age: form.age.value,
        sex: form.sex.value,
        role: form.role.value,
        biography: form.biography.value,
        imageUrl: form.imageUrl.value,
    };

    try {
        const response = await fetch(`${baseUrl}/api/characters/${characterId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) throw new Error("Erreur lors de la modification");

        project = await lastProjectState() // update locally project with the updatedCharacter
        characters = project.characters
        // const updatedCharacter = await response.json();
        // update characters
        // characters = characters.map((char) =>
        //     char._id === updatedCharacter._id ? updatedCharacter : char
        // );

        displayCharacters(characters); // Réaffiche les cards avec les données à jour

        closeForm(form)

    } catch (err) {
        console.error(err);
    }
});


// -------------    DELETE A CHARACTER  --------------------- //

async function deleteCharacter(char) {
    if (!confirm(`Etes vous sûr de supprimer le personnage "${char.name}" ?`)) {
        return
    }
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
        // console.log(characters)
        displayCharacters(characters);
    } catch (err) {
        console.error("Erreur suppression :", err.message);
    }
}


//// ------------------------------    GROUP  ----------------------------------- ////

// -------------    CREATE A GROUP  --------------------- //

const searchInput = document.getElementById("memberSearch");
const searchResults = document.getElementById("searchResults");
const memberList = document.getElementById("memberList");

let selectedCharactersId = []

searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";

    if (query.length < 2) return;

    const matchingCharacters = characters.filter(c =>
        c.name.toLowerCase().includes(query) &&
        !selectedCharactersId.includes(c._id)
    );

    matchingCharacters.forEach(char => {
        const li = document.createElement("li");
        li.textContent = char.name;

        li.addEventListener("click", () => {
            if (!selectedCharactersId.includes(char._id)) {
                selectedCharactersId.push(char._id);
                console.log("selectedCharactersId+",selectedCharactersId)
                const selectedLi = document.createElement("li");
                selectedLi.textContent = char.name;

                const removeBtn = document.createElement("button");
                removeBtn.textContent = "❌";
                removeBtn.addEventListener("click", () => {
                    selectedCharactersId = selectedCharactersId.filter(id => id !== char._id);
                    memberList.removeChild(selectedLi);
                    console.log("selectedCharactersId-",selectedCharactersId)
                });

                selectedLi.appendChild(removeBtn);
                memberList.appendChild(selectedLi);
            }
            searchInput.value = "";
            searchResults.innerHTML = "";
        });
        searchResults.appendChild(li);
    });
});

createGroupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const type = form.type.value;
    if (!name || !type || selectedCharactersId.length === 0) {
        alert("Nom, type, et au moins un membre sont requis.");
        return;
    }
    const data = {
        name: name,
        type: type,
        description: form.description.value.trim(),
        members: selectedCharactersId,
        project: projectId,
    };

    try {
        const response = await fetch(`${baseUrl}/api/groups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // Handle bad request with detailed message
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || errorData.message || "Une erreur est survenue");
        }

        const newGroup = await response.json();
        console.log("Group created:", newGroup);

        selectedCharactersId = [];
        memberList.innerHTML = "";
        closeForm(form);
    } catch (err) {
        console.error(err);
    }
})

// -------------    EDIT A GROUP  --------------------- //
document.getElementById("openGroupForm").addEventListener("click",()=>{openForm(createGroupForm)})

