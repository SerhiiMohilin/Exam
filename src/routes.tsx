import type { FC } from "react"
import { HashRouter, Route, Routes } from "react-router"
import App from "./App"
import { Login } from "./components/login/Login"


export const AppRoutes: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </HashRouter>
    )
}
