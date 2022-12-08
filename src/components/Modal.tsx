import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    onOk: () => void;
    onCancel: () => void;
    isOpen: boolean;
};

export default function Modal({
    title = "Modal",
    children,
    className,
    footer,
    onCancel,
    onOk,
    isOpen,
}: Props) {
    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    key="modal"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring" }}
                    className="z-10 fixed top-0 left-0"
                >
                    <div className="w-screen h-screen bg-slate-600 opacity-80 fixed z-0" />
                    <div
                        className={`bg-white rounded-md shadow z-10 p-6 ${className} w-[500px] min-h-[400px] 
                        relative top-1/2 left-1/2 translate-x-1/2 translate-y-1/4`}
                    >
                        <button className="absolute top-2 right-4" onClick={onCancel}>
                            x
                        </button>
                        <div className="font-bold text-xl">{title}</div>
                        <hr />
                        <div className="min-h-[320px]">{children}</div>
                        <hr />
                        <div className="mt-4">
                            {footer || (
                                <div className="flex justify-center gap-4">
                                    <button className="btn-primary" onClick={onOk}>
                                        OK
                                    </button>
                                    <button className="btn-secondary" onClick={onCancel}>
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <></>
            )}
        </AnimatePresence>
    );
}
