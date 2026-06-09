import axios from "axios";

const BASE_URL = "http://4.224.186.213/evaluation-service/notifications";

const TEMP_TOKEN = "YOUR_JWT_TOKEN_HERE";

export const fetchNotifications = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${TEMP_TOKEN}`,
      },
      params: params,
    });
    return response.data.notifications || [];
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    throw error;
  }
};
