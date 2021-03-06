// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useGeolocation from '@site/src/localHooks/local_useGeolocation'



//+ useAsync
const DemoComponent = (props:any) => {
    const [highAcc, setHighAcc] = useState(false)

    const data = useGeolocation({
        enableHighAccuracy: highAcc
    })

    const demoCode = `${JSON.stringify(data, null, 2)}`


   

    return(
        <Layout>


            <div style={{padding: '1rem'}}>
                {/* <button onClick={response.reload}>Reload Request</button> */}
                <button onClick={() => setHighAcc(b => !b)}>{highAcc ? 'Disable' : 'Enable'} High Accuracy</button>

            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent