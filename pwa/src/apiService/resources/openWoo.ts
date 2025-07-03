import { IFiltersContext } from "../../context/filters";
import { filtersToQueryParams } from "../../services/filtersToQueryParams";
import { TSendFunction } from "../apiService";
import { AxiosInstance } from "axios";

export const OPEN_WOO_LIMIT = 6;

export default class OpenWoo {
  private _instance: AxiosInstance;
  private _send: TSendFunction;

  constructor(_instance: AxiosInstance, send: TSendFunction) {
    this._instance = _instance;
    this._send = send;
  }

  public getAll = async (filters: IFiltersContext, currentPage: number, limit: number): Promise<any> => {
    let endpoint = `/publications?_limit=${limit}&_page=${currentPage}&_order[@self.published]=desc${filtersToQueryParams(filters)}`;

    // TODO: Uncomment this when filtering on oin is available in the API
    // if (window.sessionStorage.getItem("OIDN_NUMBER")) {
    //   endpoint += `&organization.oin=${window.sessionStorage.getItem("OIDN_NUMBER")}`;
    // }

    const { data } = await this._send(this._instance, "GET", endpoint);

    return data;
  };

  public getOne = async (id: string): Promise<any> => {
    const { data } = await this._send(
      this._instance,
      "GET",
      `/publications/${id}?extend[]=themes&extend[]=@self.schema`,
    );

    return data;
  };

  public getAttachments = async (id: string): Promise<any> => {
    const { data } = await this._send(this._instance, "GET", `/publications/${id}/attachments?_limit=500`);

    return data;
  };

  public getAttachmentsWithLabels = async (id: string, limit: number = 500): Promise<any> => {
    const { data } = await this._send(
      this._instance,
      "GET",
      `/publications/${id}/attachments?_hasLabels=true&_limit=${limit}`,
    );

    return data;
  };

  public getAttachmentsNoLabels = async (
    id: string,
    limit: number,
    currentPage: number,
  ): Promise<any> => {
    const { data } = await this._send(
      this._instance,
      "GET",
      `/publications/${id}/attachments?_noLabels=true&_limit=${limit}&_page=${currentPage}`,
    );

    return data;
  };
}
