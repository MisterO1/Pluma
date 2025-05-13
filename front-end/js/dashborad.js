const baseUrl = "http://localhost:5000"

document.addEventListener("DOMContentLoaded", () => {

    // redirection if not logged on
    const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "./login.html";
        }
    
    // greet the user
    username = localStorage.getItem("username")
    if (username) {
        document.querySelector(".greeting").textContent = `Bienvenue ${username}`
    }
        
    const createForm = document.getElementById("create-form");
    const editForm = document.getElementById("edit-form");
    const modal = document.getElementById("project-modal");
    const modalOverlay = document.querySelector(".modal-overlay");
    const projectsContainer = document.getElementById("projects-container");
    const createProjectBtn = document.getElementById("createProjectBtn");
    const closeModalBtn = document.querySelector(".close-modal");

    // === Ouvrir la modale  ===
    createProjectBtn.addEventListener("click", () => {
        modal.classList.add("open");
        modalOverlay.classList.add("active");
        createForm.classList.add("active")
    });
    
    // === Fermer la modale ===
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("open");
        modalOverlay.classList.remove("active");
        createForm.classList.remove("active")
        editForm.classList.remove("active")
    });

    // === Soumission du formulaire CREATE PROJECT ===
    createForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = form.title.value.trim();
        const description = form.description.value.trim();
        if (!title || !description) return;

        try {
            const response = await fetch(baseUrl+"/api/projects", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) throw new Error("Erreur lors de la création du projet");
            const newProject = await response.json();
            // console.log(newProject)

            displayProject(newProject, true); // Ajoute avec animation

            e.target.reset(); // Réinitialiser le formulaire
            closeModalBtn.click() // close

        } catch (error) {
        console.error(error);
        }
    });

    // === Soumission du formulaire EDIT PROJECT ===
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = e.target.title.value.trim();
        const description = e.target.description.value.trim();
        const projectId = e.target.projectId.value

        try {
            const response = await fetch(baseUrl + `/api/projects/${projectId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
            });

            if (!response.ok) throw new Error("Échec de la mise à jour");

            const updatedProject = await response.json();
            // displayProject(updatedProject);
            loadProjects()
            e.target.reset();
            closeModalBtn.click() // close modal just after
        } catch (err) {
            console.error(err.message);
        }
    });

    // === Charger tous les projets au démarrage ===
    async function loadProjects() {
        try {
            const response = await fetch(baseUrl+"/api/projects");
            const projects = await response.json();
            document.getElementById("projects-container").innerHTML = ""
            projects.reverse().forEach(project => displayProject(project));
        } catch (error) {
            console.error("Erreur lors du chargement des projets :", error);
        }
    }

    // === Afficher un projet dans le DOM ===
    function displayProject(project, animate = false) {
        const card = document.createElement("div");
        card.className = "project-card" + (animate ? " animate-fade-in" : "");
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-actions">
                <button class="edit-btn" data-id="${project._id}">Modifier</button>
                <button class="delete-btn" data-id="${project._id}">Supprimer</button>
            </div>
            `;
        projectsContainer.prepend(card);

        const editBtn = card.querySelector(".edit-btn");
        const deleteBtn = card.querySelector(".delete-btn");
        editBtn.addEventListener("click", () => editProject(project));
        deleteBtn.addEventListener("click", () => deleteProject(project._id, card));

    }

    loadProjects(); // Initialiser le chargement

    function editProject(project) {
        editForm.title.value = project.title;
        editForm.description.value = project.description;
        editForm.projectId.value = project._id

        // open the edition form
        modal.classList.add("open");
        modalOverlay.classList.add("active");
        editForm.classList.add("active")
    };

    async function deleteProject(id, cardElement) {
        const confirmDelete = confirm("Supprimer ce projet ?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${baseUrl}/api/projects/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erreur suppression");

            cardElement.remove(); // delete from the DOM
        } catch (err) {
            console.error(err);
        }
    }

    document.getElementById("logout-btn").addEventListener("click", () => {
        const confirmLogout = confirm("Voulez-vous vraiment vous déconnecter ?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            window.location.href = "./login.html";
        }
    });
});
