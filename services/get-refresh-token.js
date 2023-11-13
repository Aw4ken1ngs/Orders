// Функция getRefresh для получения и сохранения обновленного токена доступа.
export async function getRefreshToken() {
  try {
    const usersEmail = localStorage.getItem('email');
    const response = await fetch(`/api/auth/refresh-token?email=${usersEmail}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Refresh request failed with status: ${response.status}`);
    }

    const refreshResponse = await response.json();
    const { access_token } = refreshResponse;

    localStorage.setItem("access_token", access_token);

    return access_token;
  } catch (error) {
    console.error('Error getting and storing access token:', error);
    throw error;
  }
}