/* eslint-disable no-param-reassign */
import axios from 'axios';

import type { ApiError } from './api.types';

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/v1`,
  withCredentials: false,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  // Use a helper or direct cookie access to get the token
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Errors are caught and handled here. Standardize the error response to ApiError.
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const apiError = error.response.data as ApiError;
      return Promise.reject(apiError);
    }

    // Handle cases where error.response is not available or not in expected format
    const defaultError: ApiError = {
      statusCode: error.response?.status || 500,
      errorMessage: error.message || 'An unexpected error occurred',
    };
    return Promise.reject(defaultError);
  }
);

export default http;
