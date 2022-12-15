import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from '../components/Icons/CloseIcon'

type Props = {
    title?: string;
    children?: React.ReactNode;
    className?: string;
    footer?: React.ReactNode;
    onOk?: (param: any) => unknown;
    onCancel?: (param: any) => unknown;
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
                    className="fixed top-0 left-0 z-20"
                >
                    <div className="w-screen h-screen bg-slate-600 opacity-80 fixed z-10" />
                    <div className="w-screen h-screen flex justify-center items-center z-20">
                        <div
                            className={`bg-white rounded-md shadow z-20 p-6 ${className} w-[500px] min-h-[400px] relative`}
                        >
                            <button className="absolute top-4 right-4" onClick={onCancel}>
                                <CloseIcon/>
                            </button>
                            <div className="font-bold text-xl">{title}</div>
                            <hr />
                            <div className="min-h-[320px] p-4">{children}</div>
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
                    </div>
                </motion.div>
            ) : (
                <></>
            )}
        </AnimatePresence>
    );
}
