const baseUrl = import.meta.env.VITE_API_URL;

async function fetchWithAuth(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401 && !options._retry) {
    const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      return fetchWithAuth(endpoint, { ...options, _retry: true });
    } else {
      throw new Error("Session expired. Please log in again.");
    }
  }

  return response;
}

async function fetchApi(endpoint, options = {}) {
  return fetch(`${baseUrl}${endpoint}`, options);

}

export {fetchWithAuth, fetchApi}