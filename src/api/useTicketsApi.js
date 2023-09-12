import customAxios from "./customAxios";


// [앱]회원 구독권 취소 api
export const cancelSubscribeTicket = async (id) => {
    try {
        const response = await customAxios.post(`/api/members/v1/tickets/subscribe/cancel`,{id});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// [앱] 회원 중지권 사용
export const useStopTicket = async (id) => {
    try {
        const response = await customAxios.post(`/api/members/v1/tickets/stop`,{id});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// [앱] 회원 환불 요청
export const requestRefundTicket = async (id) => {
    try {
        const response = await customAxios.post(`/api/members/v1/tickets/refund`,{id});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// [앱] 회원 이용권 목록 조회
export const getTypeTickets = async (type) => {
    try {
        const response = await customAxios.get(`/api/members/v1/tickets/type/${type}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// [앱] 회원 이용권 상세 조회
export const getDetailTicket = async (id) => {
    try {
        const response = await customAxios.get(`/api/members/v1/tickets/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// [앱] 이용권 중지권 목록 조회
export const getStopTickets = async (id) => {
    try {
        const response = await customAxios.get(`/api/members/v1/tickets/${id}/stopTicket`);
        return response.data;
    } catch (error) {
        throw error;
    }
}