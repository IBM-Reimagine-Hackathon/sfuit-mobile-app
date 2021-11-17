import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://3890e7f1.us-south.apigw.appdomain.cloud/auth/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestHandler = request => {
  return request;
};

AxiosInstance.interceptors.request.use(
  request => requestHandler(request),
  error => errorHandler(error),
);

const responseHandler = response => {
  return response;
};

const errorHandler = error => {
  //toast notification
  return Promise.reject(error);
};

AxiosInstance.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error),
);

// AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default AxiosInstance;
