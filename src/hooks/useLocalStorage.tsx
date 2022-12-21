import { useState } from "react";

type Props<T> = {
    key: string;
    initialValue: T;
};

export default function useLocalStorage<T>({ key, initialValue }: Props<T>) {
    const [localValue, initLocalValue] = useState<T>(() => {
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue;
        }catch(e){
            console.log(e);
            return initialValue
        }
        
    });
    function setLocalValue(value:T | ((value: T)=>T) ){
        try{
            const valueToSet = value instanceof Function ? value(localValue) : value
            initLocalValue(valueToSet)
        }catch(error){
            console.log(error);
        }
      
    }
    return [localValue, setLocalValue];
}
