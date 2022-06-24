import { useState } from 'react'
    
/**
 * useArray()
 * ---
 * 
 * Save array in state and use common methods to update the array state
 * 
 * @param {array} initialState
 * @returns array, array functions
 * 
 * @example
 * 
 */
const useArray = (initialState: any[] = []) => {

    const [array, setArray] = useState<any[]>(initialState)

    /** Set the state to a new array. Value must be of type Array. */
    const set = (v:any[] | Function) => {
        if(Array.isArray(v)){
            setArray(v)
        }
        if(typeof v === 'function'){
            setArray(v(array))
        }
    }

    

    /** Set the state to an empty array */
    const clear:        () => void           =  () => setArray([])

    /** ResetArray the array to the initial value */
    const reset:        () => void           =  () => setArray(initialState)



    
    /** Set the state to an array of elements that pass the provided test */
    const filter: (cb:any) => void
        = (cb: any) => typeof cb === 'function' && setArray((a: any[]) => a.filter(cb))

    /** Adds new elements to the end of an array, and returns the new length */
    const push: (...values: any) => void
        = (...values: any) => {
            setArray(a => [...a, ...values]);
            return array.length + values.length
        }
    
    /** Removes the last element of an array, and returns that element */
    const pop: () => any
        = () => {
            setArray(a => a.slice(0, a.length - 1))
            return array[array.length - 1]
        }
    
    /** Copies array elements within the array, to and from specified positions */
    const copyWithin: (target:number, start?:number, end?:number) => void 
        = (target:number, start?:number, end?:number) => {
            setArray((a:any[]) => a.copyWithin(target, start, end))
        }

    /** Fill the elements in an array with a static value */
    const fill: (element:any, start?:number, end?:number, length?: number) => void 
        = (element:any, start?:number, end?:number, length?: number) => {
            if(length && length > array.length){
                let emptyArray = []
                while(emptyArray.length < length - array.length){
                    emptyArray.push(0)
                }
                let newArray = [...array, ...emptyArray]
                setArray(newArray.fill(element, start, end))
            }else{
                setArray((a:any[]) => a.fill(element, start, end))
            }
        }

    /** Reduce the values of an array to a single value (going left-to-right) */
    const reduce: (cb: any, initialValue?:any) => void 
        = (cb: any, initialValue:any = 0) => setArray([array.reduce(cb, initialValue)])

    /** Reduce the values of an array to a single value (going right-to-left) */
    const reduceRight: (cb: any, initialValue?:any) => void 
        = (cb: any, initialValue:any = 0) => setArray([array.reduceRight(cb, initialValue)])

    /** Reverses the order of the elements in an array */
    const reverse: () => void 
        = () => setArray((a:any[]) => a.reverse())

    /** Sorts the elements of an array */
    const sort: (cb?:any) => void 
        = (cb?:any) => {
            let newArr = array.sort(cb)
            setArray(newArr)
        }

    /** Removes the first element of an array, and returns that element*/
    const shift: () => void 
        = () => {
            let shifted = array.shift()
            setArray(array)
            return shifted
        }
    
    /** Adds new elements to the beginning of an array, and returns the new length*/
    const unshift: (...values:any) => void 
        = (...values:any) => {
            let length = array.length + values.length
            setArray(a => [...values, ...a])
            return length
        }

    /** Adds/Removes elements from an array */
    const splice: (start: number, deleteCount?: number, items?:any) => void 
        = (start: number, deleteCount?: number, items?:any) => {
            array.splice(start, deleteCount, items)
            setArray(array)
        }

    /** Concatenate all sub-array elements into the state recursively up to the specified depth or 10,000 default. */
    const flat: (i?: number) => void
        = (i?: number) => setArray(a => a.flat(i ?? 10000))




    /** Insert a new element into the array at the provided index */
    const insert: (i: number, e: any) => void 
        = (i: number, e: any) => {
            if(i > array.length || i < 0){ return }
            setArray(a => [...a.slice(0, i), e, ...a.slice(i + 1, a.length) ])
        }

    /** Remove an item from the array at the provided index */
    const remove: (i: number) => void 
        = (i: number) => {
            i && setArray(a => [
                ...a.slice(0, i),
                ...a.slice(i + 1, a.length)
            ])
        }

    

    return {
        /** Current state of the array */
        array,
        
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
    }
}

export default useArray