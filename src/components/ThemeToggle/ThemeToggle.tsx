import { useContext, useEffect } from "react";
import { AppContext, ActionTypes } from "../../contexts/AppContext";
import "./ThemeToggle.css";

export const ThemeToggle = () => {
    const { data, dispatch } = useContext(AppContext);

    useEffect(() => {
        document.body.className = "";
        document.body.classList.add(data.theme);
    }, [data.theme]);

    const toggleTheme = () => {
        dispatch?.({ type: ActionTypes.toggleTheme, payload: null });
    };

    return (
        <label className="theme-switch">
            <input
                type="checkbox"
                checked={data.theme === "dark"}
                onChange={toggleTheme}
            />
            <span className="slider"></span>
        </label>
    );
};