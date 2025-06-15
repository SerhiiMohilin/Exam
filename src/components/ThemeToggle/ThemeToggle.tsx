import { useContext, useEffect } from "react";
import "./ThemeToggle.css";
import { AppContext } from "../../contexts/AppContext";

export const ThemeToggle = () => {

    const { data } = useContext(AppContext);

    useEffect(() => {
        document.body.className = ""; // сброс классов
        document.body.classList.add(data.theme); // добавляет "light" или "dark"
    }, [data.theme]);

    const [data, dispatch] = useReducer(reducer, {
        user: null,
        theme: initialTheme,
    });

    useEffect(() => {
        setStoredTheme(data.theme);
    }, [data.theme]);
    return (
        <label className="theme-switch">
            <input
                type="checkbox"
                checked={currentTheme === "dark"}
                onChange={toggleTheme}
            />
            <span className="slider"></span>
        </label>
    );
};