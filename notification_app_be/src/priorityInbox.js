import axios from "axios";
import { getAccessToken } from "./auth.js";

const PRIORITY_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

//Custom comparator for sorting
function sortComparator(a, b) {
  const weightA = PRIORITY_WEIGHTS[a.Type] || 0;
  const weightB = PRIORITY_WEIGHTS[b.Type] || 0;

  if (weightA !== weightB) {
    return weightB - weightA;
  }

  return new Date(b.Timestamp) - new Date(a.Timestamp);
}

//top n priority notfications
export async function getPriorityInbox(limit = 10) {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error("Could not fetch active authorization token.");

    console.log("Fetching notifications from server...");
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const notifications = response.data.notifications;
    if (!Array.isArray(notifications)) {
      throw new Error("Invalid response format received from server.");
    }

    console.log(
      `Successfully fetched ${notifications.length} raw notifications.`,
    );

    const sortedNotifications = notifications.sort(sortComparator);

    return sortedNotifications.slice(0, limit);
  } catch (error) {
    console.error(
      "Backend Processing Error:",
      error.response?.data || error.message,
    );
    return [];
  }
}
