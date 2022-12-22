import React from "react";
import ReactDOM from "react-dom/client";
import {
    QueryClient,
    QueryClientProvider
} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import ErrorPage from "./screens/ErrorPage";
import { store } from "./store/store";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement , {identifierPrefix : 'Task-'}).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ErrorPage>
                    <QueryClientProvider client={queryClient}>
                        <AppRouter />
                        <ReactQueryDevtools initialIsOpen={import.meta.env.DEV} />
                    </QueryClientProvider>
                </ErrorPage>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
