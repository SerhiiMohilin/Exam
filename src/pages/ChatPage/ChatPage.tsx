import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { UserType } from '../../contexts/AppContext';
import { Chat } from '../../components/Chat/Chat';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import type { ConversationPart } from '../../types/types';
import "./ChatPage.css";
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';

export const ChatPage = () => {
    const navigate = useNavigate();

    const [user, , clearUser] = useLocalStorage<UserType>('user', true);

    const [allChats, setAllChats] = useLocalStorage<ConversationPart[][]>(
        'multiChatHistory',
        true
    );
    const chatHistory = allChats ?? [[]];

    const [activeChatIndex, setActiveChatIndex] = useState(0);

    const handleSelectChat = (index: number) => {
        setActiveChatIndex(index);
    };

    const handleNewChat = () => {
        const newChats = [[] as ConversationPart[], ...chatHistory];
        setAllChats(newChats);
        setActiveChatIndex(0);
    };

    const handleConversationUpdate = (updatedConversation: ConversationPart[]) => {
        const newAllChats = [...chatHistory];
        newAllChats[activeChatIndex] = updatedConversation;
        setAllChats(newAllChats);
    };

    const handleLogout = () => {
        clearUser();
        navigate('/login');
    };
    const currentChat = chatHistory[activeChatIndex];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <header className="app-header">
                <button onClick={handleLogout}>Logout</button>
                <h2 className="user-name">{user?.name ?? 'Guest'}</h2>

                <ThemeToggle />
            </header>
            <div className="app-layout">
                <Sidebar
                    chats={chatHistory}
                    activeChatIndex={activeChatIndex}
                    onSelectChat={handleSelectChat}
                    onNewChat={handleNewChat}
                    onLogout={handleLogout}
                />
                {currentChat && (
                    <Chat
                        conversation={currentChat}
                        onConversationUpdate={handleConversationUpdate}
                    />
                )}
            </div>
        </div>
    );
};