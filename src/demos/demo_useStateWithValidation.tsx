// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useStateWithValidation from '@site/src/localHooks/local_useStateWithValidation'
import HeadlessTable from '../components/HeadlessTable'



//+ useAsync
const DemoComponent = (props:any) => {

    const [value, setValue, isValid] = useStateWithValidation({
        value: 123,
        validator: 123
    })

    const demoCode = 
``




    return(
        <Layout>
            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                <Method pre={`setValue("bop")`} func={()=> setValue('bop')} />
                <Method pre={`setValue("abc")`} func={()=> setValue('abc')} />
                <HeadlessTable items={{
                    'Value': value,
                    'isValid': ''+isValid
                }} />

                
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent