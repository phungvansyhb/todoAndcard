import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RegisterOptions } from "react-hook-form";

export type InputProps = {
    label?: string;
    inputType?: string;
    name: string;
    validateOption?: RegisterOptions;
    register: Function;
    errorsMsg?: string;
    placeHolder?:string;
    defaultValue?:any
}

export default function Input<T extends InputProps>({
    register,
    inputType = "text",
    name,
    label,
    errorsMsg,
    validateOption,
    placeHolder,
    defaultValue,
    ...rest
}: T) {
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <input type={inputType} id={name} {...register(name, validateOption)} placeholder={placeHolder} defaultValue={defaultValue} {...rest} />
            {errorsMsg && (
                <AnimatePresence>
                    <motion.div
                        key={`input-${name}`}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10 }}
                        transition={{ type: "spring" }}
                        className="text-red-400 pb-2 ml-2 text-sm"
                    >
                        {errorsMsg}
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
}
