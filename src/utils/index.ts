import { useEffect, useState } from 'react'
export const isFalsy = (value: any) => value === 0 ? false : !value;

/* 请求的时候删除为空的属性和属性值*/
export const cleanObject = (object: object) => {
    const result = { ...object };
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key];
        // @ts-ignore //暂时不处理ts报错
        if (isFalsy(value)) delete result[key];
    })
    return result
}

/* 
    custom Hook

    debounce
    减少高频率的请求次数
    输入事件,keyCode事件,窗口事件
*/

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [])
}

/*
    setTimeout 解决防抖的问题;
    多个log事件同步运行;
    在1s内 log(1) ,,,,,log(n);


    使用防抖后,
    使用闭包的方法,
    第一次初始化的时候 有一个,
    第二次的爸第一次的干掉
    ...
    只会执行最后一次的调用

*/
// export const useDebounce = (func, delay) => {
//     return (...params) => {
//         let timeout;
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         setTimeout(() => {
//             func(...params)
//         }, delay)
//     }
// }

export const useDebounce = (value: any, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    /* 初始化的时候默认会有一个定时器的 
     当输入的时候value改变时,创建一个定时器

    useEffect 里面的内容是在上一次运行完成之后才运行的，所以清除的是上一次的定时器
    
    */
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        return () => {
            /* 删除上一个的定时器 */
            clearTimeout(timeout)
        }
    }, [value, delay])
    return debounceValue;
}