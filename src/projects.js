export default function createProject() {
    let projects = [];
    let idCounter = 1;

    class Project {
        constructor(title) {
            this.id = idCounter++;
            this.title = title;
        }
    }

    // ---------- Selectors ----------
    const projectsSection = document.querySelector('.projects');
    const addProjectBtn = document.getElementById('add-project-btn');

    // ---------- Project Form ----------
    function displayProjectForm() {

        addProjectBtn.addEventListener('click', () => {
            // Check if form already exists
            if (projectsSection.querySelector('.form-container')) return;
            
            const projectForm = document.createElement('div');
            projectForm.classList.add('form-container');
            projectForm.innerHTML = `
                <div class='form-input'>
                    <input type='text' id='project-title' placeholder='Project Title...'></input>
                    <button type="submit" class="save-btn">Save</button>
                </div>
                <button type="button" class="cancel-btn">Cancel</button>
            `
            // Project Form Buttons & Input
            const saveProject = projectForm.querySelector('.save-btn');
            const cancelProject = projectForm.querySelector('.cancel-btn');
            const titleInput = projectForm.querySelector('#project-title');

            saveProject.addEventListener('click', () => {
                const title = titleInput.value.trim();
                if (!title) return;

                const newProject = new Project(title);
                projects.push(newProject);
                projectForm.remove();
                renderProject();
            });
            cancelProject.addEventListener('click', () => {
                projectForm.remove();
            });

            projectsSection.append(projectForm);
        });
    }

    // ---------- Render Project Card ----------
    function renderProject() {
        const existingCards = projectsSection.querySelectorAll('.project-container');
        existingCards.forEach(card => card.remove());

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-container');
            projectCard.innerHTML = `
                <div class='title-section'>
                    <h2>${project.title}</h2>
                    <button class="delete-btn" data-id="${project.id}">Delete Project</button>
                </div>
                <label for="add-task">
                    <input type='text' placeholder='Add Task' id='add-task-${project.id}' class='add-task-input'>
                    <button class='add-task-btn' data-project-id='${project.id}'>+</button>
                </label>
                <div class='tasks-list'></div>
            `;
            const deleteProjectBtn = projectCard.querySelector('.delete-btn');
            deleteProjectBtn.addEventListener('click', () => {
                projects = projects.filter(p => p.id !== project.id);
                renderProject();
            });



            projectsSection.append(projectCard);
        });
    }
   
    displayProjectForm();
    renderProject();
}