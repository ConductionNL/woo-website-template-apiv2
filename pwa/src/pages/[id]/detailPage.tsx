import * as React from "react";
import _ from "lodash";
import { PageProps, navigate } from "gatsby";
import { WOOItemDetailTemplate } from "../../templates/wooItemDetailTemplate/WOOItemDetailTemplate";
import { usePages } from "../../hooks/pages";
import { getPagesList } from "../../services/pageUtils";

const DetailPage: React.FC<PageProps> = (props: PageProps) => {
  const id = props.params.id as string;

  const pagesQuery = usePages().getAll();

  React.useEffect(() => {
    const data: any = (pagesQuery as any)?.data;
    const list = getPagesList(data);
    const match = list.find((p: any) => (p?.slug ?? "") === id);
    if (match) {
      navigate(`/page/${id}`, { replace: true });
    }
  }, [pagesQuery?.data, id]);

  return <WOOItemDetailTemplate wooItemId={id} />;
};
export default DetailPage;
