const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:8080";
const rawApiPrefix = import.meta.env.VITE_API_PREFIX?.trim() || "/api/v1";

export const env = {
  apiBaseUrl: rawApiBaseUrl,
  apiPrefix: rawApiPrefix.startsWith("/") ? rawApiPrefix : `/${rawApiPrefix}`,
};

export const apiUrl = `${env.apiBaseUrl}${env.apiPrefix}`;
