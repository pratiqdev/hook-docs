// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useEventListener from '@site/src/localHooks/local_useEventListener'



//+ useAsync
const DemoComponent = (props:any) => {
    const [log, setLog] = useState('')
    useEventListener('click', (e: any) => setLog('click: ' + e.target.localName))
    useEventListener('keydown', (e: any) => setLog('key: ' + e.key))

const demoCode = 
`useEventListener('click', (e) => log('click: ', e.target.localName))  
useEventListener('keydown', (e) => log('key: ', e.key))

// log: ${log}
`


   

    return(
        <Layout>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
            </div>

        </Layout>
    )
}


export default DemoComponent