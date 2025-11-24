import './styles.css';
import createSidebar from './sidebar';
import createProject from './projects';
import createTask from './tasks';

document.addEventListener('DOMContentLoaded', () => {
    createSidebar();
    
    // Create tasks first and get the task manager
    const taskManager = createTask();
    
    // Pass the task manager to projects
    createProject(taskManager);
});
