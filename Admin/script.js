// Этот скрипт предполагает, что вы используете GitHub API для обновления данных
// В реальном проекте нужно использовать более безопасный способ, например, серверную часть

document.getElementById('anime-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const poster = document.getElementById('poster').value;
    const description = document.getElementById('description').value;
    const episodes = document.getElementById('episodes').value
        .split('\n')
        .filter(link => link.trim() !== '');
    
    const newAnime = {
        id: generateId(),
        title,
        poster,
        description,
        episodes: episodes.map((link, index) => ({
            number: index + 1,
            url: link.trim()
        }))
    };
    
    // Здесь должен быть код для добавления нового аниме в anime-data.json
    // В реальном проекте это делается через GitHub API или сервер
    
    alert(`Аниме "${title}" добавлено! Не забудьте обновить файл anime-data.json на GitHub`);
    this.reset();
});

function generateId() {
    return 'anime-' + Math.random().toString(36).substr(2, 9);
}
