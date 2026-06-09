import axios from "axios";
import { BASE_URL, STACKS, LEVELS, PACKAGES } from "./constants.js";
import { getAccessToken } from "./auth.js";

export async function Log(stack, level, packageName, message) {
  try {
    // validation

    if (!STACKS.includes(stack)) {
      throw new Error("Invalid stack");
    }

    if (!LEVELS.includes(level)) {
      throw new Error("Invalid level");
    }

    const allowedPackages = [
      ...PACKAGES.common,
      ...(stack === "backend" ? PACKAGES.backend : PACKAGES.frontend),
    ];

    if (!allowedPackages.includes(packageName)) {
      throw new Error("Invalid package");
    }

    const payload = {
      stack,
      level,
      package: packageName,
      message,
    };

    const token = await getAccessToken();

    const response = await axios.post(BASE_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Logging Middleware Error:",
      error.response?.data || error.message,
    );
  }
}
