import toast from "react-hot-toast";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { removeFileNameFromUrl } from "../services/FileNameFromUrl";
import { DEFAULT_FOOTER_CONTENT_URL } from "../templates/templateParts/footer/FooterTemplate";

// Resources
import OpenWoo from "./resources/openWoo";
import FooterContent from "./resources/footerContent";
import Markdown from "./resources/markdown";
import AvailableFilters from "./resources/availableFilters";
import MenusApi from "./resources/menus";
import PagesApi from "./resources/pages";

interface PromiseMessage {
  loading?: string;
  success?: string;
}

export type TSendFunction = (
  instance: AxiosInstance,
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  payload?: JSON,
  promiseMessage?: PromiseMessage,
) => Promise<AxiosResponse>;

export default class APIService {
  private getApiBaseUrl(): string {
    const fromSession = window.sessionStorage.getItem("API_BASE_URL") ?? "";
    return fromSession && fromSession.trim().length > 0 ? fromSession : "/api";
  }

  private attachLogging(instance: AxiosInstance): AxiosInstance {
    instance.interceptors.request.use((config) => {
      try {
        const base = config.baseURL ?? window.location.origin;
        const fullUrl = new URL(config.url ?? "", base).toString();
        const method = (config.method ?? "get").toUpperCase();
        // eslint-disable-next-line no-console
        console.info(`[API Request] ${method} ${fullUrl}`);
      } catch (_) {}
      return config;
    });
    instance.interceptors.response.use((response) => {
      const upstreamUrl = response.headers?.["x-upstream-url"] as string | undefined;
      const upstreamStatus = response.headers?.["x-upstream-status"] as string | undefined;
      if (upstreamUrl || upstreamStatus) {
        // eslint-disable-next-line no-console
        console.info(`[API Upstream] url=${upstreamUrl ?? "-"} status=${upstreamStatus ?? String(response.status)}`);
      }
      return response;
    });
    return instance;
  }
  public get BaseClient(): AxiosInstance {
    const instance = axios.create({
      baseURL: this.getApiBaseUrl(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return this.attachLogging(instance);
  }

  public get AvailableFiltersClient(): AxiosInstance {
    const instance = axios.create({
      baseURL: this.getApiBaseUrl(),
      headers: {
        Accept: "application/json+aggregations",
        "Content-Type": "application/json",
      },
    });
    return this.attachLogging(instance);
  }

  public get FooterContentClient(): AxiosInstance {
    return axios.create({
      baseURL: removeFileNameFromUrl(window.sessionStorage.getItem("FOOTER_CONTENT") ?? DEFAULT_FOOTER_CONTENT_URL),
    });
  }

  public get MarkdownClient(): AxiosInstance {
    return axios.create({
      baseURL: window.sessionStorage.getItem("BASE_URL") ?? undefined,
      headers: {
        Accept: "application/vnd.github.html",
      },
    });
  }

  public get OpenWoo(): OpenWoo {
    return new OpenWoo(this.BaseClient, this.Send);
  }

  public get AvailableFilters(): AvailableFilters {
    return new AvailableFilters(this.AvailableFiltersClient, this.Send);
  }

  public get FooterContent(): FooterContent {
    return new FooterContent(this.FooterContentClient, this.Send);
  }

  public get Markdown(): Markdown {
    return new Markdown(this.MarkdownClient, this.Send);
  }

  public get Menus(): MenusApi {
    return new MenusApi(this.BaseClient, this.Send);
  }

  public get Pages(): PagesApi {
    return new PagesApi(this.BaseClient, this.Send);
  }

  // Send method
  public Send: TSendFunction = (instance, method, endpoint, payload, promiseMessage) => {
    const _payload = JSON.stringify(payload);

    switch (method) {
      case "GET":
        const response = instance.get(endpoint);

        response.catch((err) => toast.error(err.message));

        return response;

      case "POST":
        return toast.promise(instance.post(endpoint, _payload), {
          loading: promiseMessage?.loading ?? "Creating item...",
          success: promiseMessage?.success ?? "Succesfully created item",
          error: (err: Error) => err.message,
        });

      case "PUT":
        return toast.promise(instance.put(endpoint, _payload), {
          loading: promiseMessage?.loading ?? "Updating item...",
          success: promiseMessage?.success ?? "Succesfully updated item",
          error: (err: Error) => err.message,
        });

      case "DELETE":
        return toast.promise(instance.delete(endpoint), {
          loading: promiseMessage?.loading ?? "Deleting item...",
          success: promiseMessage?.success ?? "Succesfully deleted item",
          error: (err: Error) => err.message,
        });
    }
  };
}
