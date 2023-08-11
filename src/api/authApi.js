import customAxios from "./customAxios";

// login api
export const login = async (phone, password) => {
    try {
        const response = await customAxios.post("/api/members/v1/login", { phone, password });
        return response.data;
      } catch (error) {
        console.error("Login failed:", error);
        return error;
      }
};