export default function createProject() {
    let projects = [];

    // ----- Selectors -----
    const projectsSection = document.querySelector('.projects');
    const addProjectBtn = document.getElementById('add-project-btn');

    // ----- Event Listeners -----
    function displayProjectForm() {
        addProjectBtn.addEventListener('click', () => {
            const projectForm = document.createElement('div');
            projectForm.classList.add('form-container');
            projectForm.innerHTML = `
                <input type='text' id='project-title'></input>
                <div class='project-form-buttons'>
                    <button type="submit" class="save-btn">Save</button>
                    <button type="button" class="cancel-btn">Delete</button>
                </div>
            `
            // Project Form Buttons & Input
            const saveProject = projectForm.querySelector('.save-btn');
            const cancelProject = projectForm.querySelector('.cancel-btn');
            const titleInput = projectForm.querySelector('#project-title');

            saveProject.addEventListener('click', () => {
                const title = titleInput.value.trim();
                if (!title) return;

                projects.push({title});
                projectForm.remove();
            });
            cancelProject.addEventListener('click', () => {
                projectForm.remove();
            });

            projectsSection.append(projectForm);
        });
    }
}