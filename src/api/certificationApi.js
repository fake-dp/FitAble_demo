import axios from "axios";
import Config from 'react-native-config';
// const baseURL = Config.API_URL;
const baseURL = Config.API_URL;
// 인증번호 받기
export const getCertificationNumber = async (phone) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/messages/certification-numbers`, { phone });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 인증번호 확인
export const checkCertificationNumber = async ({phone, number}) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/messages/certification-numbers/valid`, { phone, number});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 핸드폰 번호 중복 확인
export const checkPhone = async (phone) => {
    try {
        const response = await axios.post(`${baseURL}/api/members/v1/phone/valid`, { phone });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// find password
export const findPassword = async ({phone,password}) => {
    try {
        const response = await axios.put(`${baseURL}/api/members/v1/password/find`, { phone, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}