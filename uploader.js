// Хранилище для информации о сериях
let episodes = [];
let currentAnimeId = null;

// Добавление серии в список
document.getElementById('add-episode').addEventListener('click', async function() {
    const episodeNumber = document.getElementById('episode-number').value;
    const fileInput = document.getElementById('episode-file');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Пожалуйста, выберите файл серии');
        return;
    }
    
    // Создаем временный ID для серии
    const tempId = 'temp-' + Math.random().toString(36).substr(2, 9);
    
    // Добавляем в список
    const episodeItem = {
        id: tempId,
        number: episodeNumber,
        file: file,
        status: 'Ожидает загрузки'
    };
    
    episodes.push(episodeItem);
    updateEpisodesList();
    
    // Сбрасываем инпуты
    fileInput.value = '';
    document.getElementById('episode-number').value = parseInt(episodeNumber) + 1;
});

// Обновление списка серий
function updateEpisodesList() {
    const container = document.getElementById('episodes-container');
    container.innerHTML = '';
    
    episodes.forEach(ep => {
        const div = document.createElement('div');
        div.className = 'episode-item';
        div.innerHTML = `
            <span>Серия ${ep.number}: ${ep.status}</span>
            <button onclick="removeEpisode('${ep.id}')">Удалить</button>
        `;
        container.appendChild(div);
    });
}

// Удаление серии из списка
window.removeEpisode = function(id) {
    episodes = episodes.filter(ep => ep.id !== id);
    updateEpisodesList();
};

// Загрузка файла на Google Drive
async function uploadFileToDrive(file, folderId = null) {
    const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: folderId ? [folderId] : []
    };
    
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);
    
    try {
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({'Authorization': 'Bearer ' + gapi.client.getToken().access_token}),
            body: form
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        throw error;
    }
}

// Создание папки на Google Drive
async function createFolder(folderName) {
    const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
    };
    
    try {
        const response = await gapi.client.drive.files.create({
            resource: fileMetadata,
            fields: 'id'
        });
        
        return response.result.id;
    } catch (error) {
        console.error('Ошибка создания папки:', error);
        throw error;
    }
}
