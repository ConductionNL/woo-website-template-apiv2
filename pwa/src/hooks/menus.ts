import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useMenus = () => {
    const API: APIService | null = React.useContext(APIContext);

    const getAll = () =>
        useQuery<any, Error>(
            [
                "Menus",
                typeof window !== "undefined" ? window.sessionStorage.getItem("OIDN_NUMBER") : undefined,
            ],
            () => API?.Menus.getAll(),
            {
                onError: (error) => {
                    console.warn(error.message);
                },
                enabled: typeof window !== "undefined",
            },
        );

    return { getAll };
};


