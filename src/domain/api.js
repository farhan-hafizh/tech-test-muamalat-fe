import axios from 'axios';
import axiosRetry from 'axios-retry';
import { errorInterceptor, requestInterceptor, responseInterceptor } from '../utils/apiHelper';

const API = axios.create({ baseURL: "http://localhost:8080/api", withCredentials: false });

API.interceptors.request.use((req) => {
  req = requestInterceptor(req);
  return req;
});
API.interceptors.response.use(
  (res) => {
    res = responseInterceptor(res);
    return res;
  },
  async (error) => {
    error = errorInterceptor(error);
    return Promise.reject(error);
  }
);

// Use axios-retry to enable automatic retries
axiosRetry(API, {
  retries: 3, // Number of retries after encountering an error
  retryCondition: (error) => error.response && error.response.status === 401, // Retry only on 401 Unauthorized errors
  retryDelay: (retryCount) =>
    // Delay between retries (adjust as needed)
    retryCount * 5000,
});

// const endpoint = '/test/:foo/:bar/done';
// const params = { param: 'paramValue' };
// const urlParams = { foo: 'fooValue', bar: 'barValue' };

const callApi = (endpoint, method, payload, urlParams, params) => {
  let url = endpoint;

  if (urlParams) {
    // Replace placeholders in the URL with actual values from urlParams
    Object.keys(urlParams).forEach((param) => {
      const placeholder = `:${param}`;
      if (url.includes(placeholder)) {
        url = url.replace(placeholder, urlParams[param]);
      }
    });
  }

  // Create the Axios request configuration
  const requestConfig = {
    method,
    url,
    params,
  };

  // Only include the payload if it's not null or undefined
  if (payload !== null && payload !== undefined) {
    requestConfig.data = payload;
  }

  return API(requestConfig);
};

const endpoints = {
  login: '/login',
  logout: '/logout',
  register: '/register',
};

export const loginApi = (data) => callApi(endpoints.login, 'post', data);
export const logoutApi = () => callApi(endpoints.logout, 'post');
export const registerApi = (data) => callApi(endpoints.register, 'post', data);
