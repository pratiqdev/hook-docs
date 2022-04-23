import React from 'react'


const Method = (props:any) => {
    return(
        <div className='desc-row'>
            <button id={`method-${props.get}`} onClick={props.func}>{'run'}</button>
            <pre>{props.pre}</pre>
            <p>{props.desc}</p>
        </div>
    )
}

export default Method