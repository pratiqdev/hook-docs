import React from 'react'
import CodeBlock from '@theme/CodeBlock'

interface IMethodProps {
    id?: string;
    pre?: string;
    desc?: string;
    func?: any;
    hidden?: boolean;
}

const Method = (props:IMethodProps) => {
    return(
        <div className={!props.hidden ? 'desc-row' : 'desc-row-hidden'}>
            <button id={`method-${props.id}`} onClick={props.func}>{' '}</button>
            <CodeBlock className='method-pre' language='ts'>{props.pre || `HIDDEN ${props.id}`}</CodeBlock>
            <p>{props.desc}</p>
        </div>
    )
}

export default Method