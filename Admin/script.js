// Обработка формы аниме
document.getElementById('anime-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const poster = document.getElementById('poster').value;
    const description = document.getElementById('description').value;
    
    if (episodes.length === 0) {
        alert('Пожалуйста, добавьте хотя бы одну серию');
        return;
    }
    
    const statusDiv = document.getElementById('upload-status');
    statusDiv.style.display = 'block';
    statusDiv.className = 'status';
    statusDiv.textContent = 'Начинаем загрузку...';
    
    try {
        // 1. Создаем папку для аниме
        statusDiv.textContent = 'Создаем папку на Google Drive...';
        const folderId = await createFolder(title);
        
        // 2. Загружаем все серии
        statusDiv.textContent = `Загружаем ${episodes.length} серий...`;
        const uploadedEpisodes = [];
        
        for (const ep of episodes) {
            try {
                statusDiv.textContent = `Загружаем серию ${ep.number}...`;
                const result = await uploadFileToDrive(ep.file, folderId);
                
                // Получаем публичную ссылку (нужно настроить доступ)
                await gapi.client.drive.permissions.create({
                    fileId: result.id,
                    resource: {
                        role: 'reader',
                        type: 'anyone'
                    }
                });
                
                const fileUrl = `https://drive.google.com/uc?export=view&id=${result.id}`;
                uploadedEpisodes.push({
                    number: ep.number,
                    url: fileUrl
                });
                
                ep.status = 'Загружено';
                updateEpisodesList();
            } catch (error) {
                ep.status = 'Ошибка загрузки';
                updateEpisodesList();
                throw error;
            }
        }
        
        // 3. Формируем данные об аниме
        const animeData = {
            id: 'anime-' + Math.random().toString(36).substr(2, 9),
            title,
            poster,
            description,
            episodes: uploadedEpisodes.sort((a, b) => a.number - b.number),
            folderId
        };
        
        // 4. Сохраняем данные в GitHub (это упрощенный пример)
        // В реальном проекте нужно использовать GitHub API или сервер
        statusDiv.textContent = 'Сохраняем данные об аниме...';
        await saveAnimeData(animeData);
        
        // 5. Уведомляем об успехе
        statusDiv.className = 'status success';
        statusDiv.textContent = `Аниме "${title}" успешно добавлено!`;
        
        // Очищаем форму
        this.reset();
        episodes = [];
        updateEpisodesList();
        
    } catch (error) {
        console.error('Ошибка:', error);
        statusDiv.className = 'status error';
        statusDiv.textContent = `Ошибка: ${error.message}`;
    }
});

// Функция для сохранения данных об аниме (заглушка)
async function saveAnimeData(animeData) {
    // В реальном проекте здесь должен быть код для:
    // 1. Получения текущего anime-data.json
    // 2. Добавления нового аниме
    // 3. Сохранения обновленного файла обратно в репозиторий
    
    // Для примера просто выведем данные в консоль
    console.log('Данные для сохранения:', animeData);
    
    // Имитация задержки
    return new Promise(resolve => setTimeout(resolve, 1000));
                }
