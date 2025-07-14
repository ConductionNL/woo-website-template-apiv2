import * as React from "react";
import * as styles from "./WOOItemDetailTemplate.module.css";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import {
  Page,
  PageContent,
  Heading1,
  Table,
  TableBody,
  TableRow,
  TableCell,
  UnorderedList,
  UnorderedListItem,
  Link,
} from "@utrecht/component-library-react/dist/css-module";
import { translateDate } from "../../services/dateFormat";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { QueryClient } from "react-query";
import { useOpenWoo } from "../../hooks/openWoo";
import { getPDFName } from "../../services/getPDFName";
import { HorizontalOverflowWrapper, Pagination } from "@conduction/components";
import { removeHTMLFromString } from "../../services/removeHTMLFromString";
import { Helmet } from "react-helmet";
import { usePaginationContext } from "../../context/pagination";

interface WOOItemDetailTemplateProps {
  wooItemId: string;
}

export const WOOItemDetailTemplate: React.FC<WOOItemDetailTemplateProps> = ({ wooItemId }) => {
  const { t, i18n } = useTranslation();

  const queryClient = new QueryClient();
  const getItems = useOpenWoo(queryClient).getOne(wooItemId);

  const { pagination, setPagination } = usePaginationContext();
  const [requestedPage, setRequestedPage] = React.useState<number>(pagination.currentPage);

  const attachmentsWithLabelsQuery = useOpenWoo(queryClient).getAttachmentsWithLabels(wooItemId);
  const attachmentsNoLabelsQuery = useOpenWoo(queryClient).getAttachmentsNoLabels(wooItemId, 10, requestedPage);

  const sortAlphaNum = (a: any, b: any) => a.title.localeCompare(b.title, i18n.language, { numeric: true });

  const getLabel = (label: string) => {
    switch (_.upperFirst(label)) {
      case "Informatieverzoek":
        return t("Information request");
      case "Convenant":
        return t("Convenant");
      case "Besluit":
        return t("Decision");
      case "Inventarisatielijst":
        return t("Inventory list");
      default:
        return t(_.upperFirst(label));
    }
  };

  const getName = (name: string) => {
    const formattedName = name.replace(/_/g, " ");

    const upperFirstName = _.upperFirst(formattedName);

    switch (upperFirstName) {
      case "Bevindingen":
        return t("Findings");
      case "Conclusies":
        return t("Conclusions");
      case "Functiebenaming":
        return t("Job title");
      case "Gedraging":
        return t("Behavior");
      case "Onderdeel taak":
        return t("Part of task");
      case "Oordeel":
        return t("Judgement");
      case "Opdrachtgever":
        return t("Client");
      case "Organisatieonderdeel":
        return t("Organizational unit");
      default:
        return t(getItems.data["@self"].schema.properties[name]?.title ?? upperFirstName);
    }
  };

  function isDate(str: string): boolean {
    // Check for ISO date format (YYYY-MM-DD) or common date formats
    const dateRegex = /^\d{4}-\d{2}-\d{2}|^\d{4}\/\d{2}\/\d{2}/;
    if (!dateRegex.test(str)) return false;

    const date = new Date(str);
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === str.slice(0, 10);
  }

  const getExtension = (attachment: any) => {
    if (attachment.extension) {
      return attachment.extension;
    } else {
      return attachment.type.split("/").pop();
    }
  };

  const checkIfVisible = (property: any) => {
    return getItems.data["@self"].schema.properties[property].visible !== false;
  };

  const orderProperties = (data: any) => {
    const excludeKeys = [
      "@self",
      "title",
      "titel",
      "name",
      "naam",
      "id",
      "attachments",
      ...Object.keys(getItems.data["@self"].schema.properties).filter((key) => !checkIfVisible(key)),
    ];

    const enrichedData = {
      publicatiedatum: data["@self"]?.published,
      categorie: data["@self"]?.schema?.title,
      ...data,
    };

    return Object.entries(enrichedData)
      .filter(([key]) => !excludeKeys.includes(key))
      .sort((a, b) => {
        const orderA = data["@self"]?.schema?.properties?.[a[0]]?.order;
        const orderB = data["@self"]?.schema?.properties?.[b[0]]?.order;

        // If both have valid non-zero orders, sort normally
        if (orderA && orderB && orderA !== 0 && orderB !== 0) {
          return orderA - orderB;
        }

        // If orderA is valid and non-zero, it comes first
        if (orderA && orderA !== 0) return -1;
        // If orderB is valid and non-zero, it comes first
        if (orderB && orderB !== 0) return 1;

        // If orderA is 0 and orderB is null/undefined, orderA comes first
        if (orderA === 0 && !orderB) return -1;
        // If orderB is 0 and orderA is null/undefined, orderB comes first
        if (orderB === 0 && !orderA) return 1;

        // If both are 0 or both are null/undefined, maintain original order
        return 0;
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };

  const groupedAttachmentsWithLabels = React.useMemo(() => {
    if (!attachmentsWithLabelsQuery.isSuccess || !attachmentsWithLabelsQuery.data?.results) return [];

    const attachments = attachmentsWithLabelsQuery.data.results;

    let multipleLabels: any[] = [];
    let singleLabels: any[] = [];
    let allLabels: any[] = [];

    attachments.forEach((attachment: any) => {
      if (attachment.labels?.length > 1) {
        multipleLabels.push(attachment);
        allLabels.push(...attachment.labels);
      } else {
        singleLabels.push(attachment);
        allLabels.push(attachment.labels[0]);
      }
    });

    const newAttachments: any[] = [];
    multipleLabels.forEach((attachment: any) => {
      attachment.labels.forEach((label: any, idx: number) => {
        newAttachments.push({ ...attachment, labels: [attachment.labels[idx]] });
      });
    });

    const attachmentsAll = [...newAttachments, ...singleLabels];
    const uniqueLabels = [...new Set(allLabels)];

    // Define the specific order for labels
    const labelOrder = ["informatieverzoek", "convenant", "besluit", "inventarisatielijst", "bijlage"];

    // Sort labels according to the specified order, with any unknown labels at the end
    const sortedLabels = uniqueLabels.sort((a: any, b: any) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      const indexA = labelOrder.indexOf(aLower);
      const indexB = labelOrder.indexOf(bLower);

      // If both labels are in the order array, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only one is in the order array, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      // If neither is in the order array, sort alphanumerically
      return aLower.localeCompare(bLower, i18n.language, { numeric: true });
    });

    return sortedLabels.map((label: any) => ({
      attachments: attachmentsAll.filter((att: any) => att.labels.includes(label)),
      label,
    }));
  }, [attachmentsWithLabelsQuery.data]);

  const unsortedAttachments = React.useMemo(() => {
    if (!attachmentsNoLabelsQuery.isSuccess || !attachmentsNoLabelsQuery.data?.results) return [];
    return [...attachmentsNoLabelsQuery.data.results].sort(sortAlphaNum);
  }, [attachmentsNoLabelsQuery.data]);

  const totalAttachmentPages =
    attachmentsNoLabelsQuery.isSuccess && attachmentsNoLabelsQuery.data?.pages
      ? attachmentsNoLabelsQuery.data.pages
      : pagination.currentPage;

  React.useEffect(() => {
    if (attachmentsNoLabelsQuery.isSuccess && pagination.currentPage !== requestedPage) {
      setPagination({ currentPage: requestedPage });
    }
  }, [attachmentsNoLabelsQuery.isSuccess]);

  return (
    <>
      {getItems.isSuccess && (
        <Helmet>
          <title>{`Woo | ${window.sessionStorage.getItem("ORGANISATION_NAME")} | ${removeHTMLFromString(
            getItems.data.titel,
          )}`}</title>
        </Helmet>
      )}
      <Page>
        <PageContent className={styles.container}>
          <div role="navigation">
            <Link
              className={styles.backLink}
              href="/"
              onClick={(e: any) => {
                e.preventDefault(), navigate("/");
              }}
              tabIndex={0}
              aria-label={t("Back to homepage")}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> <span>{t("Back to homepage")}</span>
            </Link>
          </div>

          {getItems.isSuccess && getItems.data && (
            <div className={styles.content} role="region" aria-label={t("Details")}>
              <Heading1
                id="mainContent"
                tabIndex={0}
                aria-label={`${t("Title of woo request")}, ${getItems.data.title ?? getItems.data.titel ?? getItems.data.name ?? getItems.data.naam ?? getItems.data.id}`}
              >
                {removeHTMLFromString(removeHTMLFromString(getItems.data.titel ?? getItems.data.title))}
              </Heading1>

              <HorizontalOverflowWrapper
                ariaLabels={{
                  scrollLeftButton: t("Scroll table to the left"),
                  scrollRightButton: t("Scroll table to the right"),
                }}
              >
                <Table className={styles.table}>
                  <TableBody className={styles.tableBody}>
                    {getItems.data &&
                      Object.entries(orderProperties(getItems.data)).map(([key, value]: [string, any]) => {
                        if (!!value) {
                          let formattedValue: string;
                          if (
                            !value ||
                            (typeof value === "string" && value.trim() === "") ||
                            (Array.isArray(value) && value.length === 0) ||
                            (typeof value === "object" && value !== null && Object.keys(value).length === 0)
                          ) {
                            return;
                          }

                          if (typeof value === "string") {
                            const isValidDate = isDate(value);
                            formattedValue = isValidDate ? translateDate(i18n.language, value) ?? "-" : value;
                          } else if (Array.isArray(value)) {
                            if (key === "themes" || key === "themas") {
                              return (
                                !_.isEmpty(value) && (
                                  <TableRow
                                    key={key}
                                    className={styles.tableRow}
                                    tabIndex={0}
                                    aria-labelledby={"themesName themesData"}
                                  >
                                    <TableCell id="themesName">{t("Themes")}</TableCell>
                                    <TableCell id="themesData">
                                      {value.map((theme: any, idx: number) => (
                                        <span key={idx}>
                                          {theme.title ? theme.title + (idx !== value?.length - 1 ? ", " : "") : theme}
                                        </span>
                                      ))}
                                    </TableCell>
                                  </TableRow>
                                )
                              );
                            } else {
                              formattedValue = value.map((item: any) => item.title).join(", ");
                            }
                          } else if (typeof value === "object") {
                            formattedValue = JSON.stringify(value);
                          } else {
                            formattedValue = String(value);
                          }

                          return (
                            <TableRow
                              key={key}
                              className={styles.tableRow}
                              tabIndex={0}
                              aria-label={`${getName(key)}, ${formattedValue}`}
                            >
                              <TableCell>{getName(key)}</TableCell>
                              <TableCell>{formattedValue}</TableCell>
                            </TableRow>
                          );
                        }
                      })}

                    {attachmentsWithLabelsQuery.isSuccess &&
                      groupedAttachmentsWithLabels.length > 0 &&
                      groupedAttachmentsWithLabels.map((sortedAttachments: any, idx: number) => (
                        <TableRow
                          className={styles.tableRow}
                          key={idx}
                          tabIndex={0}
                          aria-label={
                            sortedAttachments.attachments.length === 1
                              ? `${getLabel(sortedAttachments.label)}, ${
                                  sortedAttachments.attachments[0].title ??
                                  getPDFName(sortedAttachments.attachments[0].accessUrl)
                                }`
                              : `${getLabel(sortedAttachments.label)}, ${t("There are")} ${
                                  sortedAttachments.attachments.length
                                } ${t("Attachments")} ${t("With the label")} ${getLabel(
                                  sortedAttachments.label,
                                )}, ${t("These are")} ${sortedAttachments.attachments
                                  .map((attachment: any) => attachment.title ?? getPDFName(attachment.accessUrl))
                                  .join(", ")}`
                          }
                        >
                          <TableCell>{getLabel(sortedAttachments.label)}</TableCell>

                          {sortedAttachments.attachments.length > 1 && (
                            <TableCell>
                              <div id="labelAttachmentsData">
                                {sortedAttachments.attachments.map((attachment: any, idx: number) => (
                                  <div key={idx}>
                                    <Link href={attachment.accessUrl} target="blank">
                                      {`${attachment.title ?? getPDFName(attachment.accessUrl)}`}
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                          )}
                          {sortedAttachments.attachments.length === 1 && (
                            <TableCell>
                              <Link href={sortedAttachments.attachments[0].accessUrl} target="blank">
                                {`${sortedAttachments.attachments[0].title ?? getPDFName(sortedAttachments.attachments[0].accessUrl)}`}
                              </Link>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}

                    {attachmentsNoLabelsQuery.isSuccess && unsortedAttachments.length > 0 && (
                      <TableRow
                        className={styles.tableRow}
                        tabIndex={0}
                        aria-labelledby="attachmentsName attachmentsData"
                      >
                        <TableCell id="attachmentsName">{t("Attachments")}</TableCell>
                        <TableCell>
                          <div id="attachmentsData">
                            {unsortedAttachments.map(
                              (bijlage: any, idx: number) =>
                                bijlage.title && (
                                  <div key={idx}>
                                    <Link
                                      href={bijlage.accessUrl?.length !== 0 ? bijlage.accessUrl : "#"}
                                      target={bijlage.accessUrl?.length !== 0 ? "blank" : ""}
                                    >
                                      {bijlage.title}
                                    </Link>
                                  </div>
                                ),
                            )}
                          </div>
                          <div role="region" aria-label={t("Pagination")} className={styles.pagination}>
                            {totalAttachmentPages > 1 && (
                              <Pagination
                                ariaLabels={{
                                  pagination: t("Pagination"),
                                  previousPage: t("Previous page"),
                                  nextPage: t("Next page"),
                                  page: t("Page"),
                                }}
                                totalPages={totalAttachmentPages}
                                currentPage={requestedPage}
                                setCurrentPage={(page: any) => setRequestedPage(page)}
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </HorizontalOverflowWrapper>
            </div>
          )}
          {getItems.isLoading && <Skeleton height={"200px"} />}
        </PageContent>
      </Page>
    </>
  );
};
