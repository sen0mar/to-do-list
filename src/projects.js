export default function createProject(taskManager) {
    let projects = [];
    let idCounter = 1;

    class Project {
        constructor(title) {
            this.id = idCounter++;
            this.title = title;
        }
    }

    // Save & Load Projects
    function saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function loadProjects() {
        const saved = localStorage.getItem('projects');
        if (saved) {
            const parsed = JSON.parse(saved);
            projects = parsed.map(p => {
                const proj = new Project(p.title);
                proj.id = p.id;
                return proj;
            });
            if (projects.length > 0) {
                idCounter = Math.max(...projects.map(p => p.id)) + 1;
            }
            renderProject(); // Re-render with saved projects
        }
    }

    const projectsSection = document.querySelector('.projects');
    const addProjectBtn = document.getElementById('add-project-btn');

    function displayProjectForm() {
        addProjectBtn.addEventListener('click', () => {
            if (projectsSection.querySelector('.form-container')) return;

            const projectForm = document.createElement('div');
            projectForm.classList.add('form-container');
            projectForm.innerHTML = `
                <div class='form-input'>
                    <input type='text' id='project-title' placeholder='Project Title...'>
                    <button class="save-btn">Save</button>
                </div>
                <button class="cancel-btn">Cancel</button>
            `;

            const saveBtn = projectForm.querySelector('.save-btn');
            const cancelBtn = projectForm.querySelector('.cancel-btn');
            const input = projectForm.querySelector('#project-title');

            saveBtn.addEventListener('click', () => {
                const title = input.value.trim();
                if (!title) return;
                projects.push(new Project(title));
                saveProjects();
                projectForm.remove();
                renderProject();
            });

            cancelBtn.addEventListener('click', () => projectForm.remove());

            projectsSection.appendChild(projectForm);
        });
    }

    function renderProject() {
        document.querySelectorAll('.project-container').forEach(c => c.remove());

        projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-container');
            card.dataset.projectId = project.id;
            card.innerHTML = `
                <div class='title-section'>
                    <h2>${project.title}</h2>
                    <button class="delete-btn" data-id="${project.id}">Delete Project</button>
                </div>
                <label>
                    <input type='text' placeholder='Add Task' id="add-task-${project.id}" class='add-task-input'>
                    <button class='add-task-btn' data-project-id="${project.id}">Add</button>
                </label>
                <div class='tasks-list'></div>
            `;

            card.querySelector('.delete-btn').addEventListener('click', () => {
                projects = projects.filter(p => p.id !== project.id);
                saveProjects();
                renderProject();
                taskManager.renderAllTasks?.();
            });

            projectsSection.appendChild(card);
        });

        taskManager.renderAllTasks?.();
    }

    // Load, then render
    loadProjects();
    displayProjectForm();
    renderProject(); // Initial render (in case no saved data)
}