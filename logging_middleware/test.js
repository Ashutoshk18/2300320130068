import { Log } from "./src/logger.js";

const result = await Log(
  "backend",
  "info",
  "service",
  "Testing logging middleware",
);

console.log(result);
