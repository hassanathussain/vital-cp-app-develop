import dayjs, { Dayjs } from 'dayjs'
import { IJobExtendedData } from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import { FormattedFile } from 'hooks/jobs/useCreateJob'
import { AttendeeInfo, ContactInfo } from 'hooks/useStepForm'
import ActionMap from 'models/actionMap'

export enum NewRequestStepsVariablesActionType {
  Step1,
  Step2,
  Step3,
}
//TODO: update step 1 field to have new job extended data fields
export type Step1Fields = {
  isActive: boolean
  jobType: number | null
  eventName: string
  consumers: ContactInfo[]
  pocFullName: string
  pocPrefName: string
  pocEmail: string
  pocPhone: string
  attendees: AttendeeInfo[]
  serviceType: number | null
  serviceDescription: number | null
  prefProviders: ContactInfo[]
  jobExtendedData: IJobExtendedData[]
  additionalRequestInfo: string
  jobLocationType: string
  files: FormattedFile[]
}

export type Step2Fields = {
  lang: number | null
  videoService: string
  videoServiceLink: string
  locationInfo: string
  document: string
  address1: string
  address2: string
  city: string
  state: string
  country: string
  zipCode: string
  cleanTranscript: boolean
  lat: number | null
  lng: number | null
  locationId: number | null
  isNewLocation: boolean
}
type Step3Fields = {
  timezone: string | number
  startDate: Dayjs
  startTime: Dayjs
  endTime: Dayjs
  recurring: string | null
  rRule: string
}

type VariablesPayload = {
  [NewRequestStepsVariablesActionType.Step1]: Step1Fields
  [NewRequestStepsVariablesActionType.Step2]: Step2Fields
  [NewRequestStepsVariablesActionType.Step3]: Step3Fields
}

export type NewRequestStepsReduceState = Step1Fields & Step2Fields & Step3Fields

export type NewRequestStepsVariablesAction =
  ActionMap<VariablesPayload>[keyof ActionMap<VariablesPayload>]

export const newRequestStepsReducerInitial: NewRequestStepsReduceState = {
  isNewLocation: false,
  locationId: null,
  isActive: false,
  jobType: null,
  eventName: '',
  consumers: [{ fullName: '', prefName: '', email: '', phone: '' }],
  pocFullName: 'empty',
  pocPrefName: 'empty',
  pocEmail: 'empty@empty.com',
  pocPhone: '000-000-0000',
  timezone: '',
  startDate: dayjs(),
  startTime: dayjs().hour(12).minute(0).second(0),
  endTime: dayjs().hour(12).minute(15).second(0),
  recurring: 'Does not repeat',
  rRule: '',
  attendees: [{ fullName: '', email: '', prefName: '', phone: '' }],
  serviceType: null,
  serviceDescription: null,
  prefProviders: [{ fullName: '', prefName: '', email: '', phone: '' }],
  lang: null,
  videoService: '',
  videoServiceLink: '',
  locationInfo: '',
  document: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  lat: null,
  lng: null,
  cleanTranscript: false,
  jobExtendedData: [],
  additionalRequestInfo: '',
  jobLocationType: '',
  files: [],
}

export const newRequestStepsReducer = (
  prevState: NewRequestStepsReduceState,
  action: NewRequestStepsVariablesAction,
): NewRequestStepsReduceState => {
  switch (action.type) {
    case NewRequestStepsVariablesActionType.Step1: {
      const {
        isActive,
        jobType,
        eventName,
        consumers,
        pocFullName,
        pocPrefName,
        pocEmail,
        pocPhone,
        attendees,
        serviceType,
        serviceDescription,
        prefProviders,
        additionalRequestInfo,
        jobLocationType,
        jobExtendedData,
        files,
      } = action.payload
      return {
        ...prevState,
        isActive,
        jobType,
        eventName,
        consumers,
        pocFullName,
        pocPrefName,
        pocEmail,
        pocPhone,
        attendees,
        serviceType,
        serviceDescription,
        prefProviders,
        additionalRequestInfo,
        jobLocationType,
        jobExtendedData,
        files,
      }
    }
    case NewRequestStepsVariablesActionType.Step2: {
      const {
        lang,
        videoService,
        videoServiceLink,
        locationInfo,
        document,
        address1,
        address2,
        city,
        state,
        country,
        zipCode,
        cleanTranscript,
        lat,
        lng,
        locationId,
        isNewLocation,
      } = action.payload

      return {
        ...prevState,
        lang,
        videoService,
        videoServiceLink,
        locationInfo,
        document,
        address1,
        address2,
        city,
        state,
        country,
        zipCode,
        cleanTranscript,
        lat,
        lng,
        locationId,
        isNewLocation,
      }
    }
    case NewRequestStepsVariablesActionType.Step3: {
      const { timezone, startDate, startTime, endTime, recurring, rRule } =
        action.payload
      return {
        ...prevState,
        timezone,
        startDate,
        startTime,
        endTime,
        recurring,
        rRule,
      }
    }

    default: {
      return { ...prevState }
    }
  }
}
