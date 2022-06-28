import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
    
/**
* useAsync()
* ---
* 
* useEffect hook that doesn't run on the first call
* 
* @param {string} key - the key for the storage item
* @returns void
* 
* @example
* 
*/ 



export interface IUseAsyncConfig {
    /** Supply default data while the promise is pending */
    defaultData?: any;
    /** Set loading state used on mount */
    defaultLoading?: boolean;
    /** Load automatically on mount */
    manualLoad?: boolean;
}

interface IUseAsyncReturnObject {
    loading: boolean;
    error: any;
    data: any;
}

type UseAsyncType = (callback: Function, config?: IUseAsyncConfig, deps?: any[]) => IUseAsyncReturnObject;






const useAsync: UseAsyncType = (_callback, _config = {}, _deps = []) => {

    const settings = useMemo(() => { return {
        defaultLoading: _config.defaultLoading   ?? false,
        defaultData: _config.defaultData         ?? null,
        manualLoad: _config.manualLoad           ?? false
    }}, [_config])

    
    const [loading, setLoading] = useState(settings.defaultLoading)
    const [data, setData] = useState<any>(settings.defaultData)
    const [error, setError] = useState<any>(null)
    const isLoading = useRef(false)
    const reloadAbandoned = useRef(false)
    const oldDeps = useRef(JSON.stringify(_deps))

    if(!_callback) {
        console.log('useAsync requires a callback function')
        return {loading, error, data};
    }
    
    const deps = useMemo(()=>{ return [..._deps]}, [_deps])
    const callback = useMemo(() => _callback, [..._deps, _callback])

    const reload = useCallback(() => {
        if(loading || isLoading.current) return;
        isLoading.current = true

        setLoading(true)
        setError(null)
        setData(settings.defaultData)

        _callback()
            .then(data => {
                setData(data)
                setError(null)
            })
            .catch(err => {
                setError(err)
                setData(settings.defaultData)
            })
            .finally(()=>{
                setLoading(false)
                isLoading.current = false
            })

    }, [..._deps])


    useEffect(() => {
        console.log('dep change:', deps)
        reload()
    }, [..._deps])
    
    useEffect(() => {
        !settings.manualLoad && reload()
    }, [])

    return {data, loading, error, reload}
}

export default useAsync




//! Added extra step to convert array of dependencies to deps object