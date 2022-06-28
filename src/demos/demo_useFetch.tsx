// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useFetch from '@site/src/localHooks/local_useFetch'



//+ useAsync
const DemoComponent = (props:any) => {
    const [log, setLog] = useState('')
    const [value, loading, error, reload] = useFetch('https://jsonplaceholder.typicode.com/users')

const demoCode = 
`// loading: ${loading ? 'true' : 'false'}
// error: ${error ? error : 'null'}

${value && JSON.stringify(value[1], null, 2)}
`


   

    return(
        <Layout>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                <button onClick={reload}>Reload</button>
            </div>

        </Layout>
    )
}


export default DemoComponent