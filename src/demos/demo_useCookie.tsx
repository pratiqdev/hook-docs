// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '../components/Method'
import useCookie from '../localHooks/local_useCookie'



//+ useAsync
const DemoComponent = (props:any) => {
    const [value, setValue, remove] = useCookie('MY_COOKIE_KEY')


const demoCode = 
`const [value, setValue, remove] = useCookie('MY_COOKIE_KEY')

setValue('Alice')
setValue('Bobby', 100_000) // expiration in milliseconds

// value: ${value || 'undefined'}
`


   

    return(
        <Layout>

            <div style={{padding: '1rem'}}>
                <Method pre={`setValue('Alice')`} func={() => setValue('Alice')} />
                <Method pre={`setValue('Bobby')`} func={() => setValue('Bobby')} />
                <Method pre={`setValue('Charles')`} func={() => setValue('Charles')} />
                <Method pre={`remove()`} func={remove} />
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

        </Layout>
    )
}


export default DemoComponent