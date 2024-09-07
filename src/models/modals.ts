import { Dayjs } from 'dayjs'
import { RRule, RRuleSet } from 'rrule'
// <------------------------------ ConfirmModal ------------------------------>
export type ConfirmModalProps = {
  open: boolean
  setOpen: (show: boolean) => void
  returnRoute?: string
  type: string
  cancelId: string
  setCancelId: (cancelId: string) => void
}

export type ConfirmModalProps2 = {
  open: boolean
  setOpen: (show: boolean) => void
  title: string
  message: string
  handleConfirmation: () => void
}

export type SchedulesModalProps = {
  open: boolean
  setOpen: (show: boolean) => void
  rRule?: RRule
  setRRule: (rRule: RRule) => void
  setDatesToExclude: (dates: Dayjs[]) => void
  datesToExclude: Dayjs[]
}
