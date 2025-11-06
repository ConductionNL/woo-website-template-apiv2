import * as React from "react";
import { PageProps } from "gatsby";
import { PageTemplate } from "../../templates/pages/PageTemplate";

const DynamicPage: React.FC<PageProps> = (props: PageProps) => {
    const slug = props.params.slug as string;
    return <PageTemplate slug={slug} />;
};

export default DynamicPage;


