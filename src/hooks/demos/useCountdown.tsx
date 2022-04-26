// @ts-nocheck
import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
import Methods from '../components/Methods'
import Method from '../components/Method'
import MethodInput from '../components/MethodInput'
import Display from '../components/Display'
import { useCountdown } from '@pratiq/hooks'



const demoComponent = (props:any) => {

    // console.log('package:', pkg)
    const [dur, setDur] = React.useState(3_000)
    const [cb, setCb] = React.useState()

    const {time, done, start, stop, reset} = useCountdown({
        duration: dur,
        callbacks:{
            'start': () => setCb('A - ran a cb at start'),
            '2000':  () => setCb('B - ran a cb at 2s'),
            '1000':  () => setCb('C - ran another cb at 1s'),
            'end':   () => setCb('D - ran a cb at the end'),
        }
    })

    const pseudoCode =
`const { time, done, start, stop, reset } = useCountdown({
    duration: ${dur},
    callbacks:{
        'start': () => console.log('A - ran a cb at start'),
        '2000':  () => console.log('B - ran a cb at 2s'),
        '1000':  () => console.log('C - ran another cb at 1s'),
        'end':   () => console.log('D - ran a cb at the end'),
    }
})

log: ${cb || ''}
done: ${done}
time: ${JSON.stringify(time, null, 2)}`

    return(
        <Layout>
            {/* <Display id='total' value={time.total} />
            <Display id='milliseconds' value={time.milliseconds} />
            <Display id='seconds' value={time.seconds} />
            <Display id='minutes' value={time.minutes} />
            <Display id='hours' value={time.hours} />
            <Display id='days' value={time.days} /> */}

            <pre id='demo-display' >{pseudoCode}</pre>


            <Methods open title='Control' desc='Start, stop or reset the countdown' >
                <Method id='start-3' pre='start()' func={() => start()}  />
                <Method id='stop-3' pre='stop()' func={() => stop()}  />
                <Method id='reset-3' pre='reset()' func={() => reset()}  />
            </Methods>

            <Methods title='Parameters' desc='Change the parameters of the hoook' >
                <Method id='start-3' pre='start()' func={() => start()}  />
                <Method id='stop-3' pre='stop()' func={() => stop()}  />
                <Method id='reset-3' pre='reset()' func={() => reset()}  />
            </Methods>


            {/* <Methods title='set' desc='Set the state to a new array' >
                <Method id='set-1' pre='set([1,2,3])' func={() => methods.set([1,2,3])}  />
                <Method id='set-2' pre="set(['one','two','three'])" func={() => methods.set(['one','two','three'])}  />
                <Method id='set-3' pre='set([{text:"Hello"},{text:"World"}])' func={() => methods.set([{text:"Hello"},{text:"World"}])}  />
               
            </Methods>

            <Methods title='unshift' desc='Adds an element(s) to the beginning of the array and returns new length' >
                <Method hidden id='unshift-x1' func={() => methods.unshift(1)}  />
            </Methods> */}


        </Layout>
    )
}

export default demoComponent