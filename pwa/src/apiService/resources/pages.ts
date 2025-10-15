import { AxiosInstance } from "axios";
import { TSendFunction } from "../apiService";

export default class PagesApi {
    private _instance: AxiosInstance;
    private _send: TSendFunction;

    constructor(_instance: AxiosInstance, send: TSendFunction) {
        this._instance = _instance;
        this._send = send;
    }

    public getAll = async (): Promise<any> => {
        const { data } = await this._send(this._instance, "GET", "/pages?_limit=50");

        return (data as any)?.results ?? data;
    };
}


