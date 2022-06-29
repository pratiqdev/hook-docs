import { useEffect } from "react";

 const debugMode = true
 
 
 export interface ILoggerConfig {
     active: boolean;
     origin: string;
     type?: 'info' | 'warn' | 'error'; // type should be callable with each log
    }
    
    // console.log('='.repeat(100));
    
/**
 * + ORIGINAL VERSION
 * @deprecated
 */
 const logger = (config:ILoggerConfig) => {
     if(debugMode && config.active){
         switch(config.type) {
             case 'info': return Function.prototype.bind.call(console.info, console, `${config.origin} |`);
             case 'warn': return Function.prototype.bind.call(console.warn, console, `${config.origin} |`);
             case 'error': return Function.prototype.bind.call(console.error, console, `${config.origin} |`);
             default: return Function.prototype.bind.call(console.log, console, `${config.origin} |`);
         }
     }else{
         return () => {}
     }
 }
 
//  export default logger

interface IUseLogger {
    active?: boolean;

}

// the `document.URL` is the current page that this component is rendered in

const useLogger = (config: IUseLogger) => {

    useEffect(()=>{
        if(document){
            console.log('document.URL:',document.URL)
        }
        // if(document && document.currentScript){
        //     console.log({
        //         currentScript: document.currentScript,
        //         //@ts-ignore
        //         scriptSource: document.currentScript.src,
        //     })
        // }
    },[])
}

export default useLogger