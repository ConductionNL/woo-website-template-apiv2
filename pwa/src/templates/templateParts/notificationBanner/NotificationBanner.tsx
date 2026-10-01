import * as React from "react";
import * as styles from "./NotificationBanner.module.css";
import { Alert, Button, Link } from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

// Holds the dismissed message itself, so a changed message is shown again.
const DISMISSED_KEY = "NOTIFICATION_DISMISSED";

// URLs exclude trailing punctuation, so a sentence-ending "." isn't part of the link.
const LINK_PATTERN = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/[^\s]*[^\s.,;:!?)])/g;

// The message is configured as plain text; email addresses and URLs in it become links.
const linkify = (message: string): React.ReactNode[] =>
  message.split(LINK_PATTERN).map((part, idx) => {
    if (idx % 2 === 0) return part;
    const href = part.startsWith("http") ? part : `mailto:${part}`;
    return (
      <Link key={idx} href={href}>
        {part}
      </Link>
    );
  });

export const NotificationBanner: React.FC = () => {
  const { t } = useTranslation();
  const message = (window.sessionStorage.getItem("NOTIFICATION_MESSAGE") ?? "").trim();
  const [dismissed, setDismissed] = React.useState<string | null>(window.sessionStorage.getItem(DISMISSED_KEY));

  if (!message || dismissed === message) return <></>;

  const dismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, message);
    setDismissed(message);
  };

  return (
    <section aria-label={t("Notification")} className={styles.container}>
      {/* role "status": the warning type's default role "alert" would interrupt screen readers on every page */}
      <Alert type="warning" role="status" icon={<FontAwesomeIcon icon={faWarning} />} className={styles.alert}>
        <div className={styles.content}>
          <p className={styles.message}>{linkify(message)}</p>
          <Button
            appearance="subtle-button"
            className={styles.close}
            onClick={dismiss}
            aria-label={t("Close notification")}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      </Alert>
    </section>
  );
};
