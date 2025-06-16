export type Role = "user" | "model";

export type ConversationPart = {
    role: Role;
    parts: [{ text: string }];
};

// Типы для ответа от Gemini API
export type GeminiCandidate = {
    content: ConversationPart;
};

export type GeminiResponse = {
    candidates: GeminiCandidate[];
};