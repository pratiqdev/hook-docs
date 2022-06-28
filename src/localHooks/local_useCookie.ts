import {useState} from 'react'
import isBrowser from './utils/isBrowser'
    
/**
* useClipboard()
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

const useCookie= (key: string) => {
    if (!isBrowser()) return;

    const getCookie = () => {
        console.log('getCookie')
        let name = key + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                console.log('getCookie | return:', c.substring(name.length, c.length))
                return c.substring(name.length, c.length);
            }
        }
        console.log('getCookie | return: ""')
        return "";
    }



    const [value, setValue] = useState(getCookie)


    const handleCookie = (value: string, expiration: number = 86_400_000) => {
        const d = new Date();
        d.setTime(d.getTime() + (expiration));
        let expires = "expires="+d.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/; SameSite=None; Secure;"
        setValue(getCookie)
    }



    const removeCookie = () => {
        document.cookie = key + '=; Max-Age=-99999999; path=/; SameSite=None; Secure;"'; 
        setValue(getCookie)
    }

    return [value, handleCookie, removeCookie]
}

export default useCookie