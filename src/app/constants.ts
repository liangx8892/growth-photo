const API_ENDPOINTS_BASE_URI: string = 'http://192.168.0.107:3000/api';

export const API_ENDPOINTS = {
    login: API_ENDPOINTS_BASE_URI + '/auth/login',
    settings: API_ENDPOINTS_BASE_URI + '/settings',
};

export const API_CONSTANTS = {
    JWT_TOKEN_NAME: 'access_token',
    USER_SETTINGS_NAME: 'user_settings'
}