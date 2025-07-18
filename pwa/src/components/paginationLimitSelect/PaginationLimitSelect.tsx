import * as React from "react";
import * as styles from "./PaginationLimitSelect.module.css";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { SelectSingle } from "@conduction/components";
import { IQueryLimitContext, QUERY_LIMIT_DEFAULT, useQueryLimitContext } from "../../context/queryLimit";
import { useTranslation } from "react-i18next";

interface PaginationLimitSelectProps {
  queryLimitName: string;
  layoutClassName?: string;
}

export const PaginationLimitSelectComponent: React.FC<PaginationLimitSelectProps> = ({
  queryLimitName,
  layoutClassName,
}) => {
  const {
    watch,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { queryLimit, setQueryLimit } = useQueryLimitContext();
  const { t } = useTranslation();

  const watchLimit = watch("limit");

  const value = queryLimit[queryLimitName as keyof IQueryLimitContext];

  React.useEffect(() => {
    if (!watchLimit) return;
    if (parseInt(watchLimit.value) === value) return;

    const selectedLimit = limitSelectOptions.find((limitOption) => limitOption.value === watchLimit.value);

    if (selectedLimit) {
      setQueryLimit({ ...queryLimit, [queryLimitName]: parseInt(selectedLimit.value) });
    }
  }, [watchLimit]);

  React.useEffect(() => {
    setValue(
      "limit",
      limitSelectOptions.find((limitOption) => limitOption.value === (value !== undefined && value.toString())),
    );
  }, []);

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <span>{t("Results per page")}:</span>
      <SelectSingle
        ariaLabel={t("Results per page")}
        {...{ register, errors, control }}
        defaultValue={QUERY_LIMIT_DEFAULT}
        name="limit"
        options={limitSelectOptions}
        menuPlacement="auto"
        placeholder={t("Limit")}
      />
    </div>
  );
};

const limitSelectOptions = [
  { label: "6", value: "6" },
  { label: "9", value: "9" },
  { label: "12", value: "12" },
  { label: "21", value: "21" },
  { label: "30", value: "30" },
  { label: "60", value: "60" },
  { label: "120", value: "120" },
];
