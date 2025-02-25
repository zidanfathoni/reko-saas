import { Setting } from '@/config';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Storage } from '@/lib/storage';
import { TuserData } from '@/types';
import { refreshToken } from './refresh-token';
import { toast } from '@/components/atoms/use-toast';
import { Connections } from '@/config/connections';
import nProgress from 'nprogress';

axios.defaults.withCredentials = true;

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API, // gunakan variabel lingkungan untuk base URL
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*", // tambahkan header ini jika ada CORS
  },
  withCredentials: true, // Agar cookie bisa dikirim dan diterima
});
const apiAdmin: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API + '/admin', // gunakan variabel lingkungan untuk base URL
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*", // tambahkan header ini jika ada CORS
  },
  withCredentials: true, // Agar cookie bisa dikirim dan diterima
});

const api2: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MAYAR, // gunakan variabel lingkungan untuk base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => {
    nProgress.done();
    return res;
  },
  async (err) => {
    nProgress.done();

    const { response, code } = err;

    if (code && code == 'ERR_NETWORK') {
      toast({
        title: 'Network Error',
        variant: 'destructive',
        description: "Can't connect to server. Try again later.",
      });
    }

    if (response) {
      switch (response.status) {
        case 400:
          toast({
            title: 'Bad Request',
            variant: 'destructive',
            description: response.data?.message ?? 'Your request is incorrect.',
          });
          break;
        case 401:
          if (!err.config.sent) {
            err.config.sent = true;
            const newToken = await refreshToken();
            if (newToken) {
              err.config.headers = {
                ...err.config.headers,
                Authorization: `Bearer ${newToken}`,
              };
            }
            return axios(err.config);
          }
          break;
        case 403:
          toast({
            title: 'Access Denied',
            variant: 'destructive',
            description: response.data?.message ?? 'The resource has limited access.',
          });
          break;
        case 404:
          toast({
            title: 'Not Found',
            variant: 'destructive',
            description: response.data?.message ?? 'The resource did not exist.',
          });
          break;
        case 500:
          toast({
            title: 'Server Error',
            variant: 'destructive',
            description: response.data?.message ?? 'Internal server error.',
          });
          break;
        default:
          toast({
            title: 'Request Error',
            variant: 'destructive',
            description: response.data?.message ?? 'Something wrong with the request.',
          });
          break;
      }
    }
    throw err;
  },
);
apiAdmin.interceptors.response.use(
  (res) => {
    nProgress.done();
    return res;
  },
  async (err) => {
    nProgress.done();

    const { response, code } = err;

    if (code && code == 'ERR_NETWORK') {
      toast({
        title: 'Network Error',
        variant: 'destructive',
        description: "Can't connect to server. Try again later.",
      });
    }

    if (response) {
      switch (response.status) {
        case 400:
          toast({
            title: 'Bad Request',
            variant: 'destructive',
            description: response.data?.message ?? 'Your request is incorrect.',
          });
          break;
        case 401:
          if (!err.config.sent) {
            err.config.sent = true;
            const newToken = await refreshToken();
            if (newToken) {
              err.config.headers = {
                ...err.config.headers,
                Authorization: `Bearer ${newToken}`,
              };
            }
            return axios(err.config);
          }
          break;
        case 403:
          toast({
            title: 'Access Denied',
            variant: 'destructive',
            description: response.data?.message ?? 'The resource has limited access.',
          });
          break;
        case 404:
          toast({
            title: 'Not Found',
            variant: 'destructive',
            description: response.data?.message ?? 'The resource did not exist.',
          });
          break;
        case 500:
          toast({
            title: 'Server Error',
            variant: 'destructive',
            description: response.data?.message ?? 'Internal server error.',
          });
          break;
        default:
          toast({
            title: 'Request Error',
            variant: 'destructive',
            description: response.data?.message ?? 'Something wrong with the request.',
          });
          break;
      }
    }
    throw err;
  },
);

api2.interceptors.response.use(
  (res) => {
    nProgress.done();
    return res;
  },
  async (err) => {
    nProgress.done();

    const { response, code } = err;

    if (code && code == 'ERR_NETWORK') {
      toast({
        title: 'Network Error',
        variant: 'destructive',
        description: "Can't connect to server. Try again later.",
      });
    }

    if (response) {
      switch (response.status) {
        case 400:
          toast({
            title: 'Bad Request',
            variant: 'destructive',
            description: response.data?.message ?? 'Your request is incorrect.',
          });
          break;
        case 401:
          if (!err.config.sent) {
            err.config.sent = true;
            const newToken = await refreshToken();
            if (newToken) {
              err.config.headers = {
                ...err.config.headers,
                Authorization: `Bearer ${newToken}`,
              };
            }
            return axios(err.config);
          }
          break;
        case 403:
          toast({
            title: 'Access Denied',
            variant: 'destructive',
            description: response.data?.message ?? 'The resource has limited access.',
          });
          break;
        case 404:
          toast({
            title: 'Not Found',
            variant: 'destructive',
            description: response.data?.message ?? 'The resource did not exist.',
          });
          break;
        case 500:
          toast({
            title: 'Server Error',
            variant: 'destructive',
            description: response.data?.message ?? 'Internal server error.',
          });
          break;
        default:
          toast({
            title: 'Request Error',
            variant: 'destructive',
            description: response.data?.message ?? 'Something wrong with the request.',
          });
          break;
      }
    }
    throw err;
  },
);



export { api, apiAdmin, api2 };
