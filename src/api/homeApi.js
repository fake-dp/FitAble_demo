import customAxios from "./customAxios";

// home banners api
export const getHomeBanners = async () => {
    try {
      const response = await customAxios.get("/api/members/v1/banners/home"); 
       return response.data;
    } catch (error) {
      throw error;
    }
  }
