import axios, { AxiosRequestConfig } from 'axios';
import LocalConfig from '@/config.json';

interface ResponseData<T> {
  data?: T;
  errmsg?: string;
  errno?: number;
  feed: T;
  results: any;
}


const DEFAULT_OPTIONS = {
  baseURL: LocalConfig.AxiosBaseUrl,
  timeout: LocalConfig.AxiosTimeout,
  headers: LocalConfig.AxiosHeader
};

const instance = axios.create(DEFAULT_OPTIONS);

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (thrown) => {
    return Promise.reject(thrown);
  }
);

// 封装 axios
export default async function<T = any>(
  options: AxiosRequestConfig
): Promise<ResponseData<T>> {
  const { url } = options;
  const requestOptions = Object.assign({}, options, {
    method: 'post',
    url
  });

  try {
    const {
      data,
      data: { errno, errmsg }
    } = await instance.request<ResponseData<T>>(requestOptions);
    if (errno) {
      throw new Error(errmsg);
    }

    return data;
  } catch (err) {
    if (err instanceof Error || typeof err === 'string') {
      console.log('error');
    }
    throw err;
  }
}
