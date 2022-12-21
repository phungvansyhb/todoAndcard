import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDom from 'react-dom'

type Props = {    
    title: React.ReactNode;
    message: React.ReactNode;
    status?: "success" | "warning" | "error";
    position?: "bottom" | "top";
    align?: "start" | "center" | "end";
};
enum POSION {
    bottom = "bottom-40",
    top = "top-40",
    start = "left-40",
    end = "right-40",
    center = "left-1/2 -translate-x-1/2",
}

export default function Notification({ align = 'start', message, position = 'top', status, title }: Props) {
    // const cssClassName = ()=>{
    //     return 'fixed z-90 shadow-lg'
    // }
    return (
        ReactDom.createPortal(  <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`fixed z-90 shadow-lg ${POSION[position]} ${POSION[align]}`}
            >
                {title}
                {message}
            </motion.div>
        </AnimatePresence> , document.querySelector('body')!)
      
    );
}
