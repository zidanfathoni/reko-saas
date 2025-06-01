import { api, apiAdmin } from "./instance";
import { Storage } from "@/lib/storage";


export const refreshToken = async (): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append('refresh_token', Storage.get('local', 'refreshToken') || '');
        console.log("Refreshing token...");

        const refreshToken = Storage.get('local', 'refreshToken');
        if (!refreshToken) {
            console.error("No refresh token found in local storage.");
            return null; // Tidak ada refresh token, tidak bisa refresh
        }



        const response = await api.post('/auth/refresh-token',
            formData,
        );
        const { data, status } = response;
        console.log("Response from refresh token:", data);

        if (status === 200 && data?.data?.token) {
            // Simpan refreshToken baru jika diberikan

            const cookies = response.headers['set-cookie'];
            if (cookies) {
                Storage.set('cookie', 'token', cookies.find((cookie: string) => cookie.includes('token')));
                Storage.set('cookie', 'refreshToken', cookies.find((cookie: string) => cookie.includes('refreshToken')));
                Storage.set('cookie', 'path', cookies.find((cookie: string) => cookie.includes('path')));
            }
            Storage.set('local', 'token', response.data.data.token);
            Storage.set('local', 'refreshToken', response.data.data.refreshToken);
            Storage.set('local', 'path', response.data.data.path);
            return data.data.token; // Mengembalikan accessToken
        }
        return null;
    } catch (error) {
        console.error("Error refreshing token:", error);
        Storage.clearAll('local');
        Storage.clearAll('cookie');
        return null;
    }
};
