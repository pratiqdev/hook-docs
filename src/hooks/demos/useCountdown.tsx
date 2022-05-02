// @ts-nocheck

import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
import Methods from '../components/Methods'
import Method from '../components/Method'
import MethodInput from '../components/MethodInput'
import Display from '../components/Display'
import { useCountdown } from '@pratiq/hooks'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'



const demoComponent = (props:any) => {

    const hide = false

    const [dur, setDur] = React.useState(3_000)
    const [cb, setCb] = React.useState()

    const {time, done, started, running, start, stop, reset} = useCountdown({
        duration: dur,
        interval: 10,
        callbacks:{
            'start': () => setCb('A'),
            '2000':  () => setCb('B'),
            1000:    () => setCb('C'),
            'end':   () => setCb('D'),
        }
    })

    const {
        time: time2, 
        start: start2, 
        stop: stop2, 
        reset: reset2,
        done: done2,
        started: started2,
        running: running2
    } = useCountdown({ 
        duration: 93784567,
        interval: 100,
    })


    const {
        time: time3, 
        start: start3, 
        stop: stop3, 
        reset: reset3,
        done: done3,
        started: started3,
        running: running3
    } = useCountdown({ 
        duration: 10_000,
        interval: 1000,
    })

    const timeString = 
`${time2.days}d 
${time2.hours < 10 ? `0${time2.hours}` : time2.hours}
:${time2.minutes < 10 ? `0${time2.minutes}` : time2.minutes}
:${time2.seconds < 10 ? `0${time2.seconds}` : time2.seconds}
.${time2.milliseconds < 100 ? time2.milliseconds < 10 ? `00${time2.milliseconds}` : `0${time2.milliseconds}` : time2.milliseconds}`


    return(
        <>
        <Layout>

            <Tabs>
            <TabItem value='t1' label='Standard'>
                <div className='row-div padded mt-2'>
                    <button id='method-start-1' onClick={() => { start(); console.log('total:', time.total)}}>Start</button>
                    <button id='method-stop-1' onClick={stop}>Stop</button>
                    <button id='method-reset-1' onClick={reset}>Reset</button>
                </div>
                <p className='test-display-1 mb-2 fs-3'>{time.total}</p>
                <p className='fs-1 mb-3'>Increment: 10ms</p>

                <Display hide={hide} id='total' value={time.total} />
                <Display hide={hide} id='milliseconds' value={time.milliseconds} />
                <Display hide={hide} id='seconds' value={time.seconds} />
                <Display hide={hide} id='minutes' value={time.minutes} />
                <Display hide={hide} id='hours' value={time.hours} />
                <Display hide={hide} id='days' value={time.days} />
                <Display hide={hide} id='started' value={started} />
                <Display hide={hide} id='running' value={running} />
                <Display hide={hide} id='done' value={done} />
                <Display hide={hide} id='callback' value={cb} />
            </TabItem>


            <TabItem value='t2' label='Long duration'>
                <div className='row-div padded'>
                    <button id='method-start-2' onClick={start2}>Start</button>
                    <button id='method-stop-2' onClick={stop2}>Stop</button>
                    <button id='method-reset-2' onClick={reset2}>Reset</button>
                </div>
                <p className='test-display-1 mb-2 fs-3'>{timeString}</p>
                <p className='fs-1 mb-3'>Increment: 100ms</p>

                <Display hide={hide} id='total' value={time2.total} />
                <Display hide={hide} id='milliseconds' value={time2.milliseconds} />
                <Display hide={hide} id='seconds' value={time2.seconds} />
                <Display hide={hide} id='minutes' value={time2.minutes} />
                <Display hide={hide} id='hours' value={time2.hours} />
                <Display hide={hide} id='days' value={time2.days} />
                <Display hide={hide} id='started' value={started2} />
                <Display hide={hide} id='running' value={running2} />
                <Display hide={hide} id='done' value={done2} />
            </TabItem>


            <TabItem value='t3' label='Long Interval'>
                <div className='row-div padded mt-2'>
                    <button id='method-start-1' onClick={() => { start3(); console.log('total:', time3.total)}}>Start</button>
                    <button id='method-stop-1' onClick={stop3}>Stop</button>
                    <button id='method-reset-1' onClick={reset3}>Reset</button>
                </div>
                <p className='test-display-1 mb-2 fs-3'>{time3.total}</p>
                <p className='fs-1 mb-3'>Increment: 1000ms</p>

                <Display hide={hide} id='total' value={time3.total} />
                <Display hide={hide} id='milliseconds' value={time3.milliseconds} />
                <Display hide={hide} id='seconds' value={time3.seconds} />
                <Display hide={hide} id='minutes' value={time3.minutes} />
                <Display hide={hide} id='hours' value={time3.hours} />
                <Display hide={hide} id='days' value={time3.days} />
                <Display hide={hide} id='started' value={started3} />
                <Display hide={hide} id='running' value={running3} />
                <Display hide={hide} id='done' value={done3} />

            </TabItem>
            </Tabs>

                        

       



        </Layout>
        </>

    )
}

export default demoComponent