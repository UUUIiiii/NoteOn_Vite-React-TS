import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, inirialValue: T | (()=>T)){
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue == null) {
            if (typeof inirialValue === "function"){
                return (inirialValue as () => T)()
            }  else {
                return inirialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    })
    return [value, setValue] as [T, typeof setValue]
}