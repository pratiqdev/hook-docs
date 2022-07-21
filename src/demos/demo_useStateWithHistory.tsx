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

    const s = useStateWithValidation({
        value: 123,
        validator: 'abc'
    })

    const demoCode = 
`const [value, setValue, isValid] = useStateWithValidation({
    value: 123,
    validator: 'abc',
    // validator: /abc/gm,
    // validator: (v) => v.length === 3,
})`




    return(
        <Layout>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                <Method pre={`setValue("bop")`} func={()=> s.setValue('bop')} />
                <Method pre={`setValue("abc")`} func={()=> s.setValue('abc')} />
                <HeadlessTable items={{
                    'Is Valid': ''+s.isValid,
                    'Current Value': s.value,
                    'Last Valid Value': ''+s.lastValidValue
                }} />

                
            </div>

        </Layout>
    )
}


export default DemoComponent