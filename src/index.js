import './styles.css';
import createSidebar from './sidebar';
import createProject from './projects';
import createTask from './tasks';

document.addEventListener('DOMContentLoaded', () => {
    createSidebar();
    createProject();
    createTask();
});

