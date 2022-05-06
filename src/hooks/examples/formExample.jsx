import React, { useState } from 'react'
import CodeBlock from '@theme/CodeBlock';
// import { useInput, useFetch } from '@pratiq/hooks'
const {useInput, useFetch} = React.lazy(() => import('@pratiq/hooks'));


const myNameValidator = () => true
const myCommentValidator = () => true

const ExampleComponent = () => {

    const [start, setStart] = useState(false)

    const username = useInput({
        placeholder: 'User Name',
        validator: myNameValidator,
    })

    const comment = useInput({
        placeholder: 'Provide an comment...',
        validator: myCommentValidator,
    })

    // add a var like `onLoad:true` to auto load results on load
    const ftc = useFetch({
        url: 'https://jsonplaceholder.typicode.com/posts',
        watch: ''
    })



    const submit = () => {}

    const reset = () => {
        setStart(false)
        username.reset()
        comment.reset()
    }

    return(
        <div className='example-container'>
            
            <label>Username</label>
            <input {...username.bind} />
            <label>Comment</label>
            <textarea {...comment.bind}/>
            <br />
            <div className='mt-2'>
                <button className='mr-2' onClick={submit}>Submit</button>
                <button onClick={reset}>Reset</button>
            </div>
            <pre>{JSON.stringify(ftc.value, null, 2)}</pre>
        </div>
    )
}





// /////////////////////////////////////////////////////////////////////////////
const ExampleCode = () => {
    return (
      <div>
          <br/>
        <CodeBlock language="jsx">
{`import React from 'react'
import { useInput, useFetch } from '@pratiq/hooks'

const LoginForm = () => {
    return(
        <>
            FORM COMPONENT
        </>
    )
}
    
export default Form
`}
        </CodeBlock>
      </div>
    );
  }


export { ExampleComponent, ExampleCode }