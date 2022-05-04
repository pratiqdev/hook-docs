import React, { useState } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly';

const ChevronIconRight = () => <div className='chevron-icon-right' />
const ChevronIconDown = () => <div className='chevron-icon-down' />

const Methods = (props:any) => {
    const [open, setOpen] = useState(props.open || false)
    return(
        <div className='method' id={`group-${props.title}`}>
<BrowserOnly />
            <div className='title-row' onClick={()=>setOpen(b => !b)}>
                <div className='chevron'>
                    {open ? <ChevronIconDown /> : <ChevronIconRight />}
                </div>
                <b>{props.title}</b>
                <small>{props.desc}</small>
            </div>
            <div className={open ? 'method-open' : 'method-closed'}>
                {props.children}
            </div>
        </div>
    )
}

export default Methods