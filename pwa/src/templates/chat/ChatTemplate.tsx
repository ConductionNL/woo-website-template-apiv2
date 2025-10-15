import * as React from "react";
import * as styles from "./ChatTemplate.module.css";
import {
    Page,
    PageContent,
    Heading1,
    Button,
    Surface,
    Separator,
    StatusBadge,
    Textbox,
    ButtonGroup
} from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faComments, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export const ChatTemplate: React.FC = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [inputMessage, setInputMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const messagesContainerRef = React.useRef<HTMLDivElement>(null);
    const isUserAtBottomRef = React.useRef<boolean>(true);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        const el = messagesContainerRef.current;
        if (el) {
            requestAnimationFrame(() => {
                el.scrollTo({ top: el.scrollHeight, behavior });
            });
        }
    };

    // Автоскролл при добавлении новых сообщений
    React.useEffect(() => {
        if (messages.length === 0) return;
        const last = messages[messages.length - 1];
        if (last.role === 'user' || isUserAtBottomRef.current) {
            setTimeout(() => scrollToBottom('smooth'), 100);
        }
    }, [messages]);

    // Автоскролл при загрузке
    React.useEffect(() => {
        if (isLoading) {
            setTimeout(() => scrollToBottom('smooth'), 100);
        }
    }, [isLoading]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage.trim(),
            role: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            // Simulate AI response
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: generateAIResponse(userMessage.content),
                role: 'assistant',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: t("Sorry, an error occurred. Please try again."),
                role: 'assistant',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const generateAIResponse = (userInput: string): string => {
        // Simple AI response simulation
        const responses = [
            "That's an interesting question! Let me think about that.",
            "I understand your perspective. Here's what I think about this...",
            "Thank you for your question. This is an important topic to discuss.",
            "Good question! Let me explain this in more detail.",
            "I'm happy to help you with this question.",
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return `${randomResponse} You wrote: "${userInput}"`;
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <Page className={styles.page}>
            <PageContent className={styles.container}>
                <Surface className={styles.chatSurface}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerContent}>
                            <Heading1 className={styles.title}>{t("AI Chat")}</Heading1>
                        </div>
                        <ButtonGroup>
                            <Button
                                appearance="secondary-action"
                                onClick={clearChat}
                                disabled={messages.length === 0}
                            >
                                {t("Chat wissen")}
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div className={styles.chatContainer}>
                        <div
                            className={styles.messagesContainer}
                            ref={messagesContainerRef}
                            onScroll={(e) => {
                                const el = e.currentTarget;
                                const threshold = 100; // px
                                const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
                                isUserAtBottomRef.current = distanceFromBottom <= threshold;
                            }}
                        >
                            {messages.length === 0 && (
                                <Surface className={styles.welcomeCard}>
                                    <div className={styles.welcomeContent}>
                                        <div className={styles.welcomeIcon}><FontAwesomeIcon icon={faComments} /></div>
                                        <div className={styles.welcomeText}>
                                            <h3>{t("Welcome to AI Chat!")}</h3>
                                            <p>{t("Ask any question to start a conversation.")}</p>
                                        </div>
                                    </div>
                                </Surface>
                            )}

                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`${styles.message} ${styles[message.role]}`}
                                >
                                    <Surface className={`${styles.messageCard} ${styles[`${message.role}Card`]}`}>
                                        <div className={styles.messageContent}>
                                            <div className={styles.messageHeader}>
                                                {message.role === 'assistant' && <StatusBadge
                                                    className={`${styles.roleBadge} ${styles[`${message.role}Badge`]}`}
                                                >
                                                    {t("AI Assistant")}
                                                </StatusBadge>}
                                                <div className={styles.messageTime}>
                                                    {message.timestamp.toLocaleTimeString(undefined, {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                            <div className={styles.messageText}>{message.content}</div>
                                        </div>
                                    </Surface>
                                </div>
                            ))}

                            {isLoading && (
                                <div className={`${styles.message} ${styles.assistant}`}>
                                    <Surface className={`${styles.messageCard} ${styles.assistantCard}`}>
                                        <div className={styles.messageContent}>
                                            <div className={styles.messageHeader}>
                                                <StatusBadge className={`${styles.roleBadge} ${styles.assistantBadge}`}>
                                                    {t("AI Assistant")}
                                                </StatusBadge>
                                            </div>
                                            <div className={styles.loadingDots}>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </Surface>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                </Surface>

                <Surface className={styles.inputSurface}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputWrapper}>
                            <Textbox
                                value={inputMessage}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={t("Enter your message...")}
                                disabled={isLoading}
                                className={styles.messageInput}
                            />
                            <Button
                                appearance="primary-action"
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className={styles.sendButton}
                            >
                                {isLoading ? (
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                ) : (
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                )}
                            </Button>
                        </div>
                    </div>
                </Surface>
            </PageContent>
        </Page>
    );
};
