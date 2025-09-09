import "./src/styling/index.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Set theme class ASAP during bootstrap so CSS variables apply immediately
if (typeof document !== "undefined") {
  const themeClass = process.env.GATSBY_NL_DESIGN_THEME_CLASSNAME || "conduction-theme";
  document.documentElement.className = themeClass;
  document.body.className = themeClass;
}

export const wrapRootElement = ({ element }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 1,
        retryDelay: 2000,
        staleTime: 1000 * 60 * 60, // one hour
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {element}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
