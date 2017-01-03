export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const serverURL = 'http://localhost:8000';
export const apiURL = isProd ? '/api' : `${serverURL}/api`;
