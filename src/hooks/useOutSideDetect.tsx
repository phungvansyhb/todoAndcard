import React, { useEffect, useState } from "react";

export default function useOutSideDetect(ref: React.RefObject<HTMLElement>) {
    const [isOutSide, setOutSide] = useState<boolean>(false);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            console.log( 'is contain',
                ref?.current?.contains(event.target as Node)
            );
            
            if (ref.current && !ref.current.contains(event.target as Node) && !isOutSide) {
                console.log('run here');
                setOutSide(true);
            } else if (isOutSide) {
                setOutSide(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return isOutSide ;
}
