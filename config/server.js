export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const port = process.env.PORT || (isDev ? 8000 : isTest ? 8080 : 8000);

export const APIServerURL = process.env.API_SERVER_URL || '';
export const serverURL = process.env.SERVER_URL || `http://localhost:${port}`;
export const apiURL = isProd ? `${APIServerURL}/api` : `${serverURL}/api`;
