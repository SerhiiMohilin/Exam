import { LoginForm } from "../../components/loginForm/loginForm";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";
import "./Login.css";

export const Login = () => {
    return (
        <div className="login-page-container">
            <div className="login-header">
                <h1>Login</h1>
                <ThemeToggle />
            </div>
            <LoginForm />
        </div>
    );
};