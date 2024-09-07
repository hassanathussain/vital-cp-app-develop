import * as Yup from 'yup'
import { useMemo, useContext } from 'react'

import { NewRequestStepsContext } from 'context/newRequestSteps'
import { NewRequestStepsReduceState } from 'context/newRequestReducer'
import { IJobExtendedData } from './jobs/dynamicForms/useServiceSubTypeFields'
import { FormattedFile } from './jobs/useCreateJob'

//TODO: update Step1fields to have new job extended data fields, remove isPresenting, isLiveStreamed, isMedicalOrScientific
export enum Step1Fields {
  ISACTIVE = 'isActive',
  JOBTYPE = 'jobType',
  EVENTNAME = 'eventName',
  CONSUMERS = 'consumers',
  POCFULLNAME = 'pocFullName',
  POCPREFNAME = 'pocPrefName',
  POCEMAIL = 'pocEmail',
  POCPHONE = 'pocPhone',
  ATTENDEES = 'attendees',
  SERVICETYPE = 'serviceType',
  SERVICEDESCRIPTION = 'serviceDescription',
  PREFPROVIDERS = 'prefProviders',
  ADDITIONALREQUESTINFO = 'additionalRequestInfo',
  JOBEXTENDEDDATA = 'jobExtendedData',
  FILES = 'files',
}

export enum ContactFields {
  FULLNAME = 'fullName',
  PREFNAME = 'prefName',
  EMAIL = 'email',
  PHONE = 'phone',
}

export type AttendeeInfo = {
  [ContactFields.FULLNAME]: string
  [ContactFields.EMAIL]: string
  [ContactFields.PREFNAME]: string
  [ContactFields.PHONE]: string
}

export type ContactInfo = {
  [ContactFields.FULLNAME]: string
  [ContactFields.PREFNAME]?: string
  [ContactFields.EMAIL]?: string
  [ContactFields.PHONE]?: string
}

export type Step1FormInputs = {
  [Step1Fields.ISACTIVE]: boolean
  [Step1Fields.JOBTYPE]: number | null
  [Step1Fields.EVENTNAME]: string
  [Step1Fields.CONSUMERS]: ContactInfo[]
  [Step1Fields.POCFULLNAME]: string
  [Step1Fields.POCPREFNAME]: string
  [Step1Fields.POCEMAIL]: string
  [Step1Fields.POCPHONE]: string
  [Step1Fields.ATTENDEES]: AttendeeInfo[]
  [Step1Fields.SERVICETYPE]: number | null
  [Step1Fields.SERVICEDESCRIPTION]: number | null
  [Step1Fields.PREFPROVIDERS]: ContactInfo[]
  [Step1Fields.JOBEXTENDEDDATA]: IJobExtendedData[]
  [Step1Fields.ADDITIONALREQUESTINFO]: string
  [Step1Fields.FILES]: FormattedFile[]
}

export enum Step1ComparativesErrors {
  REQUIRED = 'twoFieldsRequired',
}

export const useStep1Form = (variables: NewRequestStepsReduceState) => {
  const { progressStatus } = useContext(NewRequestStepsContext)

  //TODO: update default values to have new job extended data fields, remove isPresenting, isLiveStreamed, isMedicalOrScientific
  //the default val for jobExtended data should be []
  const defaultValues: Step1FormInputs = useMemo(() => {
    const values = {
      isActive: variables?.isActive !== undefined ? variables.isActive : false,
      jobType: variables?.jobType !== undefined ? variables.jobType : null,
      eventName: variables?.eventName !== undefined ? variables.eventName : '',
      consumers:
        variables?.consumers !== undefined
          ? variables.consumers
          : [{ fullName: '' }],
      pocFullName:
        variables?.pocFullName !== undefined ? variables.pocFullName : '',
      pocPrefName:
        variables?.pocPrefName !== undefined ? variables.pocPrefName : '',
      pocEmail: variables?.pocEmail !== undefined ? variables.pocEmail : '',
      pocPhone: variables?.pocPhone !== undefined ? variables.pocPhone : '',
      attendees:
        variables?.attendees !== undefined
          ? variables.attendees
          : [{ fullName: '', email: '', prefName: '', phone: '' }],
      serviceType:
        variables.serviceType !== undefined ? variables.serviceType : null,
      serviceDescription:
        variables.serviceDescription !== undefined
          ? variables.serviceDescription
          : null,
      prefProviders:
        variables?.prefProviders !== undefined
          ? variables.prefProviders
          : [{ fullName: '' }],

      additionalRequestInfo:
        variables?.additionalRequestInfo !== undefined
          ? variables.additionalRequestInfo
          : '',
      jobExtendedData:
        variables?.jobExtendedData !== undefined
          ? variables.jobExtendedData
          : [],
      files: variables?.files !== undefined ? variables.files : [],
    }

    return values
  }, [variables])

  return { defaultValues }
}
