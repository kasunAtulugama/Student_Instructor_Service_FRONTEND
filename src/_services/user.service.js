import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    addUser,
    getAll,
    getById
};

function addUser(username, password, firstName, lastName) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, firstName, lastName})
    };
}
function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}