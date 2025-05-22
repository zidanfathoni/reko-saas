import { apiAdmin } from "./instance";


export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    const response = await apiAdmin.post('/refresh-token', { refreshToken });
    const { data, status } = response;

    if (status === 200 && data?.data?.token) {
      // Simpan refreshToken baru jika diberikan
        if (data.data.token) {
            localStorage.setItem('token', data.data.token);
        }
      if (data.data.refreshToken) {
        localStorage.setItem('refreshToken', data.data.refreshToken);
      }
      return data.data.token; // Mengembalikan accessToken
    }
    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
