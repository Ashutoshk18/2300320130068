import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

let accessToken = null;

export async function getAccessToken() {
  try {
    if (accessToken) {
      return accessToken;
    }

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      {
        email: process.env.EMAIL,
        name: process.env.NAME,
        rollNo: process.env.ROLLNO,
        accessCode: process.env.ACCESS_CODE,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
    );

    accessToken = response.data.access_token;

    return accessToken;
  } catch (err) {
    console.error("Authentication Failed:", err.response?.data || err.message);
  }
}
