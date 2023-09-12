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

// home qr banners api
export const getHomeQrBanners = async () => {
    try {
      const response = await customAxios.get("/api/members/v1/banners/QR");
        return response.data;
    } catch (error) {
      throw error;
    }
  }

// home baners count api
export const addHomeBannersCount = async (id) => {
    try {
      const response = await customAxios.post("/api/members/v1/banners/view", {id});
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

// center Ticket type
export const getTicketType = async (id, type) => {
  try {
    const response = await customAxios.get(`/api/members/v1/centers/${id}/tickets/type/${type}`); 
     return response.data;
  } catch (error) {
    throw error;
  }
}

// center trainers
export const getTrainers = async (id) => {
  try {
    const response = await customAxios.get(`/api/members/v1/centers/${id}/trainers`); 
     return response.data;
  } catch (error) {
    throw error;
  }
}

// center detail trainers
export const getDetailTrainers = async (centerId, trainerId) => {
  try {
    const response = await customAxios.get(`/api/members/v1/centers/${centerId}/trainers/${trainerId}`); 
     return response.data;
  } catch (error) {
    throw error;
  }
}

// center trainers name
export const getTrainersName = async (centerId) => {
  try {
    const response = await customAxios.get(`/api/members/v1/centers/${centerId}/trainers/names`);
      return response.data;
  } catch (error) {
    throw error;
  }
}

// consulting api
export const postConsulting = async (data) => {
  try {
    const response = await customAxios.post(`/api/members/v1/consulting`, data); 
     return response.data;
  } catch (error) {
    throw error;
  }
}

// pushAlarm history api
export const getPushAlarmHistory = async () => {
  try {
    const response = await customAxios.get(`/api/members/v1/pushAlarm/history`); 
     return response.data;
  } catch (error) {
    throw error;
  }
}