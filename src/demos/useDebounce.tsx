// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import useDebounce from '../localHooks/useDebounce'



//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue] = useState(1)

    const trigger = useDebounce(() => {
        setValue(v => v + 1)
    }, 500)


    return(
        <Layout>


    






<CodeBlock language='ts' className='demo-display' >
{
`
value: ${value.toString()}
*/
`
}
</CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                <button onClick={trigger}>Increment</button>
            </div>



        </Layout>
    )
}


export default DemoComponent