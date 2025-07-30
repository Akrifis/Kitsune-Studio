// Пример данных (в реальном проекте заменить на API)
const animeData = [
    {
        id: 1,
        title: "Атака Титанов",
        cover: "https://via.placeholder.com/300x420?text=Attack+on+Titan",
        genre: ["action", "drama"],
        episodes: 75,
        year: 2013
    },
    {
        id: 2,
        title: "Наруто",
        cover: "https://via.placeholder.com/300x420?text=Naruto",
        genre: ["action", "comedy"],
        episodes: 220,
        year: 2002
    },
    {
        id: 3,
        title: "Магическая битва",
        cover: "https://via.placeholder.com/300x420?text=Jujutsu+Kaisen",
        genre: ["action", "fantasy"],
        episodes: 24,
        year: 2020
    },
    {
        id: 4,
        title: "Стальной алхимик",
        cover: "https://via.placeholder.com/300x420?text=Fullmetal+Alchemist",
        genre: ["action", "drama", "fantasy"],
        episodes: 64,
        year: 2003
    }
];

// DOM элементы
const animeContainer = document.getElementById('anime-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const genreFilter = document.getElementById('genre-filter');

// Функция отрисовки аниме
function renderAnime(animeList) {
    animeContainer.innerHTML = '';
    
    animeList.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';
        animeCard.innerHTML = `
            <img src="${anime.cover}" alt="${anime.title}" class="anime-cover">
            <div class="anime-info">
                <h3 class="anime-title">${anime.title}</h3>
                <div class="anime-meta">
                    <span>${anime.episodes} эп.</span>
                    <span>${anime.year}</span>
                </div>
            </div>
        `;
        animeContainer.appendChild(animeCard);
    });
}

// Функция поиска и фильтрации
function filterAnime() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    
    const filtered = animeData.filter(anime => {
        const matchesSearch = anime.title.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre ? anime.genre.includes(selectedGenre) : true;
        return matchesSearch && matchesGenre;
    });
    
    renderAnime(filtered);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderAnime(animeData);
    
    // Обработчики событий
    searchBtn.addEventListener('click', filterAnime);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterAnime();
    });
    genreFilter.addEventListener('change', filterAnime);
});
