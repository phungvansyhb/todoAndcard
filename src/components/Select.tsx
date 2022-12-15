import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Control } from 'react-hook-form';
import ArrowSelect from '../components/Icons/ ArrowSelect';
import { InputProps } from "./Input";

interface SelectProps extends InputProps {
    options: { title: React.ReactNode; value: any }[];
    setValue : Function,
    mode? : 'multiple'|'single'
}

export default function Select<T extends SelectProps>({
    register,
    inputType = "text",
    name,
    label,
    errorsMsg,
    validateOption,
    options,
    defaultValue,
    placeHolder,
    setValue,
    mode ='single',
    ...rest
}: T) {
    const [selected, setSelected] = useState<any>(() => {
        // if(Array.isArray(defaultValue)){
        //     /* TODO handle trường hợp multiple */
        //     return options.filter(item=> defaultValue.some(value=>value=== item.value)) 
        // }
        if (defaultValue) {
            return options.find((item) => item.value === defaultValue);
        }
        return {};
    });
    const ref = useRef<HTMLDivElement>(null)
    
    const [toggle, setToggle] = useState<boolean>(false);
    function handleClickOption(value: any) {
        setSelected(value);
    }
    useEffect(()=>{
        if(defaultValue) setValue(name , defaultValue)
    },[])

    return (
        <> 
            {label && <label htmlFor={name}>{label}</label>}
            <div className="relative " onClick={() => setToggle(!toggle)} ref={ref}>
                <button
                    type={"button"}
                    id={name}
                    {...register(name, validateOption)}
                    {...rest}
                    className="relative cursor-pointer w-full border border-gray-300 text-left rounded-md px-3 py-1 text-sm my-2"
                >
                    {selected.title || (
                        <span className="text-slate-400 text-sm">{placeHolder}</span>
                    )}
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                       <ArrowSelect/>
                    </span>
                </button>
                <motion.div
                    key={`dropdown-select-${name}`}
                    initial={{ y: 40 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring" }}
                    className={`absolute ${
                        toggle ? "block" : "hidden"
                    } dropdown-wrapper overflow-hidden overflow-y-auto h-max max-h-48`}
                >
                    {options.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                handleClickOption(item);
                                setValue(name,item.value)
                            }}
                            className="dropdown-item p-2 hover:bg-orange-200 cursor-pointer flex text-sm w-full"
                        >
                            {item.title}
                        </div>
                    ))}
                </motion.div>
            </div>
            {errorsMsg && (
                <AnimatePresence>
                    <motion.div
                        key={`selection-${name}`}
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
