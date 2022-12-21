import React from "react";
import BlockIcon from './components/Icons/Block'
import { Link } from "react-router-dom";
type Props = {};


export default function PageNotFound({}: Props) {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-6"> 
            <span className="font-bold text-5xl flex gap-4 items-center">Page Not Found <BlockIcon width="60px" height="60px"/></span>
            <Link to ='/redux'>Click here to back</Link>
        </div>
    );
}
