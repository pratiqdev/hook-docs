// @ts-nocheck
import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'




const demoComponent = (props:any) => {
    const initialState = ['initial','state']
    const [testValue, setTestValue] = useState<any>()

    const myInput = useInput({
        value: 'Default',
        placeholder: 'A placeholder',
        validOnDefault: false,
        validator: (val) => val.length > 10
    })


/// # Notes
///
/// - add style option to config:
/// 
/// ```js
/// style: {
///     'default': {
///         color: 'grey',
///     },
///     'valid': {
///         color: 'green'
///     },
///     'invalid': {
///         color: 'red'
///     },
///     'hover': {
///         background: '#222'
///     }
///     
/// }
/// 
/// 
/// 



    return(
        <Layout>
            <input type='hidden' id='initial-value' value={JSON.stringify(initialState)} />
            
            <CodeBlock language='ts' className='demo-display' >
{`const myInput = useInput({
    value: 'Default',
    placeholder: 'A placeholder',
    validOnDefault: false,
    validator: (val) => val.length > 10
})
`}
            </CodeBlock>

            <div>
                <input {...myInput.bind} />
                <button onClick={myInput.reset}>Reset</button>
                <button onClick={myInput.validate}>Validate</button>
            </div>

            <p>isValid: {myInput.isValid.toString()}</p>


        </Layout>
    )
}

export default demoComponent