import React from "react";

export default function Icons({
    width = "24px",
    height = "24px",
}: {
    width?: string;
    height?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={width || "1em"}
            height={height || "1em"}
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
    );
}
