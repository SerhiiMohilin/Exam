import type { ConversationPart } from '../../types/types';


type SidebarProps = {
    chats: ConversationPart[][];
    activeChatIndex: number;
    onSelectChat: (index: number) => void;
    onNewChat: () => void;
    onLogout: () => void;
};

const getChatTitle = (chat: ConversationPart[]) => {
    const userMessage = chat.find((part) => part.role === 'user');
    if (userMessage) {
        return userMessage.parts[0].text.substring(0, 25) + '...';
    }
    return 'New Chat';
};


export const Sidebar = ({ chats, activeChatIndex, onSelectChat, onNewChat }: SidebarProps) => {
    return (
        <div className="sidebar">

            <button className="new-chat-button" onClick={onNewChat}>
                + New Chat
            </button>
            <nav className="chat-history">
                <ul>
                    {chats.map((chat, index) => (
                        <li
                            key={index}
                            className={`history-item ${index === activeChatIndex ? 'active' : ''}`}
                            onClick={() => onSelectChat(index)}
                        >
                            {getChatTitle(chat)}
                        </li>
                    ))}
                </ul>
            </nav>s
        </div>
    );
};