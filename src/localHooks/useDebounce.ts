import {useRef, useCallback, useEffect} from 'react'

/**
 * useDebounce()
 * ---
 * 
 * Debounce the callback function provided.
 * Is invoked anytime a dependency changes
 * 
 * @param {function} callback
 * @param {number} delay
 * @param {array} dependencies
 * @returns void
 * 
 * @example
 * 
 * useDebounce(myFunction, 1000, [count])
 */

const useDebounce = (callback: Function, delay: number = 1000, leading: boolean = true) => {

    // const debounce = (func, delay) => {
    //     let debounceTimer
    //     return function() {
    //         const context = this
    //         const args = arguments
    //             clearTimeout(debounceTimer)
    //                 debounceTimer
    //             = setTimeout(() => func.apply(context, args), delay)
    //     }
    // } 



    //___________________________________________________________
    const isRunning = useRef(false)
    const timer = useRef<any>(null)




    const handleTrigger = () => {
        console.log('---------------')

        clearTimeout(timer.current);

        if(isRunning.current) return;
        isRunning.current = true

        
        
        if(leading){
            console.log('leading - callback()')
            callback(); 
            timer.current = setTimeout(() => {
                isRunning.current = false
            }, delay);
        }else{
            console.log('trailing - callback()')
            timer.current = setTimeout(() => { 
                callback(); 
            }, delay);
        }

    }

    useEffect(()=>{
        return () => clearTimeout(timer.current)
    })

    return handleTrigger



}

export default useDebounce