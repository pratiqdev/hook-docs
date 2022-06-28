// @ts-nocheck
import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import useInput from '../localHooks/local_useInput'
import CodeBlock from '@theme/CodeBlock'




const DemoComponent = (props:any) => {

    const myInput_2 = useInput({
        value: 'Default',
        placeholder: 'A placeholder',
        validOnDefault: false,
        validateOnChange: true,
        validateOnBlur: true,
        validator: /^[a-z0-9]+$/,
        invalidMessage: 'Only lowercase letters and numbers allowed...',
        className: 'default-className',
        rootStyle: {
            background: '#aaa',
            marginRight: '.5rem',
        },
        style: {
            'valid': {color: 'green'},
            'invalid': {color: 'red'},
            'default': {color: 'blue'},
            'default-active': { color: 'yellow'},
        }
    })




    return(
        <Layout>










            <CodeBlock language='ts' className='demo-display' >
{`const myInput = useInput({
    value: 'Default',
    placeholder: 'A placeholder',
    validOnDefault: false,
    validateOnChange: true,
    validateOnBlur: true,
    validator: /^[a-z0-9]+$/,
    invalidMessage: 'Only lowercase letters and numbers allowed...',
    className: 'default-classname',
    rootStyle: {
        background: '#444',
        marginRight: '.5rem',
    },
    style: {
        'default': {color: 'blue'},
        'default-active': { color: 'yellow'},
        'valid': {color: 'green'},
        'invalid': {color: 'red'},
    }
})

// isEmpty:        ${myInput_2.isEmpty.toString()}
// isHovered:      ${myInput_2.isHovered.toString()}
// isFocused:      ${myInput_2.isFocused.toString()}
// isValid:        ${myInput_2.isValid.toString()}
// wasValidated:   ${myInput_2.wasValidated.toString()}
// invalidMessage: "${myInput_2.invalidMessage}"
// style:          ${JSON.stringify(myInput_2.bind.style)}
// className:      ${JSON.stringify(myInput_2.bind.className)}
`}
            </CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                <input {...myInput_2.bind} />
                <button onClick={myInput_2.reset}>Reset</button>
                <button onClick={myInput_2.validate}>Validate</button>
                <br />
                {myInput_2.invalidMessage}
            </div>



        </Layout>
    )
}


export default DemoComponent