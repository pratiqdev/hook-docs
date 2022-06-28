// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import useClamp from '../localHooks/local_useClamp'



//+ useAsync
const DemoComponent = (props:any) => {

    const [value, setValue, reset] = useClamp({
        value: 9,
        min: 2,
        max: 7
    })


    return(
        <Layout>


    






            <div style={{padding: '1rem'}}>
                <button onClick={() => setValue(v => v + 1)}>Increment</button>
                <button onClick={() => setValue(v => v - 1)}>Decrement</button>
                <button onClick={() => setValue(10)}>Set 10</button>
                <button onClick={() => setValue(0)}>Set 0</button>
                <button onClick={reset}>Reset</button>
            </div>

<CodeBlock language='ts' className='demo-display' >
{
`const [value, setValue, reset] = useClamp({
    value: 9,
    min: 2,
    max: 7
})

// value: ${value}
`
}
</CodeBlock>



        </Layout>
    )
}


export default DemoComponent