// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useErrorBoundary from '@site/src/localHooks/local_useErrorBoundary'


const RenderOnError = (props:any) => {
    return (
        <div style={{color: 'white', background: 'red', padding: '1rem'}}>
            <h3>RenderOnError</h3>
            <p>Name: {props.name}</p>
            <p>Message: {props.message}</p>
        </div>
    )
}


//+ useAsync
const DemoComponent = (props:any) => {


    const EB = useErrorBoundary({
        renderOnError: RenderOnError,
    })

    const demoCode = `//`

    const ThrowError = () => {
        useEffect(()=>{
            throw new Error('an error!!')
        },[])
        return null
    }

    const WaitToRenderError = () => {
        const [state, setState] = useState(true)
        const ref = useRef(null)

        useEffect(()=>{
            ref.current = setTimeout(()=>{
                // setState(false)
                throw new Error('an error!!')

            },1000)
            return () => clearTimeout(ref.current)
        }, [])

        // return state ? null : <ThrowError />
        return null
    }


   

    return(
        <Layout>
            <EB>
            <ThrowError />


            <div style={{padding: '1rem'}}>
                {/* <button onClick={response.reload}>Reload Request</button> */}
                
                {/* <button onClick={() => setHighAcc(b => !b)}>{highAcc ? 'Disable' : 'Enable'} High Accuracy</button> */}

            </div>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
            </EB>
        </Layout>
    )
}


export default DemoComponent