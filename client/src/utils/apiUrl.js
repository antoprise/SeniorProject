const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : 'http://localhost:5000';

export default apiUrl;
