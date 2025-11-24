export default function createTask() {
    let tasksList = [];
    let taskId = 1;

    class Task {
        constructor(title, description, dueDate, priority, projectId) {
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
    function displayTaskForm(projectId, taskTitle) {
        // Check if form already exists
        const existingForm = document.querySelector('.tasks-form-container');
        if (existingForm) return;

        const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
        if (!projectCard) return;
        
        // Create Task Form
        const taskForm = document.createElement('div');
        taskForm.classList.add('tasks-form-container');
        taskForm.innerHTML = `
            <h3>New Task</h3>
            <div class='task-form-inputs'>
                <label>
                    Title:
                    <input type='text' id='task-title' value='${taskTitle}'>
                </label>
                <label>
                    Description:
                    <textarea id='task-description' placeholder='Task description...'></textarea>
                </label>
                <label>
                    Due Date:
                    <input type='date' id='task-date'>
                </label>
                <label>
                    Priority:
                    <select id='task-priority'>
                        <option value='low'>Low</option>
                        <option value='normal' selected>Normal</option>
                        <option value='high'>High</option>
                    </select>
                </label>
            </div>
            <div class='task-form-buttons'>
                <button class='save-task-btn'>Save</button>
                <button class='cancel-task-btn'>Cancel</button>
            </div>
        `;

        // Form Event Listeners
        const saveBtn = taskForm.querySelector('.save-task-btn');
        const cancelBtn = taskForm.querySelector('.cancel-task-btn');

        saveBtn.addEventListener('click', () => {
            const title = taskForm.querySelector('#task-title').value.trim();
            const description = taskForm.querySelector('#task-description').value.trim();
            const dueDate = taskForm.querySelector('#task-date').value;
            const priority = taskForm.querySelector('#task-priority').value;

            if (!title) return;

            const newTask = new Task(title, description, dueDate, priority, projectId);
            tasksList.push(newTask);

            taskForm.remove();
            renderTasksForProject(projectId);
        });

        cancelBtn.addEventListener('click', () => {
            taskForm.remove();
        });

        projectCard.appendChild(taskForm);
    }
    
    
    // ---------- Render Tasks for a Project ----------
    function renderTasksForProject(projectId) {
        const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
        if (!projectCard) return;

        const tasksContainer = projectCard.querySelector('.tasks-list');
        if (!tasksContainer) return;

        // Clear existing tasks in the DOM
        tasksContainer.innerHTML = '';

        // Get tasks for this specific project
        const projectTasks = tasksList.filter(task => task.projectId === projectId);

        // Render each task
        projectTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            taskElement.innerHTML = `
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate || 'No date'}</p>
                <p>Priority: ${task.priority}</p>
            `;
            tasksContainer.appendChild(taskElement);
        });
    }

    // ---------- Render All Tasks ----------
    function renderAllTasks() {
        const allProjects = document.querySelectorAll('.project-container');
        allProjects.forEach(project => {
            const projectId = parseInt(project.getAttribute('data-project-id'));
            renderTasksForProject(projectId);
        });
    }

    // ---------- Handle Add Task Button Click ----------
    projectsSection.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-task-btn')) {
            const projectId = parseInt(e.target.getAttribute('data-project-id'));
            const taskInput = document.getElementById(`add-task-${projectId}`);
            const taskTitle = taskInput.value.trim();
            
            if (!taskTitle) return;

            // Clear input and show form
            taskInput.value = '';
            displayTaskForm(projectId, taskTitle);
        }
    });

    // Export render function
    return {
        renderAllTasks
    };
}