// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useMediaQuery from '@site/src/localHooks/local_useMediaQuery'



//+ useAsync
const DemoComponent = (props:any) => {

    const isMobile = useMediaQuery('max-width: 900px')

    const demoCode = 
`const isMobile = useMediaQuery('max-width: 900px')`





    return(
        <Layout>


            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                <h4>Is Mobile: {isMobile + ''}</h4>
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent