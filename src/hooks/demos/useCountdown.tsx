// @ts-nocheck
import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
import Methods from '../components/Methods'
import Method from '../components/Method'
import MethodInput from '../components/MethodInput'
import Display from '../components/Display'
import { useCountdown } from '@pratiq/hooks'

//~///////////////////////////////////////////////////////////////////////////////////////////


/**
 * useCountdown
 *
 * run a countdown timer that invokes optional callbacks and provides state describing stages and times
 *
 * @param duration: total duration of the timer in milliseconds
 * @param interval (optional) the duration between refreshes of the countdown time in milliseconds - default 100ms
 * @param callbacks (optional) an object containing callback functions where the key is the time of invocation, or string of start/end, and the value is the callback function
 *
 * @example:
 * const {time, done, running, started, start, stop, reset} = useCountdown({ duration: 10_000 })
 */

export interface I_CountdownConfig {
  duration: number;
  interval?: number;
  callbacks?: { [key: string]: Function };
}
export interface I_CountdownSettings {
  interval: number;
  duration: number;
  callbacks: { [key: string]: Function };
}

const useRealCount = (config: I_CountdownConfig) => {
  const settings: I_CountdownSettings = React.useMemo(() => {
    let interval = 100;
    if (config.interval) {
      if (config.interval > 1000) interval = 1000;
      else if (config.interval < 1) interval = 1;
      else interval = config.interval;
    }
    return {
      duration: config.duration ?? 10000,
      callbacks: config.callbacks ?? {},
      interval
    };
  }, [config]);

  const [initialStartTime, setInitialStartTime] = React.useState<any>(0);
  const [totalStopTime, setTotalStopTime] = React.useState<any>(0);
  const [startTime, setStartTime] = React.useState<any>(0);
  const [endTime, setEndTime] = React.useState<any>(0);
  const [stopTime, setStopTime] = React.useState<any>(0);
  const [time, setTime] = React.useState<any>(settings.duration);
  const [ticking, setTicking] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);
  const [cbs, setCbs] = React.useState<any>({});
  const [done, setDone] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const clockRef = React.useRef<any>(null);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const refreshTimes = React.useCallback(() => {
    if (!ticking) return  
    if (stopTime && startTime && !done) {
      setTotalStopTime((tst: number) => (tst += startTime - stopTime));
      setStartTime(0);
      setStopTime(0);
    }

    if (!running && !done) setRunning(true);
    if (!started) setStarted(true);
    if (time - settings.interval > 0) {
        setTime(
        settings.duration - (Date.now() - initialStartTime - totalStopTime)
        );
    } else {
        if ("end" in cbs && cbs["end"].ran === false) {
        cbs["end"].func();
        cbs["end"].ran = true;
        }
        setEndTime(Date.now());
        setTime(0);
        setRunning(false);
        setDone(true);
        setTicking(false);
    }
    
    clockRef.current = setTimeout(() => {
        // if (ticking) {
            // setTrigger((b) => !b);
            refreshTimes();
    //   }
    }, settings.interval);
  }, [settings.interval, startTime, ticking, done, stopTime, time]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const convertTimeRemaining = React.useCallback(() => {
    let s = Math.floor(time / 1000);

    return {
    //   days: Math.floor(s / 3600 / 24) % 24,
    //   hours: Math.floor(s / 3600) % 24,
    //   minutes: Math.floor(s / 60) % 60,
    //   seconds: s % 60,
    //   realSeconds: Math.ceil(time / 1000),
    //   milliseconds: time % 1000,
      total: time,
    //   endTime,
    //   startTime: initialStartTime,
    //   stopTime: totalStopTime,
    //   duration: settings.duration,
    //   interval: settings.interval
    };
  }, [time]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // ACCUMULATE CALLBACKS
  React.useEffect(() => {
    if (
      Object.entries(cbs).length === 0 &&
      config.callbacks &&
      Object.entries(config.callbacks).length > 0
    ) {
      const newCbs: any = {};
      Object.entries(settings.callbacks).forEach((cb: any) => {
        newCbs[cb[0]] = {
          ran: false,
          func: cb[1]
        };
      });
      console.log("accumulated callbacks:", cbs);
      setCbs(newCbs);
    }
  }, [settings.callbacks]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    if (ticking) refreshTimes();
    return () => clearTimeout(clockRef.current);
  }, [ticking, refreshTimes]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // HANDLE CALLBACKS
  React.useEffect(() => {
    if (time === settings.duration) return;

    // console.log("time...");
    for (const [key] of Object.entries(cbs)) {
      if (time <= parseInt(key) && cbs[key].ran === false) {
        cbs[key].func();
        cbs[key].ran = true;
        // console.log("a cb ran:", cbs[key]);
      }
    }
  }, [time, cbs]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // HANDLE TIME
  React.useEffect(() => {
    if (ticking) {
      if (!running && !done) setRunning(true);
      if (!started) setStarted(true);
      if (time - settings.interval > 0) {
        setTime(
          settings.duration - (Date.now() - initialStartTime - totalStopTime)
        );
      } else {
        if ("end" in cbs && cbs["end"].ran === false) {
          cbs["end"].func();
          cbs["end"].ran = true;
        }
        setEndTime(Date.now());
        setTime(0);
        setRunning(false);
        setDone(true);
        setTicking(false);
      }
    }
  }, [trigger, settings.interval]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // METHODS
  const start = () => {
    if (done) return;
    setTicking(true);
    if (stopTime && !startTime) {
      console.log("--- set new start time");
      setStartTime(Date.now());
    }
    if (!initialStartTime) {
      setInitialStartTime(Date.now());

      if ("start" in cbs && cbs["start"].ran === false) {
        cbs["start"].func();
        cbs["start"].ran = true;
      }
    }
  };

  const stop = () => {
    clearTimeout(clockRef.current);
    setTicking(false);
    setRunning(false);
    if (!stopTime && !done) {
      console.log("--- set new stop time");
      setStopTime(Date.now());
    }
  };

  const reset = () => {
    // console.clear();
    setTicking(false);
    setStarted(false);
    setDone(false);
    setInitialStartTime(0);
    setTotalStopTime(0);
    setStartTime(0);
    setEndTime(0);
    setStopTime(0);
    setTime(settings.duration);
    for (const [key] of Object.entries(cbs)) {
      cbs[key].ran = false;
    }
  };

  return {
    time: convertTimeRemaining(),
    done,
    running,
    started,
    start,
    stop,
    reset,
    cbs
  };
};



//~///////////////////////////////////////////////////////////////////////////////////////////

const demoComponent = (props:any) => {

    const hide = false

    const [dur, setDur] = React.useState(3_000)
    const [cb, setCb] = React.useState()

    const {time, done, start, stop, reset} = useRealCount({
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
        done: done2, 
        start: start2, 
        stop: stop2, 
        reset: reset2
    } = useRealCount({ 
        duration: 99999999999,
        interval: 10,
    })

    const timeString = 
`${time2.hours < 10 ? `0${time2.hours}` : time2.hours}
:${time2.minutes < 10 ? `0${time2.minutes}` : time2.minutes}
:${time2.seconds < 10 ? `0${time2.seconds}` : time2.seconds}
.${time2.milliseconds < 100 ? time2.milliseconds < 10 ? `00${time2.milliseconds}` : `0${time2.milliseconds}` : time2.milliseconds}`

    const [devMax, setDevMax] = React.useState(0)
    const [devMin, setDevMin] = React.useState(0)
    const [devAvg, setDevAvg] = React.useState(0)
    const [devTrials, setDevTrials] = React.useState(0)
    const trials:any[] = []

    const accumulateDeviations = () => {
        trials.push(time.total)

    }

    return(
        <Layout>
            <div className='row padded'>
                <p>1. Standard timer</p>
                <button id='method-start-1' onClick={start}>Start</button>
                <button id='method-stop-1' onClick={stop}>Stop</button>
                <button id='method-reset-1' onClick={reset}>Reset</button>
                <p className='test-display-1'>{time.total}</p>
            </div>


            <div className='row padded'>
                <p>2. Long timer</p>
                <button id='method-start-2' onClick={start2}>Start</button>
                <button id='method-stop-2' onClick={stop2}>Stop</button>
                <button id='method-reset-2' onClick={reset2}>Reset</button>
                <p className='test-display-2'>{timeString}</p>
            </div>

                <button id='accumulate-deviations' onClick={accumulateDeviations}>acc dev</button>

            <Display hide={hide} id='total' value={time.total} />
            <Display hide={hide} id='max-deviation' value={devMax} />
            <Display hide={hide} id='min-deviation' value={devMin} />
            <Display hide={hide} id='avg-deviation' value={devAvg} />
            <Display hide={hide} id='deviation-trials' value={devTrials} />
            <hr/>
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