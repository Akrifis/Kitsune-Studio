// Конфигурация Google API
const API_KEY = 'ВАШ_API_КЛЮЧ';
const CLIENT_ID = 'ВАШ_CLIENT_ID';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';

let gapiInited = false;
let gisInited = false;
let tokenClient;

// Инициализация Google API
function initializeGapiClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    }).then(() => {
        gapiInited = true;
        maybeEnableButtons();
    });
}

// Инициализация токена
function initializeGis() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPE,
        callback: '', // Определяется при запросе
    });
    gisInited = true;
    maybeEnableButtons();
}

// Проверка готовности API
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('auth-button').style.display = 'block';
    }
}

// Авторизация
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            document.getElementById('auth-status').textContent = 'Ошибка авторизации';
            throw resp;
        }
        
        document.getElementById('auth-status').textContent = 'Авторизован';
        document.getElementById('auth-button').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.requestAccessToken({prompt: ''});
    }
}

// Инициализация при загрузке
window.onload = function() {
    document.getElementById('auth-button').onclick = handleAuthClick;
    
    gapi.load('client', initializeGapiClient);
    google.accounts.oauth2.init(initializeGis);
};
