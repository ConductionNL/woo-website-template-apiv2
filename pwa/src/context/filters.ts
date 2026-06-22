import * as React from "react";
import { GlobalContext } from "./global";

export interface IFiltersContext {
  _search: string | undefined;
  "publicatiedatum[gte]": string | undefined;
  "publicatiedatum[lte]": string | undefined;
  "@self[schema]": string | undefined;
}

export const defaultFiltersContext: IFiltersContext = {
  _search: "",
  "publicatiedatum[gte]": undefined,
  "publicatiedatum[lte]": undefined,
  "@self[schema]": undefined,
};

export const useFiltersContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);

  const filters: IFiltersContext = globalContext.filters;

  const setFilters = (newFilters: IFiltersContext) => {
    setGlobalContext((oldGlobalContext) => ({ ...oldGlobalContext, filters: newFilters }));
  };

  return { filters, setFilters };
};
