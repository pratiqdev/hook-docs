import React, {useState} from 'react'
// import styles from './demoLayout.module.css'

const DemoLayout = (props:any) => {

    const [open, setOpen] = useState(false)

    return(
        <div>
            {/* <div 
                className={open ? 'demo-heading-open' : 'demo-heading-closed'} 
                onClick={() => setOpen(x=>!x)}
            >
                {open ? 'Hide Demo' : 'Show Demo'}
            </div> */}
            
            {/* {open &&  */}
                <div className='demo-layout'>
                    {props.children}
                </div>
            {/* } */}
        </div>
    )
}

export default DemoLayout