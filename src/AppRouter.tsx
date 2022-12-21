import { Link, Route, Routes } from "react-router-dom";
import App from "./TodoApp";
import AppContext from "./CardApp";
import PageNotFound from "./PageNotFound";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
type Props = {};

export default function AppRouter({}: Props) {
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
                    to={"/context"}
                    className={(props) => {
                        return props.isActive ? "scale-110 text-pink-700 nav-link-active" : "";
                    }}
                >
                    Card App
                </NavLink>
            </div>
            <Routes>
                <Route path="/context" element={<AppContext />} />
                <Route path="/" element={<App />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster position="top-right" />
        </div>
    );
}
