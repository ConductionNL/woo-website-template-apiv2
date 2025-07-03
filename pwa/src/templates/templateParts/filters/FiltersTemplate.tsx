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

interface FiltersTemplateProps {
  isLoading: boolean;
}

export const FiltersTemplate: React.FC<FiltersTemplateProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const { setPagination } = usePaginationContext();
  const { gatsbyContext } = useGatsbyContext();
  const { filters, setFilters } = useFiltersContext();
  const { categoryOptions, setCategoryOptions } = useCategoriesContext();
  const [yearOptions, setYearOptions] = React.useState<any[]>([]);
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
      yearOptions.find((year: any) => {
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
      "@self[published][gte]": data.year?.after,
      "@self[published][lte]": data.year?.before,
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
    const categoryLabel = categoryOptions.options.find((option: any) => option.value === filters["@self[schema]"])?.label.replace(/\s+/g, "_");

    navigate(`/${filtersToUrlQueryParams({ ...filters, "@self[schema]": categoryLabel })}`);
    setPagination({ currentPage: 1 });
  }, [filters]);

  React.useEffect(() => {
    if (!getCategories.isSuccess || !getCategories.data || !getCategories.data.facets) return;

    let facets: any = getCategories.data.facets;

    if (facets["@self"]?.schema?.buckets) {
      facets = { categorie: facets["@self"].schema.buckets };
    }

    const categoriesWithData = Object.values(facets as Record<string, any>)
      .map((facet: any) =>
        facet
          .map((category: any) =>
            (() => {
              const id = category.key;
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

    if (getCategories.data?.facets?.["@self"]?.published?.buckets) {
      const availableYears: number[] = (getCategories.data.facets["@self"].published.buckets as any[])
        .map((b: any) => Number(b.key))
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
        setYearOptions(dynamicYears);

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
    <div id="filters" className={styles.container}>
      <form role="region" aria-label={t("Filters")} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputText
          name="_search"
          placeholder={`${t("Search")}..`}
          defaultValue={filters._search}
          ariaLabel={t("Search")}
          {...{ register, errors }}
        />

        <SelectSingle
          options={yearOptions}
          name="year"
          placeholder={t("Year")}
          isClearable
          defaultValue={yearOptions.find((year: any) => {
            return (
              year.after === filters["@self[published][gte]"] && year.before === filters["@self[published][lte]"]
            );
          })}
          {...{ register, errors, control }}
          ariaLabel={t("Select year")}
        />

        {getCategories.isLoading && <Skeleton height="50px" />}
        {getCategories.isSuccess && (
          <SelectSingle
            options={categoryOptions.options}
            name="category"
            placeholder={t("Category")}
            defaultValue={
              categoryOptions.options &&
              categoryOptions.options.find((option: any) => option.value === filters["@self[schema]"])
            }
            isClearable
            disabled={getCategories.isLoading}
            {...{ register, errors, control }}
            ariaLabel={t("Select category")}
          />
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

      <ResultsDisplaySwitch displayKey="landing-results" />
    </div>
  );
};
