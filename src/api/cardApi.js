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

// 구독권 결제 합계
export const getPaymentSubscriptionTotal = async (amount) => {
    try {
        const response = await customAxios.get(`/api/members/v1/tickets/price/${amount}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 구독권 다음달 결제
export const postPaymentSubscriptionNextMonth = async (id) => {
    try {
        const response = await customAxios.post(`/api/members/v1/tickets/subscribe/next/payment`, id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 결제 정보 저장 api
export const postPaymentInfo = async (data) => {
    try {
        const response = await customAxios.post(`/api/members/v2/tickets/payment/info`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}