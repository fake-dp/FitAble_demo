import axios from "axios";
import customAxios from "./customAxios";
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = Config.API_URL;
// const baseURL = Config.DEV_URL;
console.log('baseURLbaseURLbas',baseURL)
console.log('fuck')
// login api
export const login = async (phone, password, fcmToken) => {
    try {
        const response = await axios.post(`${baseURL}/api/members/v1/login`, { phone, password, fcmToken });
        const { accessToken, refreshToken } = response.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        console.log('로그인 데이터 acce',accessToken)
        console.log('로그인 데이터 ref',refreshToken)
        return response.data;
      } catch (error) {
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

export const autoLoginApi = async (refreshToken) => {
  try {
      const response = await axios.post(`${baseURL}/api/members/v1/token`, {refreshToken});
      // const { accessToken } = response.data;
      // await AsyncStorage.setItem("accessToken", accessToken);
      return response.data; // 갱신 성공 시 true 반환
  } catch (refreshError) {
      console.error('Token refresh failed:@@@@@', refreshError);
      throw refreshError.response; // 오류 수정
  }
}