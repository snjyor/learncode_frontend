import { config } from './config.js';

const APP_API_URL = config.APP_API_URL;

document.addEventListener('DOMContentLoaded', function(event) {
    myProjects(event);
});


function myProjects(event) {
    const params = new URLSearchParams(window.location.search);
    console.log('params:', params);
    console.log('window.location.search:', window.location.search);
    const user_id = params.get('user_id');
    event.preventDefault();
    fetch(`${APP_API_URL}/projects/mine?user_id=${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const sections = document.getElementsByClassName('section');

        const studyingSection = sections[0];
        const completedSection = sections[1];

        // const studyingCardGrid = studyingSection.querySelector('.card-grid');
        const studyingProjects = data.data.studying_projects;
        studyingProjects.forEach(project => {
            creatCardElement(studyingSection, 0, project, studyingProjects.length);
        });

        // const completedCardGrid = completedSection.querySelector('.card-grid');
        const completedProjects = data.data.completed_projects;
        completedProjects.forEach(project => {
            creatCardElement(completedSection, 1, project, completedProjects.length);
        });
        
        const unStudySection = document.querySelector('.explore-card-grid');
        const unStudyProjects = data.data.unstudy_projects;

        unStudyProjects.forEach(project => {
            creatCardElement(unStudySection, -1, project, unStudyProjects.length, 'explore-card-container');
        });
    })
    .catch(error => console.error('Error fetching projects:', error));
}


function creatCardElement(Section, status, project, count, cardClassName) {
    if (status !== -1) {
        const sectionTitle = Section.querySelector('.section-title');
        sectionTitle.textContent = status === 0 ? `正在学习(${count})` : `已完成(${count})`;
    }
    const cardClassNameGrid = cardClassName ? cardClassName : 'card-grid';
    const cardClassNames = cardClassName ? 'explore-card' : 'card';
    console.log('cardClassNames:', cardClassNames);
    const CardGrid = Section.querySelector(`.${cardClassNameGrid}`);
    const card = document.createElement('div');
    card.className = cardClassNames;

    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';

    const image = document.createElement('img');
    const imgPath = [
        'images/project1.png',
        'images/project2.png',
    ]
    image.src = imgPath[Math.floor(Math.random() * imgPath.length)];
    cardImage.appendChild(image);
    card.appendChild(cardImage);

    const cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';
    cardTitle.textContent = project.project_name;
    card.appendChild(cardTitle);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.width = project.progress + '%';
    progressBar.appendChild(progress);
    card.appendChild(progressBar);

    const progressInfo = document.createElement('div');
    progressInfo.className = 'progress-info';
    const blankSpan = document.createElement('span');
    blankSpan.textContent = '';
    const progressText = document.createElement('span');
    progressText.textContent = project.progress + '%';
    progressInfo.appendChild(blankSpan);
    progressInfo.appendChild(progressText);
    card.appendChild(progressInfo);

    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = status === 0 ? '继续学习' : status === 1 ? '已完成' : '开始学习';
    card.appendChild(button);
    CardGrid.appendChild(card);
}


