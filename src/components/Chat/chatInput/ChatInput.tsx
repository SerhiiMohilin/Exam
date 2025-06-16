import { useState } from "react";

type ChatInputProps = {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
};

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = text.trim();
        if (!message) {
            alert("Please enter the message");
            return;
        }
        onSendMessage(message);
        setText("");
    };

    return (
        <form className="chat-input-form" onSubmit={handleSubmit}>
            <textarea
                id="chat-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Your message to the AI"
                disabled={isLoading}
            />
            <button id="chat-button" type="submit" disabled={isLoading}>
                Send
            </button>
        </form>
    );
};