import { Dayjs } from 'dayjs'
import { IJobExtendedData } from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import { Dispatch, SetStateAction } from 'react'
import { IOption } from 'shared/select/BasicSelect'
import { viewModes } from 'src/components/pages/job-details/JobView'

// <------------------------------- filters --------------------------->
export type Filter = {
  name: string
  options: string[]
  isMultiSelect?: boolean
  CustomDate?: any
}

export type FilterGroupProps = {
  filters: Filter[]
  values: any
  setValues: Dispatch<any>
}

// <--------------------------------- data cards ------------------------->
export interface DataCardProps<T> {
  title: string
  canEdit: boolean
  dataRows: any
  initialValues: T
  children?: any
  validationSchema?: any
  setModalType?: Dispatch<SetStateAction<string>>
  callback?: () => any
}
export type DataCardFormTypes =
  | 'text'
  | 'select'
  | 'date'
  | 'time'
  | 'inputList'
  | 'textarea'
  | 'dayjs'
  | 'dayOfWeek'
  | 'yesNo'
  | 'inputListProviders'
  | 'attendeeList'
  | 'autocomplete'
  | 'locationSelect'
  | 'checkbox'
  | 'locationAutocomplete'
  | 'dynamicFields'
  | 'file'
  | 'contactEmail'
export interface IDataCardProps {
  title: string
  rows: ICardRowProps[]
  toggleScheduleModal: Dispatch<SetStateAction<boolean>>
  isEditMode: boolean
  viewMode: viewModes
  jobId: number
  activityId: number
}
export interface IDataCard {
  title: string
  rows: ICardRowProps[]
}
export type ICardRowProps = {
  label: string
  forms: IFormProps[]
}
export type IFormProps = {
  name: string
  placeholder?: string
  isEdit: boolean
  options?: IOption[]
  label?: string
  selectValue?: (id: number) => string
  type: DataCardFormTypes
  disabled?: boolean
}

export type DataCardRowProps = {
  name: string
  label: string
  placeholder: string
  isEdit: boolean
  options: IOption[]
}

// <--------------------------   JobDashboard  ------------------------------->
export interface JobRequest {
  id: string
  requestTitle: string
  status: string
  type: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  requestedFor: string
  serviceProvider?: string
}

interface Consumer {
  serviceForID: number
  serviceForName: string
  serviceForEmail: string
  serviceForPhone: string
  serviceForPreferredName: string
}

export interface Attendee {
  attendeeId: number
  attendeeName: string
  attendeeEmail: string
  attendeePhone: string
  attendeePreferredName: string
}

export interface ActivitySchedule {
  endDate: Dayjs
  jobActId: number
  serviceProviders: any[]
  startDate: string
  status: string
  canEditDeleteActivity: boolean
}

export interface IUploadedFile {
  id: string
  owner: 'JOB' | 'JOB_ACTIVITY'
  name: string
  extension: string
}

// <--------------------------   new request  ------------------------------->
//TODO: update Job to have new jobExtendedData fields
export interface Job {
  id: number
  displayJobID: string
  status: string
  requestTitle: string
  requestedService: string
  requestedServiceId: number
  requestedByName: string
  requestedCreatedDate: Dayjs
  requestStartDateTime: Dayjs
  requestEndDateTime: Dayjs
  serviceFor: Consumer[]
  timezone: string
  timezoneId: number
  language: string
  languageId: number
  locationAddress1: string
  locationAddress2: string | null
  locationNotes: string | null
  locationState: string | null
  locationStateId: number | null
  locationCity: string
  locationCountry: string | null
  locationCountryId: number | null
  locationZip: string
  locationVideoServiceType: string | null
  locationVideoServiceTypeId: number | null
  locationAssociatedURL: string
  locationId: number | null

  preferredProviders: any[]
  attendees: Attendee[]

  occurrence: string | null
  pointOfContacts: {
    poC_ID: number
    poC_Name: string
    pocContactEmail: string
    pocContactPhone: string
    poC_PreferredName: string
  }[]
  jobActivitySchedules: ActivitySchedule[]
  jobServiceType: string
  jobServiceTypeId: number
  jobServiceSubType: string
  jobServiceSubTypeId: number
  jobExtendedData: IJobExtendedData[]
  requestNotes: string | null
  canEditJobSeries: boolean
  uploadedFile: IUploadedFile[]
}
