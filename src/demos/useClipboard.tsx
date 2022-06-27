// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import useClipboard from '../localHooks/useClipboard'



//+ useAsync
const DemoComponent = (props:any) => {
    const [copy, value, success] = useClipboard()


const demoCode = 
`const [copy, value, success] = useClipboard()

// success: ${success.toString()}
// value:   ${value}
`


   

    return(
        <Layout>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                <div style={{marginBottom: '.5rem'}}>
                    <button onClick={()=>copy('Some Text')}>Copy</button><code>Some Text</code>
                </div>
                <div style={{marginBottom: '.5rem'}}>
                    <button onClick={()=>copy(1357908642)}>Copy</button><code>1357908642</code>
                </div>
                <div style={{marginBottom: '.5rem'}}>
                    <button onClick={()=>copy('A long text string')}>Copy</button><code>A long text string</code>
                </div>
            </div>

        </Layout>
    )
}


export default DemoComponent