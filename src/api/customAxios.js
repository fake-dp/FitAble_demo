import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customAxios = axios.create({
  baseURL: `${Config.API_URL}`,
  headers: {
    'content-type': 'application/json',
  },
});

// 요청 인터셉터
customAxios.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  });
  
  // 응답 인터셉터
  customAxios.interceptors.response.use(null, async (error) => {
    const originalRequest = error.config;
    if (error && error.response && error.response.status === 401 && error.response.data && error.response.data.code === 10100) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");
     
      try {
        const response = await axios.post(`${Config.API_URL}/api/members/v1/token`, { refreshToken });
        const { accessToken } = response.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return customAxios(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(error); // 원래의 오류 반환
      }
      
    }
    return Promise.reject(error);
  });

export default customAxios;
