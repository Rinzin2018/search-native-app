import axios from "axios";
import { API_URL } from "@env";
import { IS_LOADING, SNACKBAR_OPEN } from "../reducers";

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 0;
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

export const ApiUtils = {
  axios: axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 0,
  }),
  dispatch: null,
  state: null,
};

const changeLoaderStatus = () => {
  ApiUtils.dispatch({ type: IS_LOADING, payload: { isLoad: false } });
  ApiUtils.dispatch({ type: "IS_NOT_LOADING", payload: true });
};

// Add a request interceptor
ApiUtils.axios.interceptors.request.use(
  function(config) {
    ApiUtils.dispatch({
      type: IS_LOADING,
      payload: { isLoad: ApiUtils.state.loaderState },
    });
    return config;
  },
  function(error) {
    changeLoaderStatus();
    if (!error.response) {
      ApiUtils.dispatch({
        type: SNACKBAR_OPEN,
        payload: { isNotify: true, severity: "error", message: error.message },
      });
      return Promise.reject(error.message);
    }
    let message =
      error?.response?.data?.error || error?.response?.data?.errors?.join(", ");
    // Do something with request error
    ApiUtils.dispatch({
      type: SNACKBAR_OPEN,
      payload: { isNotify: true, severity: "error", message: message },
    });
    return Promise.reject(message);
  },
);

ApiUtils.axios.interceptors.response.use(
  function(response) {
    changeLoaderStatus();
    return response;
  },
  function(error) {
    changeLoaderStatus();
    if (!error.response) {
      ApiUtils.dispatch({
        type: SNACKBAR_OPEN,
        payload: { isNotify: true, severity: "error", message: error.message },
      });
      return Promise.reject(error.message);
    }
    if (error.response.status === 401) {
      // make an action based on status
    }
    let message =
      error?.response?.data?.error || error?.response?.data?.errors?.join(", ");
    ApiUtils.dispatch({
      type: SNACKBAR_OPEN,
      payload: { isNotify: true, severity: "error", message: message },
    });
    return Promise.reject(message);
  },
);

const apiUtils = (url, method, params, data, responseType) => {
  return ApiUtils.axios.request({
    url,
    method,
    params,
    data,
    responseType,
  });
};
export default apiUtils;
