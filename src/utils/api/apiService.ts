import axios from 'axios';
import apiConfig from './apiConfig';
import errorHandler from './apiErrorHandler';

axios.defaults.baseURL = `${apiConfig.apiUrl}/api`;
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = apiConfig.contentType;
axios.defaults.headers.put['Content-Type'] = apiConfig.contentType;

axios.interceptors.request.use(async (config) => {
  const token = 'someToken'
  return config
});

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error === 'not authenticated') {
      console.log('error')
    }
    const errorResponse = errorHandler(error.response)
    return Promise.reject(errorResponse)
  },
);

export default axios;
