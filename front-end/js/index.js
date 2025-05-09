document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("project-form");
    const modal = document.getElementById("project-modal");
    const modalOverlay = document.querySelector(".modal-overlay");
    const projectsContainer = document.getElementById("projects-container");
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.querySelector(".close-modal");

    // === Ouvrir la modale ===
    openModalBtn.addEventListener("click", () => {
        modal.classList.add("open");
        modalOverlay.classList.add("active");
    });

    // === Fermer la modale ===
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("open");
        modalOverlay.classList.remove("active");
    });

    // === Soumission du formulaire ===
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = form.title.value.trim();
        const description = form.description.value.trim();
        if (!title || !description) return;

        try {
        const response = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        });

        if (!response.ok) throw new Error("Erreur lors de la création du projet");
        const newProject = await response.json();

        displayProject(newProject, true); // Ajoute avec animation

        form.reset(); // Réinitialiser le formulaire
        form.onsubmit = null;
        modal.classList.remove("open");
        modalOverlay.classList.remove("active");

        } catch (error) {
        console.error(error);
        }
    });

    // === Charger tous les projets au démarrage ===
    async function fetchProjects() {
        try {
        const response = await fetch("/api/projects");
        const projects = await response.json();
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
        editBtn.addEventListener("click", () => openEditModal(project));
        deleteBtn.addEventListener("click", () => deleteProject(project._id, card));

    }

    fetchProjects(); // Initialiser le chargement

    function openEditModal(project) {
        form.title.value = project.title;
        form.description.value = project.description;

        modal.classList.add("open");
        modalOverlay.classList.add("active");

        form.onsubmit = async (e) => {
            e.preventDefault();
            const updatedTitle = form.title.value.trim();
            const updatedDesc = form.description.value.trim();

            try {
            const res = await fetch(`/api/projects/${project._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: updatedTitle, description: updatedDesc }),
            });
            if (!res.ok) throw new Error("Erreur modification");

            modal.classList.remove("open");
            modalOverlay.classList.remove("active");
            location.reload(); // Pour simplifier. Optionnel : mettre à jour sans reload
            } catch (err) {
            console.error(err);
            }
        };
    }

    async function deleteProject(id, cardElement) {
        const confirmDelete = confirm("Supprimer ce projet ?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erreur suppression");

            cardElement.remove(); // Retire du DOM
        } catch (err) {
            console.error(err);
        }
    }
});
