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
        ignoreKeys: ['capslock', 'tab'],
        maxHistory: 10,
        combos: {
            'CTRL-E': () => console.log('ctrl-e ---'),
            'shift-p': () => console.log('shift-p ---'),
        }
    })
    
const demoCode = 
`const keyb = useKeyboard({
    element: myElementId,
    minComboKeys: 2,
    ignoreKeys: ['capslock', 'tab'],
    maxHistory: 10.
    combos: {
        'CTRL-E': () => console.log('ctrl-e ---'),
        'shift-p': () => console.log('shift-p ---'),
    }
})

// keyb:
{
    key:        ${keyb && keyb.key},
    lastKey:    ${keyb && keyb.lastKey},
    down:       ${keyb && keyb.down},
    ctrl:       ${keyb && keyb.ctrl},
    alt:        ${keyb && keyb.alt},
    shift:      ${keyb && keyb.shift},
    meta:       ${keyb && keyb.meta},
    repeat:     ${keyb && keyb.repeat},
    combo:      ${keyb && keyb.combo},
    space:      ${keyb && keyb.space},
    lastEvent:  {...} // last dom event that occurred
    events:     [...] // array of current-only dom events (${keyb && keyb.events.length})
    history:    [---] // array of all dom events that occurred (${keyb && keyb.history.length})
}
`

// useEffect(()=>{
//     // console.log('events:', keyb.events)
// }, [keyb.events.length])
   

    return(
        <Layout>
            <div style={{padding: '1rem'}}>
                <button onClick={keyb.reset}>Reset</button>
                <button onClick={keyb.clearHistory}>Clear History</button>
            </div>
            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>
        </Layout>
    )
}


export default DemoComponent