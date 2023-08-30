import customAxios from "./customAxios";


// get mileages
export const getMileages = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/mileages");
        return response.data;
    } catch (error) {
        throw error;
    }
}
