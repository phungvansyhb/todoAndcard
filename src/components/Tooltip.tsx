import React from "react";
import {motion} from 'framer-motion'

type Props = {
    children: React.ReactElement;
    title: string;
    position?: "top" | "left" | "bottom" | "right";
    triggerType?: "hover" | "click";
};
function renderPosition(position : string){
    if(position === 'top') return '-top-full -left-1/2'
    if(position === 'right') return 'top-0 right-0'
    if(position === 'bottom') return 'bottom-0 left-0'
    if(position === 'left') return 'top-0 left-0'
}
export default function Tooltip({children , title , position='top' , triggerType='hover'}: Props) {
    
    return (
        <div className="relative tooltip-wrapper">
            <motion.title initial={{scale : 0}} animate={{scale:1}} transition={{type:'spring' }} 
                className={`absolute ${renderPosition(position)} hidden bg-slate-500 rounded-sm title`}>
                {title}
            </motion.title>
            {children}
        </div>
    )
}
