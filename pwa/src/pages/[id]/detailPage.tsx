import * as React from "react";
import _ from "lodash";
import { PageProps } from "gatsby";
import { WOOItemDetailTemplate } from "../../templates/wooItemDetailTemplate/WOOItemDetailTemplate";
import { usePages } from "../../hooks/pages";
import { getPagesList } from "../../services/pageUtils";
import { PageTemplate } from "../../templates/pages/PageTemplate";

const DetailPage: React.FC<PageProps> = (props: PageProps) => {
  const id = props.params.id as string;

  const pagesQuery = usePages().getAll();
  if (pagesQuery.isLoading || pagesQuery.isIdle) {
    return <></>;
  }

  const data: any = (pagesQuery as any)?.data;
  const list = getPagesList(data);
  const match = Array.isArray(list) ? list.find((p: any) => (p?.slug ?? "") === id) : undefined;

  if (match) {
    return <PageTemplate slug={id} />;
  }

  return <WOOItemDetailTemplate wooItemId={id} />;
};
export default DetailPage;
