import React, { useState, useEffect, useRef } from 'react'
import * as isReact from './utils/isReact'

/** functional-error-boundaries */

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void
type ErrorHandlingComponent<Props> = (props: Props, error?: Error) => React.ReactNode

type ErrorState = { error?: Error }

function Catch<Props extends {}>(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler
): React.ComponentType<Props> {
  return class extends React.Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined
    }
    
    static getDerivedStateFromError(error: Error) {
      return { error }
    }
    
    componentDidCatch(error: Error, info: React.ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info)
      }
    }
    
    render() {
      return component(this.props, this.state.error)
    }
  }
}


/*
const MyErrorBoundary = Catch(function MyErrorBoundary(props: Props, error?: Error) {
  if (error) {
    return (
      <div className="error-screen">
        <h2>An error has occured</h2>
        <h4>{error.message}</h4>
      </div>
    )
  } else {
    return <React.Fragment>{props.children}</React.Fragment>
  }
})
*/





interface IUseErrorBoundary {
    children?: React.ReactNode;
    renderOnError?: React.JSXElementConstructor<any>;
    errorHandler?: Function;
}



const DefaultErrorComponent = (props: any) => (
    <div className="error-screen" style={{color: 'red !important'}}>
        <h2>An error has occured</h2>
        <h4>{props.error.message}</h4>
    </div>
)

const useErrorBoundary = (config: IUseErrorBoundary) => {
    const initRef = useRef(false)
    const errStateRef = useRef(0)
    const errContentRef = useRef<any>(null)

    //+ FIRST SETUP ------------------------------------------------------------
    if(!initRef.current){
        initRef.current = true

        
        return Catch(function ChildContainer(props: IUseErrorBoundary, error?: Error) {
            if (error) {
                errContentRef.current = error

                if(config.errorHandler && typeof config.errorHandler === 'function'){
                    config.errorHandler(error)
                }

                if(config.renderOnError){
                    errStateRef.current = 1
                    return <config.renderOnError message={error.message} name={error.name} stack={error.stack}/>
                }else{
                    errStateRef.current = 2
                    return ( <DefaultErrorComponent />)
            }
            
            } else {
                errStateRef.current = 0
                return <React.Fragment>{props.children}</React.Fragment>
            }
        })

    }
    
    //+ AFTER SETUP ------------------------------------------------------------
    else{
        console.log('already rendered error | errStateRef:', errStateRef.current)
        switch(errStateRef.current){
            case 1: return () => <config.renderOnError message={errContentRef.current.message} name={errContentRef.current.name} stack={errContentRef.current.stack}/> ;
            case 2: return ( <DefaultErrorComponent />);
            default: return ( <React.Fragment>{config.children}</React.Fragment>);
        } 
    }

}

export default useErrorBoundary