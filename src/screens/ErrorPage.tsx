import React, { Component, ErrorInfo, ReactNode } from "react";
import BlockIcon from "../components/Icons/Block";
import { withRouter } from "../HOC/withRouter";
import { NavigateFunction } from "react-router-dom";

interface Props {
    children?: ReactNode;
    navigate: NavigateFunction;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };
    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: null, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        const isDev = import.meta.env.DEV;
        if (this.state.hasError) {
            return (
                <div className="w-screen h-screen flex flex-col justify-center items-center gap-6">
                    <span className="font-bold text-5xl flex gap-4 items-center">
                        Page Error <BlockIcon width="30px" height="30px" />
                    </span>
                    <span
                        onClick={() => {
                            this.props.navigate(-1);
                        }}
                    >
                        Click here to back
                    </span>
                    {isDev && (
                        <>
                            <div className="mx-8 px-8 rounded-2xl text-red-600 text-2xl">
                                {this.state.error?.message}
                            </div>
                            <div className="mx-8 px-8 rounded-2xl text-red-600">
                                {this.state.errorInfo?.componentStack}
                            </div>
                        </>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);
