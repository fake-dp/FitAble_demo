import customAxios from "./customAxios";

// login api
export const login = async (phone, password) => {
    try {
        const response = await customAxios.post("/api/members/v1/login", { phone, password });
        return response.data;
      } catch (error) {
        console.log("Login failed:", error.response.data);
        throw error.response.data;
      }
};

// Join api
export const joinInfo = async (data) => {
  try {
      const response = await customAxios.post("/api/members/v1/join", data);
      return response.data;
  } catch (error) {
      throw error;
  }
}


// put update myinfo
export const upDateMyInfo = async (data) => {
  try {
      const response = await customAxios.put("/api/members/v1/info", data);
      return response.data;
  } catch (error) {
      throw error;
  }
}