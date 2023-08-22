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

// center search
export const getSearchCenter = async (search) => {
    try {
      const response = await customAxios.get(`/api/members/v1/centers?searchTerm=${search}`); 
       return response.data;
    } catch (error) {
      throw error;
    }
  }

// center search id
export const getDetailSearchCenter = async (id) => {
  try {
    const response = await customAxios.get(`/api/members/v1/centers/${id}`); 
     return response.data;
  } catch (error) {
    throw error;
  }
}