// Файл с данными об аниме (хранится на GitHub)
const ANIME_DATA_URL = 'https://raw.githubusercontent.com/ваш-аккаунт/ваш-репозиторий/main/anime-data.json';

// Загрузка списка аниме
async function loadAnimeList() {
    try {
        const response = await fetch(ANIME_DATA_URL);
        const animeList = await response.json();
        displayAnimeList(animeList);
    } catch (error) {
        console.error('Ошибка загрузки списка аниме:', error);
        document.querySelector('.anime-list').innerHTML = 
            '<div class="error">Не удалось загрузить список аниме. Попробуйте позже.</div>';
    }
}

// Отображение списка аниме
function displayAnimeList(animeList) {
    const container = document.querySelector('.anime-list');
    container.innerHTML = '';
    
    animeList.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';
        animeCard.innerHTML = `
            <img src="${anime.poster}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p>Серий: ${anime.episodes.length}</p>
            <a href="player.html?id=${anime.id}">Смотреть</a>
        `;
        container.appendChild(animeCard);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', loadAnimeList);
