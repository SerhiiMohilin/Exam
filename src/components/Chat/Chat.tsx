import { useEffect } from 'react';
import { useApiMutation } from '../../hooks/useRequest';
import type { ConversationPart, GeminiResponse } from '../../types/types';
import { MessageList } from './massageList/MassageList';
import { ChatInput } from './chatInput/ChatInput';
import fullUrl from '../../api';

type ChatProps = {
    conversation: ConversationPart[];
    onConversationUpdate: (newConversation: ConversationPart[]) => void;
};

export const Chat = ({ conversation, onConversationUpdate }: ChatProps) => {
    const [sendMessage, { data: response, loading, error }] = useApiMutation<
        { contents: ConversationPart[] },
        GeminiResponse
    >(fullUrl, 'POST');

    const handleSendMessage = (message: string) => {
        const userMessage: ConversationPart = {
            role: 'user',
            parts: [{ text: message }],
        };
        const newConversation = [...conversation, userMessage];
        onConversationUpdate(newConversation);
        sendMessage({ contents: newConversation });
    };

    useEffect(() => {
        if (response) {
            const aiMessage = response.candidates[0].content;
            onConversationUpdate([...conversation, aiMessage]);
        }
    }, [conversation, onConversationUpdate, response]);

    useEffect(() => {
        if (error) {
            alert('An error occurred! Reverting last message.');
            console.error(error);
            onConversationUpdate(conversation.slice(0, -1));
        }
    }, [conversation, error, onConversationUpdate]);
    return (
        <div className="chat-container">
            {conversation.length > 0 ? (
                <MessageList conversation={conversation} isLoading={loading} />
            ) : (
                <div className="welcome-message">
                    <h2>Welcome to Gemini</h2>
                    <p>Start a conversation by typing below.</p>
                </div>
            )}
            <ChatInput onSendMessage={handleSendMessage} isLoading={loading} />
        </div>
    );
};