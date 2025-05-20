/**
 * API Client for connecting to the backend
 */

const API_URL = "http://localhost:8000/api";

/**
 * Login to the admin panel
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{token: string, user: Object}>}
 */
export async function loginAdmin(email, password) {
  try {
    // For admin login, we'll use Django's admin login form
    const formData = new FormData();
    formData.append('username', email); // Django uses username field
    formData.append('password', password);
    
    const response = await fetch(`http://localhost:8000/admin/login/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': await getCsrfToken(),
      },
      body: formData,
      credentials: 'include', // Important for session cookies
    });

    if (!response.ok) {
      throw new Error('Invalid credentials. Please try again.');
    }
    
    // If successful, we'll redirect to admin
    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

/**
 * Get CSRF token from Django
 */
async function getCsrfToken() {
  try {
    const response = await fetch('http://localhost:8000/admin/login/', {
      method: 'GET',
      credentials: 'include',
    });
    
    const text = await response.text();
    const match = text.match(/name="csrfmiddlewaretoken" value="([^"]+)"/);
    
    if (match && match[1]) {
      return match[1];
    }
    
    throw new Error('CSRF token not found');
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    throw error;
  }
}

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options
 * @returns {Promise<any>}
 */
export async function apiRequest(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}/${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // For Django session auth
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorJson.message || `Error ${response.status}`;
      } catch {
        errorMessage = errorText || `Error ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }
    
    // Handle responses with no content
    if (response.status === 204) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * Check if the user is logged in
 * @returns {boolean}
 */
export function isLoggedIn() {
  // This needs server-side implementation with Django session
  return false;
}

/**
 * Logout the user
 */
export async function logout() {
  try {
    await fetch('http://localhost:8000/admin/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': await getCsrfToken(),
      },
    });
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
} 