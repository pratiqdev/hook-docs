// @ts-nocheck
import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
import Methods from '../components/Methods'
import Method from '../components/Method'
import MethodInput from '../components/MethodInput'
import Display from '../components/Display'
import { useCountdown } from '@pratiq/hooks'



const demoComponent = (props:any) => {

    const hide = false

    const [dur, setDur] = React.useState(3_000)
    const [cb, setCb] = React.useState()

    const {time, done, start, stop, reset} = useCountdown({
        duration: dur,
        callbacks:{
            'start': () => setCb('A'),
            '2000':  () => setCb('B'),
            1000:    () => setCb('C'),
            'end':   () => setCb('D'),
        }
    })

    const {
        time: time2, 
        done: done2, 
        start: start2, 
        stop: stop2, 
        reset: reset2
    } = useCountdown({ 
        duration: 99999999999,
        interval: 10,
    })

    const timeString = 
`${time2.hours < 10 ? `0${time2.hours}` : time2.hours}
:${time2.minutes < 10 ? `0${time2.minutes}` : time2.minutes}
:${time2.seconds < 10 ? `0${time2.seconds}` : time2.seconds}
.${time2.milliseconds < 100 ? time2.milliseconds < 10 ? `00${time2.milliseconds}` : `0${time2.milliseconds}` : time2.milliseconds}`


    return(
        <Layout>
            <div className='row padded'>
                <p>Standard timer</p>
                <button id='method-start-1' onClick={start}>Start</button>
                <button id='method-stop-1' onClick={stop}>Stop</button>
                <button id='method-reset-1' onClick={reset}>Reset</button>
                <p className='test-display-1'>{time.total}</p>
            </div>


            <div className='row padded'>
                <p>Long timer</p>
                <button id='method-start-2' onClick={start2}>Start</button>
                <button id='method-stop-2' onClick={stop2}>Stop</button>
                <button id='method-reset-2' onClick={reset2}>Reset</button>
                <p className='test-display-2'>{timeString}</p>
            </div>


            <Display hide={hide} id='total' value={time.total} />
            <Display hide={hide} id='milliseconds' value={time.milliseconds} />
            <Display hide={hide} id='seconds' value={time.seconds} />
            <Display hide={hide} id='minutes' value={time.minutes} />
            <Display hide={hide} id='hours' value={time.hours} />
            <Display hide={hide} id='days' value={time.days} />
            <Display hide={hide} id='done' value={done} />
            <Display hide={hide} id='callback' value={cb} />

            {/* <pre id='demo-display' >{pseudoCode}</pre> */}



            {/* <Methods open title='Control' desc='Start, stop or reset the countdown' >
                <Method id='start' pre='start()' func={() => start()}  />
                <Method id='stop' pre='stop()' func={() => stop()}  />
                <Method id='reset' pre='reset()' func={() => reset()}  />
            </Methods> */}

            {/* <Methods title='Parameters' desc='Change the parameters of the hoook' >
                <Method id='start-3' pre='start()' func={() => start()}  />
                <Method id='stop-3' pre='stop()' func={() => stop()}  />
                <Method id='reset-3' pre='reset()' func={() => reset()}  />
            </Methods> */}


            {/* <Methods title='set' desc='Set the state to a new array' >
                <Method id='set-1' pre='set([1,2,3])' func={() => methods.set([1,2,3])}  />
                <Method id='set-2' pre="set(['one','two','three'])" func={() => methods.set(['one','two','three'])}  />
                <Method id='set-3' pre='set([{text:"Hello"},{text:"World"}])' func={() => methods.set([{text:"Hello"},{text:"World"}])}  />
               
            </Methods>

    */}



        </Layout>
    )
}

export default demoComponent