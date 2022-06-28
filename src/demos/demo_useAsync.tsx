// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import useAsync from '../localHooks/local_useAsync'
import CodeBlock from '@theme/CodeBlock'
import wait from '../localHooks/wait'



//+ useAsync
const DemoComponent = (props:any) => {
    const [item, setItem] = useState(5)
    const [displayData, setDisplayData] = useState(['default','data'])

    const {loading, error, data, reload} = useAsync(async () => {
        try{
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${item}`)
            await wait()
            return response.json()
        }catch(err){
            return 'Fetch error:', err
        }
    }, {
        manualLoad: true,
        defaultLoading: false,
        defaultData: ['default', 'data']
    }, [item])

    useEffect(()=>{
        if('body' in data){
            setDisplayData({...data, body: data.body.substring(0,30) + '...'})
        }
    },[data])


    return(
        <Layout>


    






<CodeBlock language='ts' className='demo-display' >
{
`const [item, setItem] = useState(5)
const {loading, error, data, reload} = useAsync(
    async () => {
        try{
            let response = await fetch(\`https://placeholder.com/posts/\${item}\`)
            await wait()
            return response,json()
        }catch(err){
            return 'Fetch error:', err
        }
    }, 
    {
        manualLoad: false,
        defaultLoading: false,
        defaultError: 'Default error',
        defaultData: ['default', 'data']
    }, 
    [item]
)  

/*
item: ${item.toString()}
loading: ${loading.toString()}
error: ${error?.toString() || 'null'}
data: ${JSON.stringify(displayData, null, 2)}
*/
`
}
</CodeBlock>

            <div style={{padding: '1rem'}}>
                <button onClick={reload}>Reload</button>
                <button onClick={() => setItem(p => p + 1)}>Next Item</button>
                <button onClick={() => setItem(p => p - 1)}>Prev Item</button>
            </div>



        </Layout>
    )
}


export default DemoComponent