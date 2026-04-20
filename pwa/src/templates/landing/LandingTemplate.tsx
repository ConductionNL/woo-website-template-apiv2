import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import Skeleton from "react-loading-skeleton";
import { Page, PageContent } from "@utrecht/component-library-react/dist/css-module";
import { FiltersTemplate } from "../templateParts/filters/FiltersTemplate";
import { ResultsDisplayTemplate } from "../templateParts/resultsDisplayTemplate/ResultsDisplayTemplate";
import { JumbotronTemplate } from "../jumbotronTemplate/JumbotronTemplate";
import { useOpenWoo } from "../../hooks/openWoo";
import { useFiltersContext } from "../../context/filters";
import { QueryClient } from "react-query";
import { Pagination } from "@conduction/components";
import { usePaginationContext } from "../../context/pagination";
import { useTranslation } from "react-i18next";
import { useQueryLimitContext } from "../../context/queryLimit";
import { PaginationLimitSelectComponent } from "../../components/paginationLimitSelect/PaginationLimitSelect";

export const LandingTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useFiltersContext();
  const { pagination, setPagination } = usePaginationContext();
  const { queryLimit, setQueryLimit } = useQueryLimitContext();

  const queryClient = new QueryClient();
  const getItems = useOpenWoo(queryClient).getAll(filters, pagination.currentPage, queryLimit.openWooObjectsQueryLimit);

  const [statusMessage, setStatusMessage] = React.useState<string>("");

  React.useEffect(() => {
    if (queryLimit.openWooObjectsQueryLimit === queryLimit.previousOpenWooObjectsQueryLimit) return;

    setPagination({ currentPage: 1 });
    setQueryLimit({ ...queryLimit, previousOpenWooObjectsQueryLimit: queryLimit.openWooObjectsQueryLimit });
  }, [queryLimit.openWooObjectsQueryLimit]);

  React.useEffect(() => {
    if (getItems.isLoading) {
      setStatusMessage(t("Loading results"));
    } else if (getItems.data?.results?.length === 0) {
      setStatusMessage(t("No results found"));
    } else if (getItems.data?.results?.length) {
      const currentPageResults = getItems.data.results.length;
      const currentPage = getItems.data.page || pagination.currentPage;
      const totalPages = getItems.data.pages;

      // If we have pagination info (multiple pages), provide context
      if (totalPages && totalPages > 1) {
        const itemsPerPage = queryLimit.openWooObjectsQueryLimit;
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = (currentPage - 1) * itemsPerPage + currentPageResults;

        // Handle single result on a page (e.g., "Result 19, on page 4 of 4")
        if (startItem === endItem) {
          setStatusMessage(`${t("Result")} ${startItem}, ${t("on page")} ${currentPage} ${t("of")} ${totalPages}`);
        } else {
          // Multiple results on page (e.g., "Results 1 to 6, on page 1 of 4")
          setStatusMessage(
            `${t("Results")} ${startItem} ${t("to")} ${endItem}, ${t("on page")} ${currentPage} ${t("of")} ${totalPages}`,
          );
        }
      } else {
        // Single page, just show count
        setStatusMessage(`${currentPageResults} ${currentPageResults === 1 ? t("result found") : t("results found")}`);
      }
    }
  }, [getItems.isLoading, getItems.data, t, pagination.currentPage, queryLimit.openWooObjectsQueryLimit]);

  return (
    <>
      <JumbotronTemplate />

      <Page>
        <PageContent className={styles.container}>
          <FiltersTemplate isLoading={getItems.isLoading} />

          {/* Persistent status announcement for screen readers */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
          >
            {statusMessage}
          </div>

          {getItems.data?.results?.length === 0 && !getItems.isLoading && <span>{t("No results found")}.</span>}

          {getItems.data?.results && getItems.data?.results?.length > 0 && (
            <div id="mainContent">
              {getItems.isFetching ? (
                <Skeleton height={"200px"} />
              ) : (
                <ResultsDisplayTemplate displayKey="landing-results" requests={getItems.data.results} schemas={getItems.data["@self"]?.schemas} />
              )}
              <div role="region" aria-label={t("Pagination")} className={styles.pagination}>
                <Pagination
                  ariaLabels={{
                    pagination: t("Pagination"),
                    previousPage: t("Previous page"),
                    nextPage: t("Next page"),
                    page: t("Page"),
                  }}
                  totalPages={getItems.data.pages}
                  currentPage={getItems.data.page}
                  setCurrentPage={(page: any) => setPagination({ currentPage: page })}
                />
                <PaginationLimitSelectComponent queryLimitName={"openWooObjectsQueryLimit"} />
              </div>
            </div>
          )}
          {getItems.isLoading && !getItems.data && <Skeleton height={"200px"} />}
        </PageContent>
      </Page>
    </>
  );
};
