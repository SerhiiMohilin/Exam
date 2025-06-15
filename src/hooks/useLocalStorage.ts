import { useState, useEffect } from "react";

type ReturnType<T = string> = [T | null, (v: T) => void, () => void];

export const useLocalStorage = <T = string>(key: string, isObject: boolean = false): ReturnType<T> => {
    const [value, setValue] = useState<T | null>(null);
    useEffect(() => {
        if (key) {
            const lsValue = localStorage.getItem(key);
            if (lsValue) {
                setValue(isObject ? JSON.parse(lsValue) : lsValue)
            }
        }
    }, [isObject, key]);

    const changeLsValue = (val: T) => {
        if (isObject) {
            localStorage.setItem(key, JSON.stringify(val))
        } else {
            localStorage.setItem(key, val as string);
        }

        setValue(val);
    };

    const clearLsValue = () => {
        localStorage.removeItem(key);
        setValue(null);
    }

    return [value, changeLsValue, clearLsValue]
}
