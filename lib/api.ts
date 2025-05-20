/**
 * API utility functions for communicating with the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Makes an authenticated API request
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("auth_token");
  
  if (!token) {
    throw new Error("Not authenticated");
  }
  
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}/${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;
    
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.detail || errorJson.message || `Error ${response.status}: ${response.statusText}`;
    } catch {
      errorMessage = errorText || `Error ${response.status}: ${response.statusText}`;
    }
    
    throw new Error(errorMessage);
  }
  
  return await response.json() as T;
}

/**
 * Gets data from the API
 */
export async function getData<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint);
}

/**
 * Posts data to the API
 */
export async function postData<T>(endpoint: string, data: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Updates data via the API
 */
export async function updateData<T>(endpoint: string, data: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * Deletes a resource via the API
 */
export async function deleteData(endpoint: string): Promise<void> {
  await apiRequest(endpoint, {
    method: "DELETE",
  });
} 