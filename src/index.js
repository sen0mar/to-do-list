import './styles.css';
import createSidebar from './sidebar';
import createProject from './projects';
import createTask from './tasks';

document.addEventListener('DOMContentLoaded', () => {
    createSidebar();

    const taskManager = createTask();
    createProject(taskManager);

    // Load saved data (projects load inside createProject, tasks here)
    taskManager.loadFromLocalStorage?.();
});