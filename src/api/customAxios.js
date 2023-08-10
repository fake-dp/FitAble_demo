import axios from 'axios';
import { Alert } from 'react-native';
import { getRefreshTokenFromStorage, setToken,setRefreshToken } from './tokenUtils'; // 위에서 작성한 토큰 관리 함수를 가져옵니다.
import Config from 'react-native-config';

const customAxios = axios.create({
  baseURL: `${Config.API_URL}`,
  headers: {
    'content-type': 'application/json',
},
});

// customAxios.interceptors.request.use(
//   async (config) => {
//     const accessToken = await getToken();
//     if (accessToken) {
//       config.headers.Authorization = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// customAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error) {
//         console.log('@@@',error)
//     //   Alert.alert('interceptors이슈!@ ', '', [{ text: '확인', onPress: () => removeToken() }]);
//     }
//     // 다른 오류 처리 코드도 작성할 수 있습니다.
//     return Promise.reject(error);
//   }
// );
customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error && error.response && error.response.status === 401) {
        const refreshToken = await getRefreshTokenFromStorage();
        if (refreshToken) {
          try {
            const refreshResponse = await customAxios.post(`${Config.API_URL}/api/members/v1/token`, {
              refreshToken,
            });
            console.log('@@@@@refreshResponse응답',refreshResponse)
            if (refreshResponse.data) {
              const { newAccessToken,newRefreshToken} = await refreshResponse.data;
              await setToken(newAccessToken); // 갱신된 액세스 토큰 저장
              await setRefreshToken(newRefreshToken); // 갱신된 리프레시 토큰 저장
              const originalRequest = error.config;
  
              // 갱신된 액세스 토큰으로 원래 요청 재시도
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return customAxios(originalRequest);
            } else {
              // 리프레시 토큰 만료 등 예외 처리
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
          }
        } else {
          // 리프레시 토큰이 없을 경우 처리
        }
      }
      return Promise.reject(error);
    }
  );
  

export default customAxios;
