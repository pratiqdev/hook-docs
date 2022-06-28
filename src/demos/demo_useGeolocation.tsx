// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useGeolocation from '@site/src/localHooks/local_useGeolocation'



//+ useAsync
const DemoComponent = (props:any) => {

    const data = useGeolocation()
    let demoCode

    demoCode = 
    `// data:
    ${JSON.stringify(data, null, 2)}
    `


   

    return(
        <Layout>


            <div style={{padding: '1rem'}}>
                {/* <button onClick={response.reload}>Reload Request</button> */}
            </div>
            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                {/* <button onClick={response.reload}>Reload Request</button> */}
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent