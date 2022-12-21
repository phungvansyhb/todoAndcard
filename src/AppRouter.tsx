import { Link, Route, Routes } from "react-router-dom";
import App from "./App";
import AppContext from "./AppContext";
import PageNotFound from "./PageNotFound";
import { Toaster } from "react-hot-toast";
type Props = {};

export default function AppRouter({}: Props) {
    return (
        <div>
            <div className="shadow flex justify-end border-b gap-4 p-4 font-semibold sticky top-0 bg-white z-50">
                <Link to={"/"}>Todo App</Link>
                <Link to={"/context"}>Card App</Link>
            </div>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/context" element={<AppContext />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster position="top-right" />
        </div>
    );
}
