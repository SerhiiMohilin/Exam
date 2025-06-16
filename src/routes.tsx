import type { FC } from "react"
import { HashRouter, Route, Routes } from "react-router"
import App from "./App"
import { Login } from "./pages/LoginPage/Login"
import { ChatPage } from "./pages/ChatPage/ChatPage"


export const AppRoutes: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </HashRouter>
    )
}
