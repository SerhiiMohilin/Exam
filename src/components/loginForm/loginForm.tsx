import { useContext, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import eyeOffIcon from "./icons/eyeOff.svg";
import eyeOnIcon from "./icons/eyeOn.svg";
import { AppContext, ActionTypes } from "../../contexts/AppContext";
import type { UserType } from "../../contexts/AppContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./LoginForm.css";

export const LoginForm = () => {
    const { dispatch } = useContext(AppContext)!;
    const navigate = useNavigate();

    const [, setUser] = useLocalStorage<UserType>('user', true);

    const [formData, setFormData] = useState<UserType>({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required.");
            return;
        }

        setUser(formData);
        dispatch({ type: ActionTypes.userLogin, payload: formData });
        navigate("/chat");
    };

    const chosenIcon = showPassword ? eyeOnIcon : eyeOffIcon;

    return (
        <form className="form-container" onSubmit={handleLogin}>
            <input
                name="name"
                placeholder="Enter your name"
                type="text"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            <div className="password-wrapper">
                <input
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    <img
                        src={chosenIcon}
                        alt="Toggle password visibility"
                    />
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Login</button>
            <div className="link-wraper"><Link to="/">Back to Home</Link></div>

        </form>
    );
};