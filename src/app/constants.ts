export const API_HOST_NAME = 'api.ddxiong.net:3000';
const API_PROTOCOL_PREFIX = 'http://';
const API_ENDPOINTS_BASE_URI: string = API_PROTOCOL_PREFIX 
    + API_HOST_NAME + '/api';

export const API_ENDPOINTS = {
    login: API_ENDPOINTS_BASE_URI + '/auth/login',
    settings: API_ENDPOINTS_BASE_URI + '/settings',
    photo: API_ENDPOINTS_BASE_URI + '/photo',
};

export const API_CONSTANTS = {
    JWT_TOKEN_NAME: 'access_token',
    USER_SETTINGS_NAME: 'user_settings'
}