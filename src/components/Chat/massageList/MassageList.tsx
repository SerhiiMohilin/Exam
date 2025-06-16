import ReactMarkdown from "react-markdown";
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

                    <div className="message-content-wrapper">
                        <ReactMarkdown>{part.parts[0].text}</ReactMarkdown>
                    </div>

                </div>
            ))}
            {isLoading && (
                <div className="chat-message ai-message">
                    <span>Gemini</span>
                    <Loader />
                </div>
            )}
        </div>
    );
};