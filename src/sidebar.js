import profileIcon from './assets/profile.svg';
import searchIcon from './assets/search.svg';
import addIcon from './assets/add.svg';
import calendarTodayIcon from './assets/calendar.svg';
import calendarIcon from './assets/plan-calendar.svg';

export default function createSidebar() {
    const sidebar = document.querySelector('.sidebar-container');

    const profile = document.createElement('div');
    profile.classList.add('profile-container');
    profile.innerHTML = `
        <div class='section'>
            <img src=${profileIcon} alt='search icon' height='60' width='60'>
            <p>Senny</p>
        </div>
    `

    const options = document.createElement('div');
    options.classList.add('options-container');
    options.innerHTML = `
        <div class='section'>
            <img src=${searchIcon} alt='search icon' height='40' width='40'>
            <input type="search" placeholder='Search' id='search-bar'>
        </div>
        <button class='section' id='add-project-btn'>
            <img src=${addIcon} alt='search icon' height='40' width='40'>
            <p>Add Project</p>
        </button>
        <button class='section' id='check-calendar-btn'>
            <img src=${calendarIcon} alt='search icon' height='40' width='40'>
            <p>Upcoming</p>
        </button>
        <button class='section' id='check-today-btn'>
            <img src=${calendarTodayIcon} alt='search icon' height='40' width='40'>
            <p>Today</p>
        </button>
    `;

    sidebar.appendChild(profile);
    sidebar.appendChild(options);
}