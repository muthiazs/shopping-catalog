import axios from 'axios';

// Kita pakai Axios karena lebih "clean" untuk handle error dan base URL
export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tips: Menggunakan interceptor (Opsional tapi dapet nilai plus)
// Ini buat liat kalau ada error di console pas nembak API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);