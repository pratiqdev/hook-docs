import * as React from 'react';

const Display = (props:any) => {
    return (
        <div className={props.hide ? 'display-input-hidden' : 'display-input'}>
            <label>
                {props.id}
            </label>
            <input id={props.id} value={props.value} />
        </div>
    )
}

export default Display;