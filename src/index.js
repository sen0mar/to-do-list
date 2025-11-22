import './styles.css';
import createSidebar from './sidebar';
import createProject from './projects';

document.addEventListener('DOMContentLoaded', () => {
    createSidebar();
    createProject();
});

