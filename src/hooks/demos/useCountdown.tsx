// @ts-nocheck
import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
import Methods from '../components/Methods'
import Method from '../components/Method'
import MethodInput from '../components/MethodInput'
import { useCountdown } from '@pratiq/hooks'



const demoComponent = (props:any) => {

    // console.log('package:', pkg)


    const cd = useCountdown({
        duration: 10_000
    })


    return(
        <Layout>
            <pre id='demo-display' >{JSON.stringify(cd, null, 2)}</pre>


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