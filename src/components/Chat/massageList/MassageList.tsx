import ReactMarkdown from "react-markdown"; // 1. Импортируем компонент
import type { ConversationPart } from "../../../types/types";

type MessageListProps = {
    conversation: ConversationPart[];
    isLoading: boolean;
};

const Loader = () => <div className="loader"></div>;

export const MessageList = ({ conversation, isLoading }: MessageListProps) => {
    return (
        <div id="chat-content" className="chat-content">
            {conversation.map((part, index) => (
                <div
                    key={index}
                    className={`chat-message ${part.role === "user" ? "user-message" : "ai-message"
                        }`}
                >
                    <span>{part.role === "user" ? "You" : "Gemini"}</span>

                    {/* 2. Заменяем h5 на компонент ReactMarkdown */}
                    <div className="message-content-wrapper">
                        <ReactMarkdown>{part.parts[0].text}</ReactMarkdown>
                    </div>

                </div>
            ))}
            {isLoading && (
                // 3. Оборачиваем Loader в структуру сообщения для корректных отступов
                <div className="chat-message ai-message">
                    <span>Gemini</span>
                    <Loader />
                </div>
            )}
        </div>
    );
};