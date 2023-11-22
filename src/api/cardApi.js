import customAxios from "./customAxios";

// 카드 등록 여부 조회
export const getIsExistCard = async () => {
    try {
        const response = await customAxios.get(`/api/members/v1/card/exist`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 카드 조회
export const getCardInfo = async () => {
    try {
        const response = await customAxios.get(`/api/members/v1/card`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 카드 등록
export const postCardInfo = async (data) => {
    try {
        const response = await customAxios.post(`/api/members/v1/card`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 구독권 결제
export const postPaymentSubscription = async (data) => {
    try {
        const response = await customAxios.post(`/api/members/v1/tickets/payment`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}