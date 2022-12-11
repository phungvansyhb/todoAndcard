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
            strokeWidth={1.5}
            stroke="currentColor"
            width={width || "1em"}
            height={height || "1em"}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
}
