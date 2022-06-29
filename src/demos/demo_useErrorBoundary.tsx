// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useErrorBoundary from '@site/src/localHooks/local_useErrorBoundary'


const RenderOnError = (props:any) => {
    return (
        <div style={{color: 'white', background: '#F004', padding: '1rem', display: 'flex', flexDirection: 'column'}}>
            <h3>RenderOnError</h3>
            <p>Name: {props.name}</p>
            <p>Message: {props.message}</p>
            <button onClick={props.resetErrorBoundary}>Try again</button>
        </div>
    )
}

const ThrowError = () => {
    throw new Error('an error!!')
}




const DemoComponent = (props:any) => {
    const [shouldThrow, setShouldThrow] = useState(false)

    const fallback = ({error, resetErrorBoundary}) => {
        return (
            <div style={{color: 'white', background: '#F004', padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                <h3>Fallback Component</h3>
                <p>Name: {error.name}</p>
                <p>Message: {error.message}</p>
                <p>Stack Length: {error.stack.length}</p>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        )
    }

    const handleError = (error: Error, info: React.ErrorInfo) => {
        console.log('handleError:', { error, info })
    }

    const handleReset = () => {
        setShouldThrow(false)
    }

    const ErrorBoundary = useErrorBoundary({
        fallback,
        handleError,
        handleReset
    })

    const demoCode = 
`const fallback = (props:any) => {
    return (
        <div style={{background: '#F004'}}>
            <h3>Fallback Component</h3>
            <p>Name: {error.name}</p>
            <p>Message: {error.message}</p>
            <p>Stack Length: {error.stack.length}</p>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

const handleError = (error: Error, info: React.ErrorInfo) => {
    console.log('handleError:', { error, info })
}

const handleReset = () => {
    setShouldThrow(false)
}

const ErrorBoundary = useErrorBoundary({
    fallback,
    handleError,
    handleReset
})

<ErrorBoundary>
    <ComponentThatMayThrow />
</ErrorBoundary>
`


    return(
        <Layout>
            <ErrorBoundary>
                {shouldThrow && <ThrowError />}

                <div style={{padding: '1rem'}}>
                    <button onClick={() => setShouldThrow(true)}>Throw an Error</button>
                </div>

                <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
            </ErrorBoundary>
        </Layout>
    )
}


export default DemoComponent