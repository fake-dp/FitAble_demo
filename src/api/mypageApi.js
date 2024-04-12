import customAxios from "./customAxios";
import multipartAxios from "./multipartAxios";


// get myinfo
export const getMyInfo = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/info");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// change phone
export const changePhone = async (phone) => {
    try {
        const response = await customAxios.put("/api/members/v1/phone", { phone });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// change password
export const changePassword = async (password) => {
    try {
        const response = await customAxios.put("/api/members/v1/password", { password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get mileages
export const getMileages = async (pageNumber = 0, pageSize = 1000) => {
    try {
        const response = await customAxios.get(`/api/members/v1/mileages?page=${pageNumber}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


// get valid center
export const getValidCenter = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/centers/valid");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get valid center name
export const getValidCenterName = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/centers/valid/name");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// post main center api
export const postMainCenter = async (id) => {
    try {
        const response = await customAxios.post(`/api/members/v1/centers/main`,{id});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// notice list api
export const getNoticeList = async (pageNumber = 0, pageSize = 1000) => {
    try {
        const response = await customAxios.get(`/api/members/v1/notices?page=${pageNumber}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// notice detail api
export const getNoticeDetail = async (id) => {
    try {
        const response = await customAxios.get(`/api/members/v1/notices/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get inquiry list
export const getInquiryList = async (id) => {
    try {
        const response = await customAxios.get(`/api/members/v1/inquiry/center/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// post inquiry
export const postInquiry = async (data) => {
    try {
        const response = await customAxios.post(`/api/members/v1/inquiry/center`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
// 핏에이블 문의하기 등록
export const postFitAbleInquiry = async (data) => {
    try {
        const response = await multipartAxios.post(`/api/members/v1/inquiry/fitable`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 핏에이블 문의하기 리스트 조회
export const getFitAbleInquiryList = async () => {
    try {
        const response = await customAxios.get(`/api/members/v1/inquiry/fitable`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 핏에이블 문의하기 삭제
export const deleteFitAbleInquiry = async (id) => {
    try {
        const response = await customAxios.delete(`/api/members/v1/inquiry/fitable/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get 주문상품 list
export const getOrderList = async id => {
    try {
      const response = await customAxios.get(
        `/api/members/stores/v1/orders?page=0&size=100`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  