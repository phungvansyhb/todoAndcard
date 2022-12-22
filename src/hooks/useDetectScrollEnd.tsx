import React, { useDebugValue, useEffect, useState } from "react";

export default function useDetectScrollEnd() {
    const [isScrollEnd, setScrollEnd] = useState<boolean>(false);
    function checkEndPage() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight-2) {
            setScrollEnd(true);
        } else {
            setScrollEnd(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", checkEndPage);
        return () => window.removeEventListener("scroll", checkEndPage);
    }, []);
    useDebugValue(isScrollEnd ? "end" : "still body");
    return isScrollEnd;
}
