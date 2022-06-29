import {useRef, useEffect, useCallback} from 'react'

/**
 * useInterval()
 * ---
 * 
 * Run a timeout on component mount. Optionally clear or reset the timeout
 * 
 * @param {function} callback
 * @param {number} delay
 * 
 * @example
 * 
 * useTimeout(myFunction, 1000)
 * const {clear, reset} = useTimeout(myFunction, 1000)
 * 
 */

const useInterval = (callback: any = () => {}, delay: number = 1000, autoStart: boolean = true) => {
    const callbackRef = useRef(callback)
    const intervalRef = useRef<any>()

    useEffect(()=>{
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(()=>{
        intervalRef.current = setInterval(callbackRef.current, delay)
    }, [delay])
    
    const clear = useCallback(()=>{
        intervalRef.current && clearInterval(intervalRef.current)
    }, [])

    useEffect(() => {
        autoStart && set()
        return clear
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    return { reset, stop: clear }
};

export default useInterval