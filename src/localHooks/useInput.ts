import {useMemo, useState, useCallback, useEffect, useRef, CSSProperties} from 'react'
    

export enum StyleGroupNames {
    
    DEFAULT = 'default',
    DEFAULT_HOVER = 'default-hover',
    DEFAULT_FOCUS = 'default-focus',
    DEFAULT_ACTIVE = 'default-active',
    
    VALID = 'valid',
    VALID_HOVER = 'valid-hover',
    VALID_FOCUS = 'valid-focus',
    VALID_ACTIVE = 'valid-active',
    
    INVALID = 'invalid',
    INVALID_HOVER = 'invalid-hover',
    INVALID_FOCUS = 'invalid-focus',
    INVALID_ACTIVE = 'invalid-active',
}



export interface I_useInputConfig {
    type?: string;
    name?: string;
    style?: { [Property in StyleGroupNames]: CSSProperties | string };
    rootStyle?: { [key: string]: CSSProperties };
    className?: string;
    value?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    invalidMessage?: string;
    validOnDefault?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    validator?: (value: string) => boolean;
    onValidated?: (value: string) => void;
    onActive?: (value: string) => void;
    onHover?: (value: string) => void;
    onFocus?: (value: string) => void;
    onBlur?: (value: string) => void;
}

/**
 * useInput()
 * ---
 * 
 * Provide simple bindings between state and an input. 
 * 
 * @param config - config object
 * @param string - some string
 * 
 * @example
 * const username = useInput({
 *      placeholder: 'Username',
 *      validateOnChange: true,
 *      validator: (v) => /^[a-z0-9]+$/.test(v)
 * })
 * 
 * <input {...username.bind} />
 * 
 */


const useInput = (config: I_useInputConfig = {}) => {

    const getDefaultStyle = () => {
        let res = {}
        Object.values(StyleGroupNames).forEach(x => {
            res[x] = {}
        })
        return res
    }


    const settings = useMemo(() => { return {
        type: config.type                           ?? 'text',
        name: config.name                           ?? '',
        rootStyle: config.rootStyle                 ?? {},
        style: config.style                         ?? getDefaultStyle(),
        className: config.className                 ?? '',
        value: config.value                         ?? '',
        placeholder: config.placeholder             ?? '',
        readOnly: config.readOnly                   ?? false,
        disabled: config.disabled                   ?? false,
        invalidMessage: config.invalidMessage       ?? '',
        validOnDefault: config.validOnDefault       ?? false,
        validateOnChange: config.validateOnChange   ?? false,
        validateOnBlur: config.validateOnBlur       ?? false,
        validator: config.validator                 ?? null,
        onActive: config.onActive                   ?? null,
        onHover: config.onHover                     ?? null,
        onFocus: config.onFocus                     ?? null,
        onBlur: config.onBlur                       ?? null,
    }}, [config])

    //+ ///////////////////////////////////////////////////////////////// STATE

    const [value, setValue] = useState(settings.value)
    const [wasValidated, setWasValidated] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [invalidMessage, setInvalidMessage] = useState('')
    const [isEmpty, setIsEmpty] = useState(value?.toString().length === 0)
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [style, setStyle] = useState({})
    const [className, setClassName] = useState('')
    
    //+ ///////////////////////////////////////////////////////////// FUNCTIONS

    const handleValidate = useCallback(() => {
        console.log('handleValidate')
        setWasValidated(true)
        
        if(settings.validator){
            if(settings.validator instanceof RegExp){
                let validatorResult = settings.validator.test(value)
                setIsValid(validatorResult)
                setInvalidMessage(validatorResult ? '' : settings.invalidMessage)
            }else if(typeof settings.validator === 'function'){
                let validatorResult = settings.validator(value)
                setIsValid(validatorResult)
                setInvalidMessage(validatorResult ? '' : settings.invalidMessage)
            }
        }else{
            setIsValid(true)
            setInvalidMessage('')
        }
    }, [settings, value])


    const handleReset = () => {
        setIsValid(settings.validOnDefault)
        setIsEmpty(value?.toString().length === 0)
        setValue(settings.value)
        setWasValidated(false)
        setInvalidMessage('')
    }


    const handleChange = (e) => {
        if(settings.type === 'checkbox'){
            setValue(e.target.checked)
        }else{
            setValue(e.target.value)
        }
    }

 




    //+///////////////////////////////////////////////////////////////// EVENTS
    
    const onMouseEnter = () => {
        setIsHovered(true)
        settings.onHover && settings.onHover(value)
    }

    const onMouseLeave = () => {
        setIsHovered(false)
        setIsActive(false)
    }
    
    const onMouseUp = () => {
        setIsActive(false)
    }

    const onMouseDown = () => {
        setIsActive(true)
    }
    
    const onFocus = () => {
        setIsFocused(true)
        settings.onFocus && settings.onFocus(value)
    }

    const onBlur = () => {
        setIsFocused(false)
        setIsHovered(false)
        settings.onBlur && settings.onBlur(value)
        settings.validateOnBlur && handleValidate()
    }




    //+ ///////////////////////////////////////////////////////////////// SETUP

    useEffect(()=>{
        // setting styles should go in order from least important to most

        const handleClassVsStyle = (SGN) => {
            if(typeof settings.style[SGN] === 'string'){
                setClassName(settings.className + ' ' + settings.style[SGN])
                setStyle({...settings.rootStyle})
            }else{
                setStyle({...settings.rootStyle, ...settings.style[SGN]})
                setClassName(settings.className)
            }
        }

        
        if(wasValidated){
            if(isValid){
                if(isFocused) handleClassVsStyle(StyleGroupNames.VALID_FOCUS) 
                if(isHovered) handleClassVsStyle(StyleGroupNames.VALID_HOVER)
                if(isActive) handleClassVsStyle(StyleGroupNames.VALID_ACTIVE)
                if(!isHovered && !isActive && !isFocused) handleClassVsStyle(StyleGroupNames.VALID)
            }else{
                if(isFocused) handleClassVsStyle(StyleGroupNames.INVALID_FOCUS) 
                if(isHovered) handleClassVsStyle(StyleGroupNames.INVALID_HOVER)
                if(isActive) handleClassVsStyle(StyleGroupNames.INVALID_ACTIVE)
                if(!isHovered && !isActive && !isFocused) handleClassVsStyle(StyleGroupNames.INVALID)
            }
            
        }else{
            if(isFocused) handleClassVsStyle(StyleGroupNames.DEFAULT_FOCUS) 
            if(isHovered) handleClassVsStyle(StyleGroupNames.DEFAULT_HOVER)
            if(isActive) handleClassVsStyle(StyleGroupNames.DEFAULT_ACTIVE)
            if(!isHovered && !isActive && !isFocused) handleClassVsStyle(StyleGroupNames.DEFAULT)
        }


    }, [isHovered, isFocused, isValid, isEmpty, isActive, wasValidated, value])
    

    
    const initRef = useRef(false)

    useEffect(()=>{
        if(!initRef.current){
            if(settings.validator){
                if(settings.validator instanceof RegExp){
                    setIsValid(settings.validator.test(value))
                }else if(typeof settings.validator === 'function'){
                    setIsValid(settings.validator(value))
                }
            }else{
                setIsValid(true)
            }
        }
        
        if(settings.validateOnChange && initRef.current){
            handleValidate()
        }
        setIsEmpty(value.toString().length === 0)
        
        initRef.current = true
    },[value, settings.validateOnChange])





    //+ //////////////////////////////////////////////////////////////// RETURN

    return {
        value,
        setValue,

        validate: handleValidate,
        reset: handleReset,
        
        isValid,
        isEmpty,
        isHovered,
        isFocused,
        wasValidated,
        invalidMessage,

        bind: {
            value,
            style,
            className,
            type: settings.type,
            name: settings.name,
            readOnly: settings.readOnly,
            disabled: settings.disabled,
            placeholder: settings.placeholder,
            onFocus,
            onBlur,
            onMouseEnter,
            onMouseLeave,
            onMouseUp,
            onMouseDown,
            onReset: handleReset,
            onChange: (e:any) => handleChange(e),
            onClick: (e:any) => handleChange(e),
        },
    };
    
    
}

export default useInput