import customAxios from "./customAxios";

// 전체 예약 목록 조회
export const getReservations = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/lessons");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 예약/대기 
export const postReservations = async (id) => {
    try {
        const response = await customAxios.post('/api/members/v1/lessons/reservation',{id});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 예약/대기 취소
export const cancelReservation = async (id) => {
    try {
        const response = await customAxios.post('/api/members/v1/lessons/cancel',{id});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 홈 회원 이용권 목록 조회
export const getHomeTickets = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/tickets/home");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 홈 예약 목록 조회
export const getHomeReservations = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/lessons/home");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 센터별 예약 가능한 기간 조회
export const getAvailableDates = async (id) => {
    try {
        const response = await customAxios.get(`/api/members/v1/centers/${id}/lessons/reservation/period`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 센터별 예약 가능한 수업 조회
export const getAvailableLessons = async (id, date, pageNumber = 0, pageSize = 1000) => {
    try {
        const response = await customAxios.get(`/api/members/v1/centers/${id}/lessons/date/${date}?page=${pageNumber}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}