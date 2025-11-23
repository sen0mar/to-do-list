export default function createTask() {
    let tasks = [];
    let taskId = 1;

    class Task {
        constructor(title, description, dueDate, priority) {
            this.id = taskId++;
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
        }
    }

    // ---------- Selectors ----------
    const projectsSection = document.querySelector('.projects');

    projectsSection.addEventListener('click', (e) => {
        if (e.target.classList.contains('submit-btn')) {
            e.preventDefault();
            alert('hello');
        }
    });
}

