import customAxios from "./customAxios";



// get myinfo
export const getMyInfo = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/info");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get mileages
export const getMileages = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/mileages");
        return response.data;
    } catch (error) {
        throw error;
    }
}


