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
    const endpoint =
      "/publications?_limit=20&_page=1&_facetable=true" +
      "&_facets[@self][schema][type]=terms" +
      "&_facets[@self][register][type]=terms" +
      "&_facets[@self][published][type]=date_histogram" +
      "&_facets[@self][published][interval]=year";
    const { data } = await this._send(this._instance, "GET", endpoint);
    return data;
  };
}
