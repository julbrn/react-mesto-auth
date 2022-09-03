export const BASE_URL = 'https://auth.nomoreparties.co';
function checkServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(password, email) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
           // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkServerResponse)
};
