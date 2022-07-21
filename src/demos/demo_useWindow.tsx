// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useWindow from '@site/src/localHooks/local_useWindow'



//+ useAsync
const DemoComponent = (props:any) => {

    const pkg = useWindow()

    const demoCode = 
`
`





    return(
        <Layout>
            <p>REQUIRES TESTING ON MOBILE - ORIENTATION REQUIRES ANGLE</p>

            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                <pre>{JSON.stringify(pkg, null, 2)}</pre>
                
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent