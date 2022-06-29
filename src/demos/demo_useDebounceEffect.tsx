// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import useDebounceEffect from '../localHooks/local_useDebounceEffect'
import wait from '../localHooks/utils/wait'



//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue] = useState(1)

    useDebounceEffect(() => {
        setValue(v => v + 1)
    }, [])


    return(
        <Layout>


    






            <div style={{padding: '1rem'}}>
                <button onClick={() => reset()}>Increment</button>
            </div>

<CodeBlock language='ts' className='demo-display' >
{
`
value: ${value.toString()}
*/
`
}
</CodeBlock>



        </Layout>
    )
}


export default DemoComponent