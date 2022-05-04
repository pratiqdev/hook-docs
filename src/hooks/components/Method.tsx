import React from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly';


const Method = (props:any) => {
    return(
        <div className={!props.hidden ? 'desc-row' : 'desc-row-hidden'}>
            <BrowserOnly />
            <button id={`method-${props.id}`} onClick={props.func}>{'run'}</button>
            <pre>{props.pre || `HIDDEN ${props.id}`}</pre>
            <p>{props.desc}</p>
        </div>
    )
}

export default Method