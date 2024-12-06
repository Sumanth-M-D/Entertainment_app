import { API_BASE_URL } from "../config/config";

export default async function apiRequest(method, endpoint, query, body = {}) {
  const url = `${API_BASE_URL}/${endpoint}&${query}`;

  const options = {
    Headers: {
      "Content-Type": "application/json",
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to fetch data: " + response.message);
  }

  const data = await response.json();
  return data;
}
