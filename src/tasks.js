export default function createTask() {
    let tasksList = [];
    let taskId = 1;

    class Task {
        constructor(title, description, dueDate, priority, projectId, completed = false) {
            this.id = taskId++;
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.projectId = projectId;
            this.completed = completed;
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasksList));
    }

    function loadFromLocalStorage() {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            const parsed = JSON.parse(saved);
            tasksList = parsed.map(t => {
                taskId = Math.max(taskId, t.id + 1);
                return new Task(t.title, t.description, t.dueDate, t.priority, t.projectId, t.completed || false);
            });
            renderAllTasks();
        }
    }

    function displayTaskForm(projectId, taskTitle = '') {
        if (document.querySelector('.tasks-form-container')) return;

        const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
        if (!projectCard) return;

        const form = document.createElement('div');
        form.className = 'tasks-form-container';
        form.innerHTML = `
            <div class='task-form-inputs'>
                <input type='text' id='task-title' value='${taskTitle}' placeholder='Title'>
                <textarea id='task-description' placeholder='Description'></textarea>
                <input type='date' id='task-date'>
                <select id='task-priority'>
                    <option value='low'>Low</option>
                    <option value='normal' selected>Normal</option>
                    <option value='high'>High</option>
                </select>
            </div>
            <div class='task-form-buttons'>
                <button class='save-task-btn'>Save</button>
                <button class='cancel-task-btn'>Cancel</button>
            </div>
        `;

        form.querySelector('.save-task-btn').onclick = () => {
            const title = form.querySelector('#task-title').value.trim();
            if (!title) return;

            const task = new Task(
                title,
                form.querySelector('#task-description').value.trim(),
                form.querySelector('#task-date').value,
                form.querySelector('#task-priority').value,
                projectId
            );
            tasksList.push(task);
            saveTasks();
            form.remove();
            renderTasksForProject(projectId);
        };

        form.querySelector('.cancel-task-btn').onclick = () => form.remove();
        projectCard.appendChild(form);
    }

    function renderTasksForProject(projectId) {
        const card = document.querySelector(`[data-project-id="${projectId}"]`);
        if (!card) return;
        const container = card.querySelector('.tasks-list');
        if (!container) return;

        container.innerHTML = '';
        tasksList
            .filter(t => t.projectId === projectId)
            .forEach(task => {
                const el = document.createElement('div');
                el.className = `task-item ${task.completed ? 'completed' : ''}`;

                el.innerHTML = `
                    <label class="checkbox-container">
                        <input type="checkbox" ${task.completed ? 'checked' : ''}>
                        <span class="checkmark"></span>
                    </label>
                    <div class="task-details">
                        <h4>${task.title}</h4>
                        <p>${task.description || 'No description'}</p>
                        <p>Due: ${task.dueDate || 'No date'}</p>
                        <p>Priority: <span class="priority-${task.priority}">${task.priority}</span></p>
                    </div>
                `;

                el.querySelector('input[type="checkbox"]').onchange = (e) => {
                    task.completed = e.target.checked;
                    saveTasks();
                    renderTasksForProject(projectId);
                };

                container.appendChild(el);
            });
    }

    function renderAllTasks() {
        document.querySelectorAll('.project-container').forEach(proj => {
            const id = Number(proj.dataset.projectId);
            renderTasksForProject(id);
        });
    }

    document.querySelector('.projects').addEventListener('click', e => {
        if (e.target.classList.contains('add-task-btn')) {
            const projectId = Number(e.target.dataset.projectId);
            const input = document.getElementById(`add-task-${projectId}`);
            const title = input.value.trim();
            if (!title) return;
            input.value = '';
            displayTaskForm(projectId, title);
        }
    });

    return {
        renderAllTasks,
        loadFromLocalStorage
    };
}