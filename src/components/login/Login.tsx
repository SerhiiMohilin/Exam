import { useContext, useState } from "react";
import { type UserType } from "../../types/AppContext.type";
import { Link, useNavigate } from "react-router";
import { AppContext, ActionTypes } from "../../contexts/AppContext";
import "./login.css";
import eyeOpenIcon from "./icons/ligtThem/eye-open.svg";
import eyeCloseIcon from "./icons/ligtThem/eye-close.svg";
import eyeOffIcon from "./icons/darkThem/eyeOff.svg";
import eyeOnIcon from "./icons/darkThem/eyeOn.svg";

export const Login = () => {
    const { dispatch, data } = useContext(AppContext);
    const navigate = useNavigate();
    const theme = data.theme;

    const [formData, setFormData] = useState<UserType>({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const onLogin = () => {
        if (dispatch) {
            dispatch({ type: ActionTypes.userLogin, payload: formData });
            navigate("/chat");
        }
    };

    const toggleTheme = () => {
        if (dispatch) {
            dispatch({ type: ActionTypes.toggleTheme, payload: null });
        }
    };

    const chosenIcon =
        showPassword
            ? eyeOnIcon
            : eyeOffIcon

    return (
        <div className="form-container">
            <button onClick={toggleTheme} className="theme-toggle-btn">
                Switch to {theme === "dark" ? "Light" : "Dark"} Theme
            </button>

            <input
                placeholder="Email"
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="password-wrapper">
                <input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    <img
                        src={chosenIcon}
                        alt={showPassword ? "Hide password" : "Show password"}
                    />
                </button>
            </div>
            <button onClick={onLogin}>Login</button>
            <Link to="/">Back to Home</Link>
        </div>
    );
};