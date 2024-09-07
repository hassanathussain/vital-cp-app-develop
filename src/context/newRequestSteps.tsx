import React from 'react'
import {
  createContext,
  useState,
  useReducer,
  useCallback,
  useEffect,
} from 'react'
import {
  newRequestStepsReducer,
  newRequestStepsReducerInitial,
  NewRequestStepsVariablesActionType,
} from './newRequestReducer'
import {
  NewRequestStepsContextData,
  ProgressStatus,
  Props,
} from 'models/newRequest'

// left over from rebase
//import { isFinite, toNumber } from 'lodash'
//import openNotificationWithIcon from 'shared/components/ui/alerts/notification-messages.alert'
//import { useDeepCompareMemoize } from 'shared/hooks/use-deep-compare-effect.hook'
//import { apiService } from 'shared/services/rest.service'

export const NewRequestStepsContext = createContext<NewRequestStepsContextData>(
  {
    currentStep: 0,
    comparativeBackendErrors: new Set(),
  } as any as NewRequestStepsContextData,
)

export const NewRequestStepsProvider = ({ children }: Props) => {
  const [currentStep, setCurrentStepState] = useState(0)
  const [progressStatus, setProgressStatus] =
    useState<ProgressStatus>('progress')

  /*  const [comparativeBackendErrors, setComparativeBackendErrors] =
    React.useState(new Set<number>()) */

  const [variables, dispatch] = useReducer(
    newRequestStepsReducer,
    newRequestStepsReducerInitial,
  )

  /*   const memoizedVariables = React.useMemo(
    () => variables,
    [variables].map(useDeepCompareMemoize),
  ) */

  const startOverSteps = useCallback(() => {
    dispatch({
      type: NewRequestStepsVariablesActionType.Step1,
      payload: newRequestStepsReducerInitial,
    })
    dispatch({
      type: NewRequestStepsVariablesActionType.Step2,
      payload: newRequestStepsReducerInitial,
    })
    setCurrentStepState(0)
    setProgressStatus('start over')
  }, [])

  const setCurrentStep = useCallback(
    (step: number) => setCurrentStepState(step),
    [],
  )

  useEffect(() => {
    if (progressStatus === 'start over') {
      // If the user clicks start over, automatically go to the progress status
      setProgressStatus('progress')
    }
  }, [progressStatus])

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)

    return () => clearTimeout(timeout)
  }, [currentStep])

  return (
    <NewRequestStepsContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        startOverSteps,
        dispatch,
        //variables: memoizedVariables,
        variables,
        progressStatus,
        //comparativeBackendErrors,
      }}
    >
      {children}
    </NewRequestStepsContext.Provider>
  )
}
