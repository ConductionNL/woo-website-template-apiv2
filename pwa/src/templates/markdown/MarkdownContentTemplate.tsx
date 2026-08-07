import * as React from "react";
import { useMarkdown } from "../../hooks/markdown";
import { ParsedHTML } from "../../components/ParsedHTML/ParsedHTML";
import { useMarkdownDirectories } from "../../hooks/useMarkdownDirectories";

interface MarkdownContentTemplateProps {
  pageSlug: string;
  detailPageSlug: string;
  link: string;
}

const isGitHubUrl = (link: string): boolean => {
  try {
    return new URL(link).origin === "https://github.com";
  } catch {
    return false;
  }
};

export const MarkdownContentTemplate: React.FC<MarkdownContentTemplateProps> = ({ pageSlug, detailPageSlug, link }) => {
  const { getDetailMdLocation } = useMarkdownDirectories();

  const location = getDetailMdLocation(pageSlug, detailPageSlug);

  let content: any;

  if (isGitHubUrl(link)) {
    const linkHttps = link.replace("https://github.com/", "https://api.github.com/repos/");
    linkHttps.includes("/blob/main/")
      ? (content = useMarkdown().getContent(linkHttps.replace("/blob/main/", "/contents/")))
      : (content = useMarkdown().getContent(linkHttps.replace("/blob/master/", "/contents/")));
  } else {
    content = useMarkdown().getContent(link);
  }

  return <ParsedHTML contentQuery={content} {...{ location }} />;
};
