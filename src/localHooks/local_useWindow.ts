import {useState, useEffect} from 'react'
import isBrowser from './utils/isBrowser'  

/**
* useValidCss()
* ---
* 
* useState that returns if CSS prop/value is valid
* 
* @param {string} cssProp - the prop used to validate the value
* @param {string} cssString - the prop used to validate the value
* @returns A stateful value and true if valid

* @example
* 
*/

const useWindow = () => {

    if (!isBrowser()) return;

    let _body = document.body,
        _html = document.documentElement;

    function toFixedNumber(num: number, digits: number = 0, base: number = 10){
        var pow = Math.pow(base, digits);
        return Math.round(num*pow) / pow;
    }



    const [windowSize, setWindowSize] = useState<any>({
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: toFixedNumber(window.innerWidth / window.innerHeight, 2),
        maxHeight: Math.max( _body.scrollHeight, _body.offsetHeight, _html.clientHeight, _html.scrollHeight, _html.offsetHeight ),
        scrollY: toFixedNumber(window.scrollY),
        scrollX: toFixedNumber(window.scrollX),
        angle: 0,
        type: 'landscape-primary',
    })

    const handler = () => {
        // const { orientation } = window.screen as any;
        const screen = window?.screen as any
        var so = screen?.orientation || screen?.mozOrientation || screen?.msOrientation;
        // const { angle, type } = orientation;
        const angle = so.angle || 0
        const type = so.type || 'landscape-primm'

        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            // ratio: window.innerWidth > window.innerHeight ? (window.innerWidth / window.innerHeight).toFixed(2) : window.innerHeight / window.innerWidth,
            ratio: toFixedNumber(window.innerWidth / window.innerHeight, 2),

            maxHeight: Math.max( _body.scrollHeight, _body.offsetHeight, _html.clientHeight, _html.scrollHeight, _html.offsetHeight ),
            scrollY: toFixedNumber(window.scrollY),
            scrollX: toFixedNumber(window.scrollX),
            angle,
            type,
        })
    }

    useEffect(() => {
        handler()
        window.addEventListener('resize', handler)
        window.addEventListener('scroll', handler)
        window.screen.orientation.addEventListener('change', handler, true);

        return () => {
            window.removeEventListener('resize', handler)
            window.removeEventListener('scroll', handler)
            window.screen.orientation.removeEventListener('change', handler, true);
        }
    })



    return windowSize
}

export default useWindow