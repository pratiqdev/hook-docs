// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import useClickOutside from '../localHooks/local_useClickOutside'



//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue] = useState(false)

    const ref = useClickOutside(()=>{
        setValue(true)
    })


const demoCode = 
`const [value, setValue] = useState(false)
const ref = useClickOutside(()=>{
    setValue(true)
})

<button ref={ref} onClick={()=>setValue(false)}>Click Me!</button>

// click: ${!value ? 'inside' : 'outside'}
`


   

    return(
        <Layout>


            <div style={{padding: '1rem'}}>
                <button ref={ref} onClick={()=>setValue(false)}>Click Me!</button>
            </div>
            
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

        </Layout>
    )
}


export default DemoComponent