import React from 'react'
import CodeBlock from '@theme/CodeBlock'

const Method = (props:any) => {
    return(
        <div className={!props.hidden ? 'desc-row' : 'desc-row-hidden'}>
            <button id={`method-${props.id}`} onClick={props.func}>{' '}</button>
            <CodeBlock className='method-pre' language='ts'>{props.pre || `HIDDEN ${props.id}`}</CodeBlock>
            <p>{props.desc}</p>
        </div>
    )
}

export default Method