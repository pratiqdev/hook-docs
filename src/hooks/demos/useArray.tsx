import React, { useState } from 'react'
import Layout from '../components/DemoLayout'
import Methods from '../components/Methods'
import Method from '../components/Method'
import MethodInput from '../components/MethodInput'
import { useArray } from '@pratiq/hooks'

/*
        set,
        clear,
        reset,

        filter,
        push,
        pop,
        copyWithin,
        fill,
        reduce,
        reduceRight,
        reverse,
        sort,
        shift,
        unshift,
        splice,
        flat,

        insert,
        remove
*/

const demoComponent = (props:any) => {
    const initialState = ['initial','state']
    const [testValue, setTestValue] = useState<any>()
    const [customValue, setCustomValue] = useState<any>([1,2,3])
    const {array, ...methods} = useArray(['initial','state'])

    return(
        <Layout>
            <input type='hidden' id='initial-value' value={JSON.stringify(initialState)} />
            <input type='' id='test-value' value={testValue} />
            <pre id='demo-display' >{JSON.stringify(array)}</pre>


            <Methods title='clear' desc='Set the state to an empty array' open>
                <Method get='clear' pre='clear()' func={() => methods.clear()}  />
            </Methods>

            <Methods title='reset' desc='Set the state to the initial value' >
                <Method get='reset' pre='reset()' func={() => methods.reset()}  />
            </Methods>

            <Methods title='set' desc='Set the state to a new array' >
                <Method get='set-1' pre='set([1,2,3])' func={() => methods.set([1,2,3])}  />
                <Method get='set-2' pre="set(['one','two','three'])" func={() => methods.set(['one','two','three'])}  />
                <Method get='set-3' pre='set([{text:"Hello"},{text:"World"}])' func={() => methods.set([{text:"Hello"},{text:"World"}])}  />
                <Method get='set-4' pre='set([[[[[["why"]]]]]])' func={() => methods.set([[[[[["why"]]]]]])}  />
                <Method get='set-4' pre='set("not","an","array")' func={() => methods.set('not','an','array')}  />
            </Methods>

            <Methods title='push' desc='Append element(s) to the end of the array' >
                <Method get='push-1' pre='push(7)' func={() => methods.push(7)}  />
                <Method get='push-2' pre="push('seven')" func={() => methods.push('seven')}  />
                <Method get='push-3' pre='push(7,8,9)' func={() => methods.push(7,8,9)}  />
                <Method get='push-4' pre='push([7,8,9])' func={() => methods.push([7,8,9])}  />
                <Method get='push-5' pre='push()' func={() => methods.push()}  />
            </Methods>

            <Methods title='unshift' desc='Adds an element(s) to the beginning of the array and returns new length' >
                <Method get='unshift-1' pre="unshift(9)" func={() => setTestValue(() => methods.unshift(9))}  />
                <Method get='unshift-2' pre="unshift('hello')" func={() => setTestValue(() => methods.unshift('hello'))}  />
                <Method get='unshift-3' pre="unshift(9,10,11)" func={() => setTestValue(() => methods.unshift(9,10,11))}  />
                <Method get='unshift-4' pre="unshift([9,10,11])" func={() => setTestValue(() => methods.unshift([9,10,11]))}  />
            </Methods>

            <Methods title='pop' desc='Remove and return the last element in the array' >
                <Method get='pop-1' pre="pop()" func={() => setTestValue(() => methods.pop())}  />
            </Methods>

            <Methods title='shift' desc='Remove and return the first element in the array' >
                <Method get='shift-1' pre="shift()" func={() => setTestValue(() => methods.shift())}  />
            </Methods>


            <Methods title='filter' desc='Set the state to a new array containing all elements that passed the provided test' >
                <Method get='filter-1' pre="filter(n => typeof n === 'number')" func={() => methods.filter(n => typeof n === 'number')}  />
                <Method get='filter-2' pre="filter(n => typeof n === 'string')" func={() => methods.filter(n => typeof n === 'string')}  />
            </Methods>

            <Methods title='sort' desc='Sort the array with an optional sort method' >
                <Method get='sort-1' pre="sort()" func={() => setTestValue(() => methods.sort())}  /> 
                <Method get='sort-2' pre="sort((a,b) => a < b ? 1 : -1)" func={() => setTestValue(() => methods.sort((a,b) => a < b))}  /> 
                <Method get='sort-3' pre="sort((a,b) => a < b ? -1 : 1)" func={() => setTestValue(() => methods.sort((a,b) => a < b ? -1 : 1))}  />
                <Method get='sort-4' pre="sort((a,b) => a > b ? -1 : 1)" func={() => setTestValue(() => methods.sort((a,b) => a > b ? -1 : 1))}  />
            </Methods>



        </Layout>
    )
}

export default demoComponent