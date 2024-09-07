import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import {
  IJobFormValues,
  hasTimeBeenChange,
} from '../../components/pages/job-details/JobDetailsForm'
import { IOption } from 'shared/select/BasicSelect'
import { RRule, RRuleSet } from 'rrule'
import { Dispatch } from 'react'
import { compareExDates, getDatesFromRRuleString } from 'utils/rrule'
import { FormattedFile, getLocationName } from './useCreateJob'
import { useJobTypes } from 'hooks/dropdowns/useJobTypes'

interface IUpdateJobSeriesPayload {
  jobId: number
  requestedServiceId: number
  nameOfJob: string
  serviceTypeId: number
  serviceSubTypeId: number

  startDt: string
  endDt: string
  startTime: string
  endTime: string
  recurring: boolean
  isRecurrenceUpdated: boolean
  consumer: {
    id: number
    fullName: string
    preferredName: string
    emailAddress: string
    phoneNumber: string
  }[]
  poc: [
    {
      id: number
      fullName: string
      preferredName: string
      emailAddress: string
      phoneNumber: string
    },
  ]
  additionalRequesters: {
    id: number
    fullName: string
    preferredName: string
    emailAddress: string
    phoneNumber: string
  }[]
  description: string
  location: {
    locationName: string
    address1: string
    address2: string
    city: string
    stateId: number
    zipCode: string
    countryId: number
    meetingLink: string
    meetingServiceProviderId: number
    note: string
    long: number
    lat: number
  }
  recurrence: {
    cronExpr: string
    dates: string[]
  }
  locationTimeZoneId: number
  userTimeZoneId: number
  uploadedFile: {
    id: number
    jobID: number
    fileName: string
    filePath: string
  }[]
  //TODO: update this any once we know what json vals are required for this endpoint
  jobExtendedDataValues: {
    JobServiceSubTypeServiceFieldId: number
    fieldValue: string
    extendedDataId: number | null
  }[]
  service_Notes: string
  files: FormattedFile[]
}

const updateJobSeries = async ({
  jobFormData,

  initialJobFormData,

  initialRRuleString,
  jobId,
  rruleSet,
  states,
  countries,
  dates,
  locationName,
  isOnsite,
  userTimeZoneId,
  setIsJobViewOpen,
}: {
  jobFormData: IJobFormValues

  initialJobFormData: IJobFormValues

  initialRRuleString: string | null
  jobId: number
  rruleSet: RRuleSet
  states: IOption[]
  countries: IOption[]
  dates: string[]
  userTimeZoneId: number
  locationName: string
  isOnsite: boolean
  setIsJobViewOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
  const accessToken = localStorage.getItem('token')
  const localeCodeInStorage = window.localStorage.getItem('i18nextLng')

  const origonalExDates = getDatesFromRRuleString(initialRRuleString || '')
  const newExDates = getDatesFromRRuleString(rruleSet.toString() || '')

  const hasExDatesBeenChanged = !compareExDates(origonalExDates, newExDates)

  const isRecurrenceUpdated = hasTimeBeenChange(
    initialJobFormData,
    jobFormData,
    hasExDatesBeenChanged,
  )

  //TODO: update this to send the job extended data, remove isPresenting, isLiveStreamed, isMedicalOrScientific
  const seriesToPut: IUpdateJobSeriesPayload = {
    jobId: jobId,
    requestedServiceId: jobFormData.requestedService || 1,
    nameOfJob: jobFormData.requestTitle || '',
    serviceTypeId: jobFormData.serviceType || 1,
    serviceSubTypeId: jobFormData.serviceSubType || 1,
    startDt: jobFormData.startDate?.format('llll') || '',
    endDt: jobFormData.endDate?.format('llll') || '',
    startTime: jobFormData.startTime?.format('llll') || '',
    endTime: jobFormData.endTime?.format('llll') || '',
    recurring: jobFormData.recurrenceDetails !== 'Does not repeat',
    isRecurrenceUpdated: isRecurrenceUpdated,
    consumer:
      jobFormData.serviceFor?.map((el) => {
        return {
          //are we sending the id
          id: 0,
          fullName: el.fullName || '',
          emailAddress: el.email || '',
          phoneNumber: el.phone || '',
          preferredName: el.prefName ? el.prefName : el.fullName,
        }
      }) || [],
    poc: [
      {
        id: 0,
        fullName: jobFormData.pocFullName || '',
        preferredName: jobFormData.pocPrefName || '',
        emailAddress: jobFormData.pocEmail || '',
        phoneNumber: jobFormData.pocPhone || '',
      },
    ],
    additionalRequesters: jobFormData?.attendees?.map((el) => {
      return {
        id: 0,
        fullName: el.fullName || '',
        emailAddress: el.email || '',
        phoneNumber: el.phone || '',
        preferredName: el.prefName ? el.prefName : el.fullName,
      }
    }),
    description: jobFormData.requestNotes || '',
    location: {
      locationName: getLocationName(
        isOnsite,
        jobFormData.requestTitle || '',
        jobFormData.isNewLocation,
        locationName,
      ),
      address1: jobFormData.address1 || '',
      address2: jobFormData.address2 || '',
      city: jobFormData.city || '',
      stateId: jobFormData.state || 1,
      zipCode: jobFormData.zipCode || '',
      countryId: jobFormData.country || 1,
      meetingLink: jobFormData.locationAssociatedURL || '',
      meetingServiceProviderId: jobFormData.locationVideoServiceType || 1,
      note: jobFormData.locationNotes || '',
      long: 0,
      lat: 0,
    },
    recurrence: {
      cronExpr: rruleSet?.toString(),
      dates: dates,
    },
    locationTimeZoneId: jobFormData.timezone || 1,
    userTimeZoneId: userTimeZoneId,
    uploadedFile: [],
    jobExtendedDataValues:
      jobFormData.jobExtendedData.map((el) => {
        return {
          fieldValue: el.extendedDataFieldValue || '',
          JobServiceSubTypeServiceFieldId: el.jobServiceSubTypeServiceFieldId,
          extendedDataId: el.extendedDataId !== null ? el.extendedDataId : null,
        }
      }) || [],
    service_Notes: jobFormData.requestNotes || '',
    files: jobFormData.files,
  }

  const res = await axios.put(
    `${process.env.API_URL}/api/v3/portal/jobs`,
    seriesToPut,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return res
}

export const useUpdateJobSeries = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation(updateJobSeries, {
    onError: () => {
      alert(`there was an error updating job series`)
    },
    onSettled: (data, variables, context) => {
      const { initialJobFormData, jobFormData, setIsJobViewOpen } = context
      const hasTimeBeenChange = () => {
        if (
          initialJobFormData.timezone !== jobFormData.timezone ||
          initialJobFormData.startTime?.hour() !==
            jobFormData.startTime?.hour() ||
          initialJobFormData.startTime?.minute() !==
            jobFormData.startTime?.minute() ||
          initialJobFormData.endTime?.hour() !== jobFormData.endTime?.hour() ||
          initialJobFormData.endTime?.minute() !==
            jobFormData.endTime?.minute() ||
          initialJobFormData.startDate !== jobFormData.startDate ||
          initialJobFormData.endDate !== jobFormData.endDate ||
          initialJobFormData.repeats !== jobFormData.repeats ||
          initialJobFormData.interval !== jobFormData.interval ||
          initialJobFormData.dayOfWeek !== jobFormData.dayOfWeek
        ) {
          //if the time section is changed,  we clost the job view and remove the job activities querry
          // this results in a dashboard loading state to prevent old activity id's from being selected.
          // queryClient.removeQueries(['jobActivities'])
          // setIsJobViewOpen(false)
          return true
        }
        return false
      }
      hasTimeBeenChange()
      queryClient.invalidateQueries(['job', id])
    },
  })
}
