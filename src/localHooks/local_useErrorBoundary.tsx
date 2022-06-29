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






interface IUseErrorBoundary {
    children?: React.ReactNode;
    fallback?: React.JSXElementConstructor<any>;
    handleError?: ErrorHandler;
    handleReset?: Function;
}



const DefaultErrorComponent = (props: any) => (
    <div className="error-screen" style={{color: 'red !important'}}>
        <h2>An error has occured</h2>
        <h4>{props.error.message}</h4>
    </div>
)

const useErrorBoundary = (config: IUseErrorBoundary) => {
    const errStateRef = useRef(0)
    const errContentRef = useRef<any>(null)

    const handleReset = () => {
        if(config.handleReset){
            config.handleReset()
        }
    }


      
    return Catch(function ChildContainer(props: IUseErrorBoundary, error?: Error) {
        if (error) {
            errContentRef.current = error

            if(config.fallback){
                errStateRef.current = 1
                return <config.fallback 
                            error={error} 
                            resetErrorBoundary={handleReset}
                        />
            }else{
                errStateRef.current = 2
                return <DefaultErrorComponent />
            }
        
        } 
        
        else {
            errStateRef.current = 0
            return <React.Fragment>{props.children}</React.Fragment>
        }
    }, config.handleError)


}

export default useErrorBoundary