import * as React from "react";
import * as styles from "./Content.module.css";
import { FooterTemplate } from "./templates/templateParts/footer/FooterTemplate";
import { HeaderTemplate } from "./templates/templateParts/header/HeaderTemplate";
import { ThemeSwitcherTopBar } from "./templates/templateParts/themeSwitcherTopBar/ThemeSwitcherTopBar";

interface ContentProps {
  children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <ThemeSwitcherTopBar />

      <HeaderTemplate layoutClassName={styles.header} />

      {/* single target for the #mainContent skip link — defined once here so
          every page type has it, never in the templates (duplicate ids).
          tabIndex -1 makes it programmatically focusable so the skip link
          reliably moves focus (not part of the tab order). */}
      <main id="mainContent" tabIndex={-1} className={styles.pageContent}>
        {children}
      </main>

      <FooterTemplate />
    </div>
  );
};
