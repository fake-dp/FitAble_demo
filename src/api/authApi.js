import axios from "axios";
import customAxios from "./customAxios";
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseURL = Config.API_URL;
const baseURL = Config.API_URL;

// login api
export const login = async (phone, password, fcmToken) => {
    try {
        const response = await axios.post(`${baseURL}/api/members/v1/login`, { phone, password, fcmToken });
        const { accessToken, refreshToken } = response.data;
        if (accessToken && refreshToken) {
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
          await AsyncStorage.setItem("isLogin", "true"); 
      } else {
          throw new Error('Missing tokens'); 
      }

      return response.data;
  } catch (error) {
      console.error("Login failed:", error);
      throw error; 
  }
};

// Join api
export const joinInfo = async (data) => {
  try {
      const response = await axios.post(`${baseURL}/api/members/v1/join`, data);
      return response.data;
  } catch (error) {
      throw error;
  }
}


// put update myinfo
export const upDateMyInfo = async (data) => {
  try {
      const response = await customAxios.put('/api/members/v1/info', data);
      return response.data;
  } catch (error) {
      throw error;
  }
}
export const autoLoginApi = async () => {
  try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
          throw new Error("No refreshToken found");
      }

      const response = await axios.post(`${baseURL}/api/members/v1/token`, { refreshToken });
      const { accessToken, newRefreshToken } = response.data;

      // 새로운 액세스 토큰과 리프레시 토큰 저장
          await AsyncStorage.setItem("accessToken", accessToken);
      if (newRefreshToken) {
          await AsyncStorage.setItem("refreshToken", newRefreshToken);
      }

      return true;
  } catch (refreshError) {
      console.error('Auto login failed:', refreshError);
      return false;
  }
}

// 회원탈퇴

export const deleteMyInfo = async () => {
  try {
      const response = await customAxios.delete('/api/members/v1/member');
      return response.data;
  } catch (error) {
      throw error;
  }
}