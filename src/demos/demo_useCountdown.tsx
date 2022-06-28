// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Layout from '../components/DemoLayout'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
import Method from '../components/Method'
import useCountdown from '../localHooks/local_useCountdown'



//+ useAsync
const DemoComponent = (props:any) => {
    const [log, setLog] = useState('no-log')
    const [timeString, setTimeString] = useState('')

    const { 
      time,                           // current state of the countdown timer
      done,                           // is the countdown done
      running,                        // is the timer running
      started,                        // has the timer started
      start,                          // start the countdown
      stop,                           // stop (pause) the countdown
      reset,                          // reset state to initial values
    } = useCountdown({
      duration: 61_000,               // total duration of the countdown
      interval: 10,                   // time (ms) between time refresh
      callbacks: {                    // object containing callback functions
        'start':() => setLog('started'), // invoked when timer started
        'end':  () => setLog('over'),    // invoked when timer reaches 0
        7000:   () => setLog('7000ms'),  // invoked at 7000ms (time state)
        3000:   () => setLog('3000ms'),  // invoked at 3000ms (time state)
      },
     })

     useEffect(()=>{
        let t = '// time: {'
        Object.entries(time).forEach(x => {
            t += `\n//    ${x[0]}: ${x[1]}`
        })
        t += '\n// }'
        setTimeString(t)
     },[time])

const demoCode = 
`const [log, setLog] = useState('no-log')

const { 
    time,                    
    done,                        
    running,                    
    started,                     
    start,                     
    stop,                             
    reset,                               
} = useCountdown({
    duration: 10_000,           
    interval: 10,              
    callbacks: {                     
        'start':() => setLog('started'),
        'end':  () => setLog('over'),  
        7000:   () => setLog('7000ms'),
        3000:   () => setLog('3000ms'),
    },
})

// log:     ${log}
// done:    ${done.toString()}
// running: ${running.toString()}
// started: ${started.toString()}
${timeString}
`

const handleReset = () => {
    reset()
    setLog('no-log')
}
   

    return(
        <Layout>

            <CodeBlock language='ts' className='demo-display' >{demoCode}</CodeBlock>

            <div style={{padding: '1rem', marginTop: '-1.5rem'}}>
                <Method pre={`start()`} func={start} />
                <Method pre={`stop()`} func={stop} />
                <Method pre={`reset()`} func={handleReset} />
            </div>

        </Layout>
    )
}


export default DemoComponent