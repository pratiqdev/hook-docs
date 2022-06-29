// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useLogger from '@site/src/localHooks/local_useLogger'



//+ useAsync
const DemoComponent = (props:any) => {
    const log = useLogger({
        active: true,
        origin: 'demo_useLogger!'
    })

    const demoCode = `//`


   

    return(
        <Layout>


            <div style={{padding: '1rem'}}>
                {/* <button onClick={response.reload}>Reload Request</button> */}
                {/* <button onClick={() => setHighAcc(b => !b)}>{highAcc ? 'Disable' : 'Enable'} High Accuracy</button> */}

            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent