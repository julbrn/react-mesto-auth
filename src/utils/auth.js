import {BASE_URL} from "./constants";

const checkServerResponse = (res) => {
    if(!res.ok) {
        return res.text().then(text => { throw new Error(`Ошибка ${res.status}: ${text.split(':')[1].split('}')[0]}`)
    })}
    else {
        return res.json();
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => checkServerResponse(res))

};

export const signIn = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => checkServerResponse(res))
};

export function getProfile(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data)
}