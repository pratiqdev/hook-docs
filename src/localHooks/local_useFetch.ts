import {useState, useRef, useEffect, useMemo} from 'react'


// const defaultOptions = {
//     headers: {
//         "Content-Type":"application/json",
//         "Access-Control-Allow-Origin": "*"
//     },
// }

export interface I_Fetch {
    watch?: any[];
    expire?: number;
    options?: object;
    initialData?: any;
    autoLoad?: boolean;
}

/**
* useFetch()
* ---
* 
* Handler for fetch requests
* 
* @param {string} url - the url of the request
* @param {object} options - request options
* @param {number} expire - expiration of the request in seconds 
* @param {array} watch - array of dependencies to trigger a new request
* @returns {object} states {loading, value, error}
* 
* @example
* 
*/

const useFetch = (url: string = '', config: I_Fetch) => {

    const settings = useMemo(() => { return {
        options: config.options         ?? {},
        watch: config.watch             ?? [],
        expire: config.expire           ?? 5_000,
        initialData: config.initialData ?? null,
        autoLoad: config.autoLoad       ?? true,
    }}, [config])


    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState<any>(null)
    const [value, setValue] = useState<any>(settings.initialData)
    let done = useRef(false)
    let init = useRef(false)

    let expireHandle: any = useRef()



    const handleExpire = () => {
        if(!done.current){
            clearTimeout(expireHandle.current)
            setError(`Request expired. Expiration set to ${settings.expire} ms`)
            setValue(settings.initialData)
            setLoading(false)
            setLoaded(false)
            done.current = true
        }
    }

    function errorIntercept(response: any) {
        if (!response.ok) {
            setError(response.statusText)
            done.current = true
        }
        return response;
    }
    

    const handleError = (e: any) => {
        if(!done.current){
            clearTimeout(expireHandle.current)
            done.current = true
            try{
                if(e && e instanceof TypeError){ setError(e.message)}
                else if(e && typeof e === 'object'){ setError(e) }
                else if(e){ setError(e) }
                else{ setError(true) }
            }catch(err){
                setError(true)
                setValue(settings.initialData)
            }finally{ 
                setLoading(false)
                setLoaded(false)
            }
        }
    }

    const handleValue = (v: any) => {
        if(!done.current){
            clearTimeout(expireHandle.current)
            done.current = true
            setValue(v)
            setError(undefined)
            setLoading(false)
            setLoaded(true)
        }
    }


    const reset = () => {
        setLoaded(false)
        setLoading(false)
        setError(null)
        setValue(settings.initialData)

    }

    const reload = () => {
        done.current = false
        console.log('reload')
        clearTimeout(expireHandle.current)
        expireHandle.current = setTimeout(handleExpire, settings.expire);
        setLoading(true)
        setLoaded(false)
        setError(null)
        setValue(settings.initialData)
        
        try{

            fetch(url, settings.options)
            .then(errorIntercept)
            .then(res => {
                if (res && res.ok) { return res.json() }
                else if(!res){ handleError('No response') }
            })
            .then(res => {
                handleValue(res)
            })
            .catch(err => {
                handleError(err)
            })

        }catch(err){ 
            handleError(err) 
        }
    }
    
    useEffect(() => {
        if(!init.current) return;
        console.log('useFetch | use effect')
        reload()
        
        return () => clearTimeout(expireHandle.current)
        // eslint-disable-next-line
    }, [...settings.watch, url])

    useEffect(()=>{
        console.log('autoload')
        settings.autoLoad && reload()
        init.current = true
    },[])

    return {value, loading, loaded, error, reload, reset}
}

export default useFetch

/*
--------------------------------------------------------------------- CHANGELOG

- converted return object to an array and altered order of return values
- altered config interface to allow optional values
- added default config object with empty string url



-------------------------------------------------------------------------- TODO

! loaded
- consider adding loaded boolean state to return

! initialData
- consider adding initialData item to config, with reset function provided in 
- return object to reset state to initial values

! config.autoLoad: boolean
- consider adding a config flag for autoLoad that can prevent the request from
- loading until the user invokes `reload` function

? should loading / reloading remove the current state?
> this would prevent old data from showing while loading... makes sense for now 

*/