import {useState, useEffect, useRef, useMemo} from 'react'
    
/**
* useGeolocation()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @param {string} options - options passed to navigator
* @returns geolocation data

* @example
* 
*/

interface IUseGeolocationOptions {
    /** 
     * A positive long value indicating the maximum age in milliseconds of a 
     * possible cached position that is acceptable to return. If set to 0, it 
     * means that the device cannot use a cached position and must attempt to 
     * retrieve the real current position. If set to Infinity the device must 
     * return a cached position regardless of its age. Default: 0.
     */
    maximumAge?: number;

    /**
     * A positive long value representing the maximum length of time (in 
     * milliseconds) the device is allowed to take in order to return a 
     * position. The default value is Infinity, meaning that 
     * getCurrentPosition() won't return until the position is available.
     */
    timeout?: number;

    /**
     * A boolean value that indicates the application would like to receive the 
     * best possible results. If true and if the device is able to provide a 
     * more accurate position, it will do so. Note that this can result in 
     * slower response times or increased power consumption (with a GPS chip 
     * on a mobile device for example). On the other hand, if false, the device 
     * can take the liberty to save resources by responding more quickly and/or 
     * using less power. Default: false.
     */
    enableHighAccuracy?: boolean;

}

const useGeolocation = (options: IUseGeolocationOptions = {}) => {
    const [error, setError] = useState<any>(null)
    const [data, setData] = useState(null)
    const lastTime = useRef<any>(Date.now())

    useEffect(()=>{
        console.log('MOUNTED -------------------')
        return () => console.log('UNMOUNTED -------------')
    }, [])



    useEffect(()=>{
        const successHandler = (e: any) => {
            setError(null)
            const {
                accuracy,
                altitudeAccuracy,
                heading,
                latitude,
                longitude,
                speed,
            } = e.coords;

            let delta = e.timestamp - lastTime.current
            lastTime.current = e.timestamp

            setData({
                accuracy,
                altitudeAccuracy,
                heading,
                latitude,
                longitude,
                speed,
                timestamp: e.timestamp,
                delta
            })
        }
        
        const errorHandler = (e:any) => {
            console.log('error:',e)
            setError(e.message)
            setData(null)
        }

        navigator.geolocation.getCurrentPosition(
            successHandler,
            errorHandler,
            options
        )

        const id = navigator.geolocation.watchPosition(
            successHandler,
            errorHandler,
            options
        )
        return () => navigator.geolocation.clearWatch(id)
    }, [...Object.values(options)])

    useEffect(()=>{ console.log('option change') },[options])
    useEffect(()=>{ console.log('data change') },[data])
    useEffect(()=>{ console.log('error change') },[error])

    return {data, error}

}

export default useGeolocation