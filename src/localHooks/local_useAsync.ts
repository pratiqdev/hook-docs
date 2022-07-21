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
    /** The callback function to invoke */
    callback?: Function;

    /** Supply default data while the promise is pending */
    defaultData?: any;

    /** Load automatically on mount */
    autoLoad?: boolean;

    /** An array of dependencies to watch and reload on change */
    deps?: any[];
}

interface IUseAsyncReturnObject {
    loading: boolean;
    error: any;
    data: any;
}


type UseAsyncType = (config: IUseAsyncConfig) => IUseAsyncReturnObject;






const useAsync: UseAsyncType = (config: IUseAsyncConfig = {}) => {

    const settings = useMemo(() => { return {
        // defaultLoading: _config.defaultLoading   ?? false,
        deps: config.deps                       ?? [],
        defaultData: config.defaultData         ?? null,
        autoLoad: config.autoLoad               ?? false
    }}, [config])

    
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>(settings.defaultData)
    const [error, setError] = useState<any>(null)
    const isLoading = useRef(false)
    const reloadAbandoned = useRef(false)
    const oldDeps = useRef(JSON.stringify(settings.deps))

    if(!config.callback) {
        console.log('useAsync requires a callback function')
        return {loading, error, data};
    }
    
    const callback = useMemo(() => config.callback, [...settings.deps, config.callback])

    const reload = useCallback(() => {
        if(loading || isLoading.current) return;
        isLoading.current = true

        setLoading(true)
        setError(null)
        setData(settings.defaultData)

        config.callback()
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

    }, settings.deps)


    useEffect(() => {
        console.log('dep change:', config.deps)
        reload()
    }, config.deps)
    
    useEffect(() => {
        settings.autoLoad && reload()
    }, [])

    return {data, loading, error, reload}
}

export default useAsync




//! Added extra step to convert array of dependencies to deps object