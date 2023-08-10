import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('@@@@@stor',token)
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const getRefreshTokenFromStorage = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      console.log('@@@@@리프레쉬토큰',refreshToken)
      return refreshToken;
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  };

  export const setRefreshToken = async (refreshToken) => {
    try {
      await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  };