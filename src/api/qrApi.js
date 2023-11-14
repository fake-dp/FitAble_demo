import customAxios from "./customAxios";

// qr 출석 가능한 이용권 목록 조회
export const getQrTicketCheckInList = async (token) => {
    try {
        const response = await customAxios.get(`/api/members/v1/tickets/checkIn/${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
// qr 입장
export const postQrCheckIn = async (data) => {
    try {
        const response = await customAxios.post(`/api/members/v1/checkIn`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}