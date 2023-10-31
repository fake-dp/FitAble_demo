import customAxios from "./customAxios";

// 푸시 알람 설정
export const putPushAlarm = async ({isOn, fcmToken}) => {
    try {
        const response = await customAxios.put("/api/members/v1/pushAlarm",{isOn, fcmToken});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 알림 설정
export const putPushMarketing = async (isOn) => {
    try {
        const response = await customAxios.put("/api/members/v1/marketing",{isOn});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 스토어 마케팅 알림설정
export const putStoreMarketing = async (isOn) => {
    try {
        const response = await customAxios.put("/api/members/v1/storeMarketing",{isOn});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 읽지 않은 알림 존재 여부 조회
export const getUnreadPush = async () => {
    try {
        const response = await customAxios.get("/api/members/v1/pushAlarm/unRead/exist");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 알림 읽기
export const postReadPushAlarm = async (alarmId) => {
    try {
        const response = await customAxios.post("/api/members/v1/pushAlarm/read",{alarmId});
        return response.data;
    } catch (error) {
        throw error;
    }
}