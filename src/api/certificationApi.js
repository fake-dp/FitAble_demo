import customAxios from "./customAxios";

// 인증번호 받기
export const getCertificationNumber = async (phone) => {
    try {
        const response = await customAxios.post("/api/v1/messages/certification-numbers", { phone });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 인증번호 확인
export const checkCertificationNumber = async (phone, number) => {
    try {
        const response = await customAxios.post("/api/v1/messages/certification-numbers/valid", { phone, number });
        return response.data;
    } catch (error) {
        throw error;
    }
}

