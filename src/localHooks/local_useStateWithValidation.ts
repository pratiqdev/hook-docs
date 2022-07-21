import {useState, useCallback, useEffect, useMemo} from 'react'
    
/**
 * useStateWithValidation()
 * ---
 * 
 * useState with validation callback handler
 * 
 * @param {function} validator - the function used for validation
 * @param {any} initialValue - initial state value
 * @returns state, setter, and boolean isValid
 * 
 * @example
 * 
 */

interface IUseStateWithValidationConfig {
    validator?: any,
    value?: any;
}

const useStateWithValidation = (config: IUseStateWithValidationConfig = {}) => {

    const returnTrue = () => true

    const settings = useMemo(() => ({
        validator:  config.validator    ?? returnTrue,
        value:      config.value        ?? null
    }), [config])



    const handleValidate = (v: any) => {
        return typeof settings.validator === 'function' 
                ? settings.validator(v) 
                : settings.validator instanceof RegExp
                    ? v.test(settings.validator)
                    : v === settings.validator
    }


    const [value, setValue] = useState(settings.value)
    const [lastValidValue, setLastValidValue] = useState(null)
    const [isValid, setIsValid] = useState(() => handleValidate(settings.value))


    const handleChange = useCallback(newValue => {
        const v = typeof newValue === 'function' ? newValue(value) : newValue
        setValue(v)
        let isV = handleValidate(v)
        setIsValid(isV)
        isV && setLastValidValue(v)
    }, [settings.validator, value])


    useEffect(()=>{
        let isV = handleValidate(value)
        setIsValid(isV)
        isV && setLastValidValue(value)
    },[])

    // return [value, handleChange, isValid, lastValidValue]
    return {
        value,
        setValue: handleChange,
        isValid,
        lastValidValue
    }
}

export default useStateWithValidation