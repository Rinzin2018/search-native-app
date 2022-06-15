import baseApi from '../utils/ApiUtils';

/**
 * Character list fetch api
 * **/
export const characterServices = (url = '/characters', method = 'get', params = null, payload = null) => {
  return baseApi(url, method, params, payload).then(response => {
    return response.data;
  });
};
