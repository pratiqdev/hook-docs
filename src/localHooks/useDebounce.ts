import {useRef, useCallback, useEffect, useMemo} from 'react'
import debounce from './utils/debounce'

/**
 * useDebounce()
 * ---
 * ~ THIS DOES NOT NEED TO BE A HOOK. USE LODASH DIRECTLY INSTEAD
 */

interface IUseDebounceConfig {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
    wait?: number;
}

const useDebounce = (func: Function, options: IUseDebounceConfig = {}) => {

    const timerId = useRef<any>(undefined)
    const lastCallTime = useRef<any>(undefined)
    const lastArgs = useRef<any>(undefined)
    const lastThis = useRef<any>(undefined)
    const lastInvokeTime = useRef<any>(0)


    const settings = useMemo(() => { return {
        leading: options.leading                ?? false,
        trailing: options.trailing              ?? true,
        maxing: options.maxWait                 ? true : false,
        maxWait: options.maxWait                ?? undefined,
        wait: options.maxWait                   ?? 0,
    }}, [options])





    var 
    // lastArgs,
    // lastThis,
    // maxWait,
    result
    // timerId,
    // lastCallTime,
    // lastInvokeTime = 0,
    // leading = false,
    // maxing = false,
    // trailing = true;

    

    // if (typeof func != 'function') {
    //     throw new TypeError('debounce requires a function type callback');
    // }

    // if (typeof options === 'object') {
    //     leading = !!options.leading;
    //     maxing = 'maxWait' in options;
    //     maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
    //     trailing = 'trailing' in options ? !!options.trailing : trailing;
    // }

    // ------------------------------------------------
    function invokeFunc(time: number) {
        console.log('invokeFunc')
        var args = lastArgs.current,
            thisArg = lastThis.current;

        lastArgs.current = lastThis.current = undefined;
        lastInvokeTime.current = time;
        result = func.apply(thisArg, args);
        return result;
    }

    // ------------------------------------------------
    function leadingEdge(time: number) {
        console.log('leadingEdge')

        // Reset any `maxWait` timer.
        lastInvokeTime.current = time;
        // Start the timer for the trailing edge.
        timerId.current = setTimeout(timerExpired, settings.wait);
        // Invoke the leading edge.
        return settings.leading ? invokeFunc(time) : result;
    }

    // ------------------------------------------------
    function remainingWait(time: number) {
        var timeSinceLastCall = time - lastCallTime.current,
            timeSinceLastInvoke = time - lastInvokeTime.current,
            timeWaiting = settings.wait - timeSinceLastCall;

        return settings.maxing
            ? Math.min(timeWaiting, settings.maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }

    // ------------------------------------------------
    function shouldInvoke(time: number) {
        console.log('shouldInvoke')

        var timeSinceLastCall = time - lastCallTime.current,
            timeSinceLastInvoke = time - lastInvokeTime.current;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime.current === undefined || (timeSinceLastCall >= settings.wait) ||
            (timeSinceLastCall < 0) || (settings.maxing && timeSinceLastInvoke >= settings.maxWait));
    }

    // ------------------------------------------------
    function timerExpired() {
        console.log('timerExpired')

        var time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId.current = setTimeout(timerExpired, remainingWait(time));
    }

    // ------------------------------------------------
    function trailingEdge(time: number) {
        console.log('trailingEdge')

        timerId.current = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (settings.trailing && lastArgs.current) {
            return invokeFunc(time);
        }
        lastArgs.current = lastThis.current = undefined;
        return result;
    }

    // ------------------------------------------------
    function cancel() {
        console.log('cancel')

        if (timerId.current !== undefined) {
            clearTimeout(timerId.current);
        }
        lastInvokeTime.current = 0;
        lastArgs.current = lastCallTime.current = lastThis.current = timerId.current = undefined;
    }

    // ------------------------------------------------
    function flush() {
        console.log('flush')

        return timerId.current === undefined ? result : trailingEdge(Date.now());
    }

    // ------------------------------------------------
    function debounced() {
        console.log('useDebounce | trigger')
        var time = Date.now(),
        isInvoking = shouldInvoke(time);

        lastArgs.current = arguments;
        lastThis.current = this;
        lastCallTime.current = time;

        if (isInvoking) {
            if (timerId.current === undefined) {
                return leadingEdge(lastCallTime.current);
            }
            if (settings.maxing) {
                // Handle invocations in a tight loop.
                clearTimeout(timerId.current);
                timerId.current = setTimeout(timerExpired, settings.wait);
                return invokeFunc(lastCallTime.current);
            }
        }
        if (timerId.current === undefined) {
            timerId.current = setTimeout(timerExpired, settings.wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    
    useEffect(()=>{
        return () => {
            clearTimeout(timerId.current)
        }
    }, [])
    
    return debounced;
    // //___________________________________________________________
    // const isRunning = useRef(false)
    // const timer = useRef<any>(null)




    // const handleTrigger = () => {
    //     console.log('useDebounce | handleTrigger')
    //     debounce(callback, delay, config)
    // }

    // useEffect(()=>{
    //     return () => clearTimeout(timer.current)
    // })

    // return handleTrigger



}

export default useDebounce