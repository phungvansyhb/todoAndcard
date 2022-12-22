import { Link, Route, Routes } from "react-router-dom";
import App from "./screens/TodoApp";
import CardApp from "./screens/CardApp";
import PageNotFound from "./screens/PageNotFound";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import CardDetail from "screens/CardDetail";
import { AnimatePresence } from "framer-motion";
import {useLocation} from 'react-router-dom'
type Props = {};

export default function AppRouter({}: Props) {
    const location = useLocation()
    return (
        <div>
            <div className="shadow flex justify-end border-b gap-6 py-4 px-8 font-semibold sticky top-0 bg-white z-50">
                <NavLink
                    to={"/"}
                    className={(props) => {
                        return props.isActive ? "scale-110 text-pink-700 nav-link-active" : "";
                    }}
                >
                    Todo App
                </NavLink>
                <NavLink
                    to={"/card"}
                    className={(props) => {
                        return props.isActive ? "scale-110 text-pink-700 nav-link-active" : "";
                    }}
                >
                    Card App
                </NavLink>
            </div>
            <AnimatePresence >
                <Routes location={location} key={location.pathname}>
                    <Route path="/card" element={<CardApp />} />
                    <Route path="/card/:id" element={<CardDetail />} />
                    <Route path="/" element={<App />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </AnimatePresence>

            <Toaster position="top-right" />
        </div>
    );
}
