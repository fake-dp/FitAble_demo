import customAxios from "./customAxios";

export const login = async (phone, password) => {
    try {
        const response = await customAxios.post("/api/members/v1/login", {
            phone,
            password,
        });

        if (response.data && response.data.isUseApp) {
            // 로그인 성공
            return response.data; // 로그인 성공 시 응답 데이터 반환
        } else {
            // 로그인 실패
            throw new Error("로그인 실패"); // 로그인 실패 시 에러 발생
        }
    } catch (error) {
        // 에러 발생 시 에러 객체 반환
        return error;
    }
};
