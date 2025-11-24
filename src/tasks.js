export default function createTask() {
    let tasksList = [];
    let taskId = 1;

    class Task {
        constructor(title, description, dueDate, priority) {
            this.id = taskId++;
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.projectId = projectId;
        }
    }

    // ---------- Selectors ----------
    const projectsSection = document.querySelector('.projects');

    // ---------- Task Form ----------
    function displayTaskForm() {
        projectsSection.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-task-btn')) {
                const project = document.querySelector('.project-container');

                // Get Task Title Value
                const taskInput = document.getElementById('add-task');
                const taskTitle = taskInput.value.trim();   

                // Display Task Form
                const taskForm = document.createElement('div');
                taskForm.classList.add('tasks-form-container');
                taskForm.innerHTML = `

                `


                project.appendChild(taskForm);
            }
        });
    }
    displayTaskForm();
}

