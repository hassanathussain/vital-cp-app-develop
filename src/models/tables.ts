import { ReactNode, Dispatch, SetStateAction } from 'react'
import { Column } from 'models/columns'
import { JobViewProps } from 'src/components/pages/job-details/JobView'
import { IActivity } from 'src/components/pages/jobs-dashboard/delete-hook'

// < -------------------------------  DefaultTable --------------------------------- >

export interface DefaultTableProps<T> {
  rowData: T[]
  columnData: Column[]
  trackCancel?: object
  setModalType?: SetStateAction<string>
  paginated?: boolean
  setJobViewOpen: Dispatch<SetStateAction<boolean>>
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
  filterValues: any
  setJobNotice: Dispatch<SetStateAction<boolean>>
  setActivityList: Dispatch<SetStateAction<IActivity[] | null>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
}
export interface ScheduleTableProps<T> {
  rowData: T[]
  columnData: Column[]
  setIsDetailView: Dispatch<SetStateAction<boolean>>
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
  setJobNotice: Dispatch<SetStateAction<boolean>>
  setActivityList: Dispatch<SetStateAction<IActivity[] | null>>
}
