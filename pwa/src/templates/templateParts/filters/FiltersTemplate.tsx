import * as React from "react";
import * as styles from "./FiltersTemplate.module.css";
import ResultsDisplaySwitch from "../../../components/resultsDisplaySwitch/ResultsDisplaySwitch";
import _ from "lodash";
import qs from "qs";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import { InputText, SelectSingle } from "@conduction/components";
import { IFiltersContext, defaultFiltersContext, useFiltersContext } from "../../../context/filters";
import { Button } from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { filtersToUrlQueryParams } from "../../../services/filtersToQueryParams";
import { navigate } from "gatsby";
import { useGatsbyContext } from "../../../context/gatsby";
import { useAvailableFilters } from "../../../hooks/availableFilters";
import { usePaginationContext } from "../../../context/pagination";
import { useCategoriesContext } from "../../../context/categoryOptions";
import { useYearOptionsContext } from "../../../context/yearOptions";

interface FiltersTemplateProps {
  isLoading: boolean;
}

export const FiltersTemplate: React.FC<FiltersTemplateProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const { setPagination } = usePaginationContext();
  const { gatsbyContext } = useGatsbyContext();
  const { filters, setFilters } = useFiltersContext();
  const { categoryOptions, setCategoryOptions } = useCategoriesContext();
  const { yearOptions, setYearOptions } = useYearOptionsContext();
  const [queryParams, setQueryParams] = React.useState<IFiltersContext>(defaultFiltersContext);
  const [categoryParams, setCategoryParams] = React.useState<any>();
  const filterTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const watcher = watch();

  const url = gatsbyContext.location.search;
  const [, params] = url.split("?");
  const parsedParams = qs.parse(params);

  const getCategories = useAvailableFilters().getCategories();

  const handleSetFormValues = (params: any): void => {
    const basicFields: string[] = ["_search", "category"];
    basicFields.forEach((field) => setValue(field, params[field]));

    setValue(
      "year",
      yearOptions.options.find((year: any) => {
        return year.value === params.year;
      }),
    );
  };

  const handleSetSelectFormValues = (params: any): void => {
    getCategories.isSuccess &&
      setValue(
        "category",
        categoryOptions.options.find((option: any) => option.value === params.categorie?.replace(/_/g, " ")),
      );
  };

  const onSubmit = (data: any) => {
    setFilters({
      _search: data._search,
      "publicatiedatum[gte]": data.year?.after,
      "publicatiedatum[lte]": data.year?.before,
      "@self[schema]": data.category?.value,
    });
  };

  React.useEffect(() => {
    if (filterTimeout.current) clearTimeout(filterTimeout.current);

    filterTimeout.current = setTimeout(() => onSubmit(watcher), 500);
  }, [watcher]);

  React.useEffect(() => {
    if (_.isEmpty(parsedParams)) return;
    setCategoryParams(parsedParams);
    handleSetFormValues(parsedParams);
  }, []);

  React.useEffect(() => {
    if (_.isEmpty(categoryOptions)) return;
    if (_.isEmpty(categoryParams)) return;

    handleSetSelectFormValues(categoryParams);
  }, [categoryOptions]);

  React.useEffect(() => {
    //Prevents loop that puts user at top of page after scroll
    if (_.isEqual(filters, queryParams)) return;

    setQueryParams(filters);
    const categoryLabel = categoryOptions.options
      .find((option: any) => option.value === filters["@self[schema]"])
      ?.label.replace(/\s+/g, "_");

    navigate(`/${filtersToUrlQueryParams({ ...filters, "@self[schema]": categoryLabel })}`);
    setPagination({ currentPage: 1 });
  }, [filters]);

  React.useEffect(() => {
    if (!getCategories.isSuccess || !getCategories.data || !getCategories.data.facets) return;

    // Enrich facets with titles when available (compatible with different API payloads)
    const response: any = getCategories.data;
    const facetsConfig: any =
      response?.availableFacets ?? response?.facetsConfig ?? response?.facets_config ?? response?.facetable;

    const rawFacets: any = response?.facets?.facets ?? response?.facets;
    let facets: any = rawFacets;

    if (facets) {
      const facetsWithTitles: Record<string, any> = {};
      Object.entries(facets as Record<string, any>).forEach(([key, value]) => {
        if (key === "@self" && value && typeof value === "object") {
          facetsWithTitles[key] = {} as Record<string, any>;
          Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
            facetsWithTitles[key][subKey] = {
              ...(subValue as Record<string, any>),
              title: facetsConfig?.object_fields?.[subKey]?.title || subKey,
            };
          });
        } else {
          facetsWithTitles[key] = {
            ...(value as Record<string, any>),
            title: facetsConfig?.object_fields?.[key]?.title || key,
          };
        }
      });

      facets = facetsWithTitles;
    } else {
      console.warn("No facets in response");
    }

    if (facets?._schema?.data?.buckets) {
      facets = { categorie: facets._schema.data?.buckets };
    }

    const categoriesWithData = Object.values(facets as Record<string, any>)
      ?.map((facet: any) =>
        facet
          ?.map((category: any) =>
            (() => {
              const id = category.value;
              const name = category.label ?? id;
              if (!name) return null;

              return {
                label: _.upperFirst(String(name).toLowerCase()),
                value: String(id),
              };
            })(),
          )
          .filter(Boolean),
      )
      .flat();

    const uniqueOptions: any[] = _.orderBy(_.uniqBy(categoriesWithData, "value"), "label", "asc");

    if (_.isEqual(uniqueOptions, categoryOptions.options)) return;

    setCategoryOptions({ options: uniqueOptions });

    const yearBuckets: any[] =
      response?.facets?.publicatiedatum?.data?.buckets ?? response?.facets?.publicatiedatum?.buckets;

    if (yearBuckets) {
      const availableYears: number[] = (yearBuckets as any[])
        .map((b: any) => parseInt((b.value ?? b.key ?? "").toString().substring(0, 4), 10))
        .filter(Boolean);

      const dynamicYears = availableYears
        .map((year) => ({
          label: `${year}`,
          value: `${year}`,
          before: `${year + 1}-01-01T00:00:00Z`,
          after: `${year - 1}-12-31T23:59:59Z`,
        }))
        .sort((a, b) => Number(b.value) - Number(a.value));

      if (!_.isEqual(dynamicYears, yearOptions)) {
        setYearOptions({ options: dynamicYears });

        if (categoryParams?.year) {
          setValue(
            "year",
            dynamicYears.find((y: any) => y.value === categoryParams.year),
          );
        }
      }
    }
  }, [getCategories.isSuccess, getCategories.data]);

  return (
    /*
     * #filters is used as an anchor by the ResultsTemplate skip-link so users
     * can jump straight to the filter controls.
     */
    <div id="filters" className={styles.container}>
      {/*
       * role="region" + aria-label turns the form into a named landmark so
       * screen-reader users can navigate to it directly from the landmarks menu.
       */}
      <form role="region" aria-label={t("Filters")} onSubmit={handleSubmit(onSubmit)} className={styles.form}>

        {/*
         * Floating-label pattern — same structure for every field:
         *
         *   <div floatingLabelWrapper [hasValue]>   ← position:relative anchor
         *     <label floatingLabel>…</label>         ← sits at top:50% (placeholder
         *                                               position) by default; slides
         *                                               to top:0 (border) on focus or
         *                                               when the field has a value
         *     <InputText | SelectSingle />
         *   </div>
         *
         * hasValue is added by watching the react-hook-form watcher so the label
         * stays floated after the user leaves the field (CSS :focus-within alone
         * would drop it back down when the field loses focus).
         *
         * placeholder is kept as " " / "" so the native placeholder text does
         * not compete visually with the floating label in the default state.
         *
         * ariaLabel on each control provides the programmatic label association
         * for assistive technology (WCAG 1.3.1).
         * clearIndicatorAttributes adds an aria-label to the react-select clear
         * button, which has no visible text (WCAG 1.1.1).
         */}

        <div className={`${styles.floatingLabelWrapper}${watcher._search ? ` ${styles.hasValue}` : ""}`}>
          <label className={styles.floatingLabel}>{t("Search")}</label>
          <InputText
            name="_search"
            placeholder=" "
            defaultValue={filters._search}
            ariaLabel={t("Search")}
            {...{ register, errors }}
          />
        </div>

        <div
          className={`${styles.floatingLabelWrapper}${watcher.year ? ` ${styles.hasValue}` : ""}`}
        >
          <label htmlFor="year-filter" className={styles.floatingLabel}>
            {t("Year")}
          </label>
          <SelectSingle
            id="year-filter"
            options={yearOptions.options}
            name="year"
            placeholder=""
            isClearable
            defaultValue={yearOptions.options.find((year: any) => {
              return year.after === filters["publicatiedatum[gte]"] && year.before === filters["publicatiedatum[lte]"];
            })}
            {...{ register, errors, control }}
            ariaLabel={t("Select year")}
            clearIndicatorAttributes={{
              "aria-label": t("Clear selection"),
            }}
          />
        </div>

        {getCategories.isLoading && <Skeleton height="50px" />}
        {getCategories.isSuccess && (
          <div
            className={`${styles.floatingLabelWrapper}${watcher.category ? ` ${styles.hasValue}` : ""}`}
          >
            <label htmlFor="category-filter" className={styles.floatingLabel}>
              {t("Category")}
            </label>
            <SelectSingle
              id="category-filter"
              options={categoryOptions.options}
              name="category"
              placeholder=""
              defaultValue={
                categoryOptions.options &&
                categoryOptions.options.find((option: any) => option.value === filters["@self[schema]"])
              }
              isClearable
              disabled={getCategories.isLoading}
              {...{ register, errors, control }}
              ariaLabel={t("Select category")}
              clearIndicatorAttributes={{
                "aria-label": t("Clear selection"),
              }}
            />
          </div>
        )}

        <Button
          type="submit"
          className={styles.button}
          disabled={isLoading}
          aria-label={!isLoading ? t("Search") : t("Loading results")}
        >
          <FontAwesomeIcon icon={!isLoading ? faMagnifyingGlass : faSpinner} /> {!isLoading && t("Search")}
        </Button>
      </form>

      {/* Tile / table view toggle, rendered outside the form so it is not submitted */}
      <ResultsDisplaySwitch displayKey="landing-results" />
    </div>
  );
};
