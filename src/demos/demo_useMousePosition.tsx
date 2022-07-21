// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useMousePosition from '@site/src/localHooks/local_useMousePosition'



//+ useAsync
const DemoComponent = (props:any) => {

    const {x, y, bind} = useMousePosition()

    const demoCode = 
`const {x, y, bind} = useMousePosition()

<div {...bind} ></div>
<div 
    style={{
        position: 'absolute', 
        top: '0px', 
        left: '0px',
        transform: \`translate(\${x}px, \${y}px)\`
    }}
></div>
`





    return(
        <Layout>


            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                <h4>{x} x {y}</h4>
                <div {...bind} style={{width: '100%', height: '200px', background: '#444', overflow: 'hidden'}}></div>

                <div style={{
                    display: 'block', 
                    position: 'absolute', 
                    top: '0px', 
                    left: '0px',
                    transform: `translate(${x - 25}px, ${y - 25}px)`,
                    width: '50px',
                    height: '50px',
                    pointerEvents: 'none',
                    borderRadius: '50%',
                    border: '2px solid red'
                }}></div>
            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent