// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '../components/Method'
import useCountdown from '../localHooks/useCountdown'



//+ useAsync
const DemoComponent = (props:any) => {
    const [log, setLog] = useState(null)

    const { 
      time,                           // current state of the countdown timer
      done,                           // is the countdown done
      running,                        // is the timer running
      started,                        // has the timer started
      start,                          // start the countdown
      stop,                           // stop (pause) the countdown
      reset,                          // reset state to initial values
    } = useCountdown({
      duration: 10_000,               // total duration of the countdown
      interval: 10,                   // time (ms) between time refresh
      callbacks: {                    // object containing callback functions
        'start':() => setLog('started'), // invoked when timer started
        'end':  () => setLog('over'),    // invoked when timer reaches 0
        7000:   () => setLog('7000ms'),  // invoked at 7000ms (time state)
        3000:   () => setLog('3000ms'),  // invoked at 3000ms (time state)
      },
     })


const demoCode = 
`const [log, setLog] = useState(null)

const { 
    time,                               // current state of the countdown timer
    done,                               // is the countdown done
    running,                            // is the timer running
    started,                            // has the timer started
    start,                              // start the countdown
    stop,                               // stop (pause) the countdown
    reset,                              // reset state to initial values
} = useCountdown({
    duration: 10_000,                   // total duration of the countdown
    interval: 10,                       // time (ms) between time refresh
    callbacks: {                        // object containing callback functions
        'start':() => setLog('started'),   // invoked when timer started
        'end':  () => setLog('over'),      // invoked when timer reaches 0
        7000:   () => setLog('7000ms'),    // invoked at 7000ms (time state)
        3000:   () => setLog('3000ms'),    // invoked at 3000ms (time state)
    },
})

// log: ${log}
// time: ${JSON.stringify(time, null, 2)}
`


   

    return(
        <Layout>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                <Method pre={`start()`} func={start} />
                <Method pre={`stop()`} func={stop} />
                <Method pre={`reset()`} func={reset} />
            </div>

        </Layout>
    )
}


export default DemoComponent