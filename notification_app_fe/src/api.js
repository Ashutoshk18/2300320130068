import axios from "axios";

const BASE_URL = "http://4.224.186.213/evaluation-service/notifications";

const TEMP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhc2h1dG9zaC4yM2IwMTMxMDExQGFiZXMuYWMuaW4iLCJleHAiOjE3ODA5OTI0NzEsImlhdCI6MTc4MDk5MTU3MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjE3MWRiN2IwLTVhYzktNDkzMi1iZTBjLWIwODcxZTllZDNkNiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFzaHV0b3NoIGt1bWFyIiwic3ViIjoiODlkY2VmZWQtMjBkYS00ZTczLTk1MmUtNmUwMTc4OTU5YWUwIn0sImVtYWlsIjoiYXNodXRvc2guMjNiMDEzMTAxMUBhYmVzLmFjLmluIiwibmFtZSI6ImFzaHV0b3NoIGt1bWFyIiwicm9sbE5vIjoiMjMwMDMyMDEzMDA2OCIsImFjY2Vzc0NvZGUiOiJjWHVxaHQiLCJjbGllbnRJRCI6Ijg5ZGNlZmVkLTIwZGEtNGU3My05NTJlLTZlMDE3ODk1OWFlMCIsImNsaWVudFNlY3JldCI6IndxdkVzUlpNUUdIcVlHZngifQ.je0NTqAbBXzMHq_fh9RqUJmwyR2HNmMoQ7djau0Hd_Q";

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
