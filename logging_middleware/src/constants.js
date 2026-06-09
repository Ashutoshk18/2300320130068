export const BASE_URL = "http://4.224.186.213/evaluation-service/logs";

export const LEVELS = ["debug", "info", "warn", "error", "fatal"];

export const STACKS = ["backend", "frontend"];

export const PACKAGES = {
  backend: [
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service",
  ],

  frontend: ["api", "component", "hook", "page", "state", "style"],

  common: ["auth", "config", "middleware", "utils"],
};
