import {
  NewRequestStepsReduceState,
  NewRequestStepsVariablesAction,
} from 'context/newRequestReducer'

export type ProgressStatus = 'progress' | 'start over'

export type NewRequestStepsContextData = {
  currentStep: number
  startOverSteps: () => void
  setCurrentStep: (value: number) => void
  dispatch: React.Dispatch<NewRequestStepsVariablesAction>
  variables: NewRequestStepsReduceState
  progressStatus: ProgressStatus
  //comparativeBackendErrors: Set<number>;
}

export enum StepTitles {
  Step1 = 'Information',
  Step2 = 'Location',
}

export interface Props {
  children?: React.ReactNode
  // any props that come into the componen
}
