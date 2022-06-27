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

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                <button ref={ref} onClick={()=>setValue(false)}>Click Me!</button>
            </div>

        </Layout>
    )
}


export default DemoComponent