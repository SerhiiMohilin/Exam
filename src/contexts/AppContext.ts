import { createContext } from "react";

type UserType = {
    name?: string;
    email?: string;
    password?: string;
};

type ThemeType = "light" | "dark";

type DataType = {
    user: UserType | null;
    theme: ThemeType;
};

type ActionType<T = unknown> = {
    type: string;
    payload: T;
};

type AppContextType = {
    data: DataType;
    dispatch: React.Dispatch<ActionType>;
};

export const ActionTypes = {
    userLogin: "USER_LOGIN",
    userLogout: "USER_LOGOUT",
    toggleTheme: "TOGGLE_THEME",
} as const;

export const AppContext = createContext<AppContextType>({
    data: { user: null, theme: "dark" },
    dispatch: () => null, // Безопасная заглушка
});

export type { ActionType, AppContextType, DataType, UserType, ThemeType };