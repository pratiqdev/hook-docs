// @ts-nocheck

import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
import Methods from '../components/Methods'
import Method from '../components/Method'
import MethodInput from '../components/MethodInput'
import Display from '../components/Display'
import { useInput } from '@pratiq/hooks'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

import BrowserOnly from '@docusaurus/BrowserOnly';
<BrowserOnly />


const demoComponent = (props:any) => {

    const hide = false



    const username = useInput({
        placeholder: 'User Name',
    })

    const comment = useInput({
        placeholder: 'Provide an comment...',
    })

    const submit = () => {}

    const reset = () => {
        comment.reset()
        username.reset()
    }



    return(
        <>
        <Layout>
            <div style={{display: 'flex', flexDirection: 'column', width: '10%', minWidth: '20rem'}}>
                <label>Username</label>
                <input {...username.bind} />
                <label>Comment</label>
                <textarea {...comment.bind}/>
            </div>
            <br />
            <div className='mt-2'>
                <button className='mr-2' onClick={submit}>Submit</button>
                <button onClick={reset}>Reset</button>
            </div>
            <p>Username: {username.value}</p>
            <p>Comment: {comment.value}</p>
        </Layout>
        </>

    )
}

export default demoComponent