// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useFetch from '@site/src/localHooks/local_useFetch'



//+ useAsync
const DemoComponent = (props:any) => {
    const [trigger, setTrigger] = useState(false)
    const [expiration, setExpiration] = useState(100)

    const response = useFetch('https://jsonplaceholder.typicode.com/users', {
        autoLoad: false,
        expire: expiration,
        initialData: ['initial data'],
        watch: [trigger, expiration],
        options: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    })

const demoCode = 
`const [trigger, setTrigger] = useState(false)
const [expiration, setExpiration] = useState(100)


const response = useFetch('https://jsonplaceholder.typicode.com/users', {
    autoLoad: false,
    expire: expiration, // ${expiration}
    initialData: ['initial data'],
    watch: [trigger],
    options: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
})

// loading: 
${response.loading ? 'true' : 'false'}

// loaded: 
${response.loaded ? 'true' : 'false'}

// error: 
${response.error ? response.error : 'null'}

// data:
${response.value && JSON.stringify(response.value.filter((x,i) => i < 2), null, 2)}
`


   

    return(
        <Layout>


            <div style={{padding: '1rem'}}>
                <button onClick={response.reload}>Reload Request</button>
                <button onClick={() => setTrigger(b => !b)}>Trigger dep change</button>
            </div>
            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                <button onClick={() => setExpiration(n => n + 100)}>Increase Expiration</button>
                <button onClick={() => setExpiration(n => n - 100)}>Decrease Expiration</button>
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent