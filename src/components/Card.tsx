import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useNavigate} from 'react-router-dom'


type Props = {
    id:string |number;
    avatar: string;
    title?: string;
    content?: string;
    className?: string;
};

export function Card(props: Props) {
    const { avatar, title, content, className,id, ...rest } = props;
    const navigate = useNavigate()
    return (
        <div
            className={`p-4 cursor-pointer rounded-lg shadow flex flex-col gap-4 ${className} w-[300px] h-max border`}
            onClick={()=>navigate(`/card/${id}`)}
        >
            {avatar && (
                <LazyLoadImage
                    src={avatar}
                    alt="image"
                    className="w-full rounded-lg border"
                    effect="blur"
                    
                />
            )}
            {title && <div className="font-bold text-2xl">{title}</div>}
            {/* {content && <div className="line-clamp-2 ">{content}</div>} */}
        </div>
    );
}
export function CardHolder() {
    return (
        <div className={`p-4 rounded-lg shadow flex flex-col gap-4 w-[300px] h-[400px] border`}>
            <div className="w-full h-2/3 rounded-lg border bg-gray-400"></div>
            <div className="w-full h-1/6 rounded-lg border bg-gray-400"></div>
            <div className="w-full h-1/6 rounded-lg border bg-gray-400"></div>
        </div>
    );
}
