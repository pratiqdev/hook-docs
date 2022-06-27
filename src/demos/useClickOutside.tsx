// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import useClickOutside from '../localHooks/useClickOutside'



//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue] = useState(false)

    const ref = useClickOutside(()=>{
        setValue(true)
    })

   

    return(
        <Layout>


    






<CodeBlock language='ts' className='demo-display' >
{
`const [value, setValue] = useState(false)
const ref = useClickOutside(()=>{
    setValue(true)
})

<button ref={ref} onClick={()=>setValue(false)}>Click Me!</button>
<button>Click Outside!</button>

// value: ${value} (clicked outside)
`
}
</CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                {/* <button onClick={() => setValue(0)}>Set 0</button> */}
                <button ref={ref} onClick={()=>setValue(false)}>Click Me!</button>
                <button>Click Outside!</button>
            </div>



        </Layout>
    )
}


export default DemoComponent