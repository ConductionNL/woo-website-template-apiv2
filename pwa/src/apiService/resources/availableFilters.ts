import { TSendFunction } from "../apiService";
import { AxiosInstance } from "axios";

export default class AvailableFilters {
  private _instance: AxiosInstance;
  private _send: TSendFunction;

  constructor(_instance: AxiosInstance, send: TSendFunction) {
    this._instance = _instance;
    this._send = send;
  }

  public getCategories = async (): Promise<any> => {
    let endpoint = "/search/publications?_queries[]=category";

    const { data } = await this._send(this._instance, "GET", endpoint);

    return data;
  };
}
