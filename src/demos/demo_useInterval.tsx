// @ts-nocheck
import React, { useDebugValue, useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '../components/Method'
import useInterval from '../localHooks/local_useInterval'



//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue] = useState(0)
    let val = 0

    const {reset, stop} = useInterval(()=>{
        val++
        console.log('interval -', val)
    },1000, false)



const demoCode = 
`//`



    return(
        <Layout>
            <div style={{padding: '1rem'}}>
                <button onClick={reset}>Reset</button>
                <button onClick={stop}>Stop</button>
            </div>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent