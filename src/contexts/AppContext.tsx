import {
    useReducer,
    useEffect,
    type FC,
    type PropsWithChildren,
} from "react";
import { AppContext, ActionTypes } from "./AppContext";
import type { UserType, DataType, ActionType, ThemeType } from "./AppContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
    const [storedTheme, setStoredTheme] = useLocalStorage<ThemeType>("theme");

    const initialTheme = storedTheme ?? "dark";

    const [data, dispatch] = useReducer(reducer, {
        user: null,
        theme: initialTheme,
    });

    useEffect(() => {
        if (data.theme) {
            setStoredTheme(data.theme);
        }
    }, [data.theme, setStoredTheme]);

    useEffect(() => {
        const body = document.body;

        body.classList.remove("light", "dark");

        if (data.theme) {
            body.classList.add(data.theme);
        }
    }, [data.theme]);

    return (
        <AppContext.Provider value={{ data, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};