import * as React from "react";
import * as styles from "./ErrorScreen.module.css";
import {
    Page,
    PageContent,
    Heading1,
    Heading2,
    Paragraph,
    Button,
    Alert,
} from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

interface ErrorScreenProps {
    error: Error | null;
    errorInfo?: React.ErrorInfo | null;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, errorInfo }) => {
    const { t } = useTranslation();
    const [showDetails, setShowDetails] = React.useState(false);

    return (
        <div className={styles.wrapper}>
            <Page>
                <PageContent className={styles.container}>
                    <div className={styles.iconContainer}>
                        <FontAwesomeIcon icon={faExclamationTriangle} className={styles.icon} />
                    </div>

                    <Heading1 className={styles.title}>Oops, {t("something went wrong")}!</Heading1>

                    <Paragraph className={styles.description}>
                        {t(
                            "We encountered an error while loading the data from the municipality. This might be due to incorrect or incomplete data.",
                        )}
                    </Paragraph>

                    {error && (
                        <Alert className={styles.alert} type="error">
                            <Heading2 className={styles.errorTitle}>{t("Error details")}:</Heading2>
                            <Paragraph className={styles.errorMessage}>
                                <strong>{error.name}:</strong> {error.message}
                            </Paragraph>
                        </Alert>
                    )}

                    {errorInfo && (
                        <div className={styles.detailsSection}>
                            <Button
                                appearance="secondary-action-button"
                                className={styles.toggleButton}
                                onClick={() => setShowDetails(!showDetails)}
                            >
                                {showDetails ? t("Hide technical details") : t("Show technical details")}
                            </Button>

                            {showDetails && (
                                <div className={styles.technicalDetails}>
                                    <pre className={styles.stackTrace}>{errorInfo.componentStack}</pre>
                                    {error?.stack && (
                                        <>
                                            <Heading2 className={styles.stackTitle}>Stack Trace:</Heading2>
                                            <pre className={styles.stackTrace}>{error.stack}</pre>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </PageContent>
            </Page>
        </div>
    );
};

