import type { ConversationPart } from '../../types/types';


type SidebarProps = {
    chats: ConversationPart[][];
    activeChatIndex: number;
    onSelectChat: (index: number) => void;
    onNewChat: () => void;
    onLogout: () => void; // Оставляем на случай, если кнопка вернется
};

// Функция для получения заголовка чата (первое сообщение пользователя)
const getChatTitle = (chat: ConversationPart[]) => {
    const userMessage = chat.find((part) => part.role === 'user');
    if (userMessage) {
        // Обрезаем длинные заголовки
        return userMessage.parts[0].text.substring(0, 25) + '...';
    }
    return 'New Chat';
};



// ... функция getChatTitle

export const Sidebar = ({ chats, activeChatIndex, onSelectChat, onNewChat }: SidebarProps) => {
    return (
        <div className="sidebar">
            {/* [УДАЛЕНО] Блок .user-profile */}

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
            </nav>
            {/* Кнопку выхода можно будет добавить в футер или в хедер */}
        </div>
    );
};