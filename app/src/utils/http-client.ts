import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import LocalStorageUtil from "./local-storage";

export interface RequestConfig {
  url: string;
  urlParams?: {
    queryParams?: Record<string, any>;
    pathParams?: Record<string, any>;
  };
  changeQueryParamType?: boolean;
}

export interface RequestOptions {
  useAuth?: boolean;
  silentOnFail?: boolean;
  responseType?: string;
}

export default class HttpClient {
  private axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // REQUEST INTERCEPTOR
    this.axios.interceptors.request.use((config) => {
      if (config.headers["authRequired"]) {
        const token = new LocalStorageUtil().getAuthToken(); // or use env/service injection
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    // RESPONSE INTERCEPTOR
    this.axios.interceptors.response.use(
      (res) => res,
      (error) => {
        console.log("HTTP Error:", error?.response?.status);
        throw error;
      }
    );
  }

  private serializeParams(params: Record<string, any>, changeType = true) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, changeType ? String(v) : v);
      }
    });
    return query.toString();
  }

  private buildUrl(config: RequestConfig) {
    let finalUrl = config.url;

    if (config.urlParams?.pathParams) {
      Object.entries(config.urlParams.pathParams).forEach(([k, v]) => {
        finalUrl = finalUrl.replace(`:${k}`, encodeURIComponent(String(v)));
      });
    }

    const query = config.urlParams?.queryParams
      ? this.serializeParams(config.urlParams.queryParams, config.changeQueryParamType)
      : "";

    return query ? `${finalUrl}?${query}` : finalUrl;
  }

  async request(
    method: "get" | "post" | "put" | "patch" | "delete",
    config: RequestConfig,
    options: RequestOptions = {},
    data?: any
  ): Promise<AxiosResponse> {
    const url = this.buildUrl(config);

    try {
      const axiosConfig: AxiosRequestConfig = {
        method,
        url,
        headers: { authRequired: options.useAuth || false },
      };

      if (options.responseType) axiosConfig.responseType = options.responseType as any;

      if (method !== "get" && method !== "delete") axiosConfig.data = data;

      return await this.axios.request(axiosConfig);
    } catch (err) {
      if (!options.silentOnFail) {
        console.error("Request failed:", err);
      }
      throw err;
    }
  }

  get(config: RequestConfig, options?: RequestOptions) {
    return this.request("get", config, options);
  }

  post(config: RequestConfig, data?: any, options?: RequestOptions) {
    return this.request("post", config, options, data);
  }

  put(config: RequestConfig, data?: any, options?: RequestOptions) {
    return this.request("put", config, options, data);
  }

  patch(config: RequestConfig, data?: any, options?: RequestOptions) {
    return this.request("patch", config, options, data);
  }

  delete(config: RequestConfig, options?: RequestOptions) {
    return this.request("delete", config, options);
  }
}
