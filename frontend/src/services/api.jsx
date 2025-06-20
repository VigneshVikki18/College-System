import axios from 'axios';


const api = axios.create({
  baseURL: 'https://college-system-rc7x.onrender.com',
});

// ✅ Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
