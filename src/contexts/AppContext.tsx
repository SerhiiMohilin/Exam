import {
    createContext,
    useReducer,
    type FC,
    type PropsWithChildren,
    useEffect,
} from "react";
import type { UserType } from "../types/AppContext.type";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Theme = "light" | "dark";

type DataType = {
    user: UserType | null;
    theme: Theme;
};

type ActionType<T = unknown> = {
    type: string;
    payload: T;
};

type AppContextType = {
    data: DataType;
    dispatch?: React.Dispatch<ActionType>;
};

export const enum ActionTypes {
    userLogin = "USER_LOGIN",
    userLogout = "USER_LOGOUT",
    toggleTheme = "TOGGLE_THEME",
}

export const AppContext = createContext<AppContextType>({
    data: { user: null, theme: "light" },
});

const reducer = (data: DataType, action: ActionType): DataType => {
    switch (action.type) {
        case ActionTypes.userLogin:
            return { ...data, user: action.payload as UserType };

        case ActionTypes.userLogout:
            return { ...data, user: null };

        case ActionTypes.toggleTheme:
            return {
                ...data,
                theme: data.theme === "light" ? "dark" : "light",
            };

        default:
            return data;
    }
};

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [storedTheme, setStoredTheme] = useLocalStorage<Theme>("theme");
    const initialTheme = (storedTheme === "dark" || storedTheme === "light") ? storedTheme : "light";

    const [data, dispatch] = useReducer(reducer, {
        user: null,
        theme: initialTheme,
    });

    useEffect(() => {
        setStoredTheme(data.theme);
    }, [data.theme]);

    return (
        <AppContext.Provider value={{ data, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
