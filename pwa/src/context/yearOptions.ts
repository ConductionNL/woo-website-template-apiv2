import * as React from "react";
import { GlobalContext } from "./global";
import { TGroupedSelectOption, TSelectOption } from "@conduction/components/lib/components/formFields/select/select";

export interface IYearOptionsContext {
  options: TSelectOption[] | TGroupedSelectOption[];
}

export const defaultYearOptionsContext: IYearOptionsContext = {
  options: [],
};

export const useYearOptionsContext = () => {
  const [globalContext, setGlobalContext] = React.useContext(GlobalContext);
  const yearOptions: IYearOptionsContext = globalContext.yearOptions;

  const setYearOptions = (newFilters: IYearOptionsContext) => {
    setGlobalContext((context) => ({ ...context, yearOptions: { ...globalContext.yearOptions, ...newFilters } }));
  };

  return { yearOptions, setYearOptions };
};
