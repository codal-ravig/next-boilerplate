// src/lib/api/apiClient.ts
import axios, { AxiosInstance } from 'axios';
// import { cookies } from 'next/headers';

// Create a reusable Axios instance
const createApiClient = (baseURL: string): AxiosInstance => {
  const apiClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  apiClient.interceptors.request.use(
    async (config) => {
      // Add auth token or other headers here if needed
      if (typeof window !== 'undefined') {
        // Client-side: Get token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        // Server-side: Get token from cookies or other server-side storage
        // Example: Use Next.js `cookies` utility
        // const cookie = await cookies();
        // const token = cookie.get('token')?.value;
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors globally
      if (error.response?.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        console.log(error);
        console.error('Unauthorized access');
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

// Use environment variable for base URL
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://jsonplaceholder.typicode.com';
const apiClient = createApiClient(baseURL);

export default apiClient;
