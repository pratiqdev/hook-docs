// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '@site/src/components/Method'
import useKeyboard from '@site/src/localHooks/local_useKeyboard'



//+ useAsync
const DemoComponent = (props:any) => {

    const keyb = useKeyboard({
        ignoreKeys: ['capslock', 'tab']
    })

    const demoCode = 
`const keyb = useKeyboard({
    element: myElementId,
    minComboKeys: 2,
    ignoreKeys: ['capslock', 'tab']
})

// keyb:
{
    key:        ${keyb.key},
    lastKey:    ${keyb.lastKey},
    down:       ${keyb.down},
    ctrl:       ${keyb.ctrl},
    alt:        ${keyb.alt},
    shift:      ${keyb.shift},
    meta:       ${keyb.meta},
    repeat:     ${keyb.repeat},
    combo:      ${keyb.combo},
    space:      ${keyb.space},
    events:     [...] // array of dom events
    lastEvent:  {...} // last dom event
}
`

useEffect(()=>{
    console.log('events:', keyb.events)
}, [keyb.events.length])
   

    return(
        <Layout>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent