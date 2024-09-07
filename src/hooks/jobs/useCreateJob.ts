import axios from 'axios'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from 'react-query'
import { IJobExtendedData } from './dynamicForms/useServiceSubTypeFields'

interface Consumer {
  id: number
  fullName: string
  preferredName: string | null
  emailAddress: string
  phoneNumber: string
}
interface POC {
  id: number
  fullName: string
  preferredName: string | null
  emailAddress: string
  phoneNumber: string
}
interface Attendee {
  id: number
  fullName: string
  preferredName: string | null
  emailAddress: string
  phoneNumber: string
}

interface Activity {
  startDt: string
  endDt: string
  preferredServiceProviders: null
}
export interface FormattedFile {
  name: string
  extension: string
  file: string
}
interface JobToPost {
  requesterUserId: number
  name: string
  description: string
  requestedServiceId: number
  jobServiceTypeId: number
  jobServiceSubTypeId: number
  jobLanguageId: number
  startDt: string
  endDt: string
  startTime: string
  endTime: string
  recurring: number
  location: {
    locationName: string
    address1: string | null
    address2: string | null
    city: string | null
    stateId: number | null
    zipCode: string | null
    countryId: number | null
    meetingLink: string | null
    meetingServiceProviderId: number | null
    note: string | null
    lat: number | null
    long: number | null
    companyLocationId: number | null
  }
  consumer: Consumer[]
  poc: POC[]
  attendees: Attendee[]
  recurrences: {
    cronExpr: string | null
    dates: string[]
  }
  activities: Activity[]
  jobExtendedDataValues: {
    JobServiceSubTypeServiceFieldId: number
    fieldValue: string
  }[]
  jobTimeZoneId: number
  companyID: number
  notes: string
  quantityNeeded: number
  files: FormattedFile[]
}
interface PrefProvider {
  fullName: string
}
interface JobCreationRequest {
  isNewLocation: boolean
  locationId: number
  isActive: boolean
  jobType: number
  eventName: string
  consumers: Consumer[]
  pocFullName: string
  pocPrefName: string
  pocEmail: string
  pocPhone: string
  timezone: number
  startDate: string
  startTime: string
  endTime: string
  recurring: string
  rRule: string
  attendees: any[] // Adjust this type based on the expected structure of attendees
  serviceType: number
  serviceDescription: number
  prefProviders: PrefProvider[]
  lang: number
  videoService: string
  videoServiceLink: string
  locationInfo: string
  document: string
  address1: string
  address2: string
  city: string
  state: number
  country: number
  zipCode: string
  lat: number
  lng: number
  cleanTranscript: boolean
  jobExtendedData: any[] // Adjust this type based on the expected structure of jobExtendedData
  additionalRequestInfo: string
  jobLocationType: string
  files: any[] // Adjust this type based on the expected structure of files
  endDate: string
  userId: number
  companyID: number
  isOnsite: boolean
  dates: string[]
  locationName: string
}
export const getLocationName = (
  isOnsite: boolean,
  nameOfJob: string,
  isNewLocation: boolean,
  locationName: string,
): string => {
  const ending = !isOnsite ? 'remote' : 'on-site'

  const toReturn =
    isOnsite && !isNewLocation ? locationName : `${nameOfJob} ${ending}`

  return toReturn
}

const createJob = async (job: any) => {
  const accessToken = localStorage.getItem('token')

  const startTimeIsBeforeEnd = job.startTime.isBefore(job.endTime)
  const startTime = job.startTime.date(job?.startDate.date())
  const endTime = job.endTime.date(job?.startDate.date())

  const endTimeHours = endTime.hour()
  const endTimeMinutes = endTime.minute()
  const startTimeHours = startTime.hour()
  const startTimeMinutes = startTime.minute()

  //TODO update this to use new jobExtendedData fields remove isPresenting, isLiveStreamed, isMedicalOrScientific
  const jobToCreate: JobToPost = {
    requesterUserId: job.userId,
    name: job.eventName,
    description: job.eventName,
    requestedServiceId: job.jobType,
    jobServiceTypeId: job.serviceType,
    jobServiceSubTypeId: job.serviceDescription,
    jobLanguageId: job.lang,
    startDt: job?.startDate
      ?.hour(startTimeHours)
      ?.minute(startTimeMinutes)
      ?.format('YYYY-MM-DDTHH:mm:ss'),
    endDt: job?.endDate
      ?.hour(endTimeHours)
      ?.minute(endTimeMinutes)
      ?.format('YYYY-MM-DDTHH:mm:ss'),
    startTime: job?.startDate
      ?.hour(startTimeHours)
      ?.minute(startTimeMinutes)
      ?.format('YYYY-MM-DDTHH:mm:ss'),
    endTime: job?.startDate
      ?.hour(endTimeHours)
      ?.minute(endTimeMinutes)
      ?.format('YYYY-MM-DDTHH:mm:ss'),
    recurring: job.recurring === 'Does not repeat' ? 0 : 1,
    quantityNeeded: 1,
    location: {
      locationName: getLocationName(
        job.isOnsite,
        job.eventName,
        job.isNewLocation,
        job.locationName,
      ),
      address1: job.address1,
      address2: job.address2,
      city: job.city,
      stateId: job.state,
      zipCode: job.zipCode,
      countryId: job.country,
      meetingLink: job.videoServiceLink,
      meetingServiceProviderId: job.videoService,
      note: job.locationInfo,
      lat: job.lat,
      long: job.lng,
      companyLocationId: job.locationId || null,
    },
    consumer: job.consumers.map((elem: any, i: number): Consumer => {
      return {
        id: i,
        fullName: elem.fullName,
        preferredName: elem.prefName || elem.fullName,
        emailAddress: elem.email || null,
        phoneNumber: elem.phone,
      }
    }),
    poc: [
      {
        id: 0,
        fullName: job.pocFullName,
        preferredName: job.pocPrefName,
        emailAddress: job.pocEmail,
        phoneNumber: job.pocPhone,
      },
    ],
    attendees: job.attendees.map((elem: any, i: number): Attendee => {
      return {
        id: i,
        fullName: elem.fullName,
        preferredName: elem.prefName,
        emailAddress: elem.email || '',
        phoneNumber: elem.phone || '',
      }
    }),

    recurrences: {
      cronExpr: job?.rRule ? job?.rRule : 'does not repeat',
      dates: job?.dates,
    },

    activities: job?.dates?.map((activityDate: Date) => {
      const finalStartDate = dayjs(activityDate)
        .hour(startTimeHours)
        .minute(startTimeMinutes)
        .format('llll')
      const finalEndDate = startTimeIsBeforeEnd
        ? dayjs(activityDate)
            .hour(endTimeHours)
            .minute(endTimeMinutes)
            .format('llll')
        : dayjs(activityDate)
            .hour(endTimeHours)
            .minute(endTimeMinutes)
            .add(1, 'day')
            .format('llll')

      return {
        startDt: finalStartDate,
        endDt: finalEndDate,
        preferredServiceProviders: null,
      }
    }),

    jobTimeZoneId: job.timezone,
    companyID: job.companyID,

    notes: job.additionalRequestInfo,
    jobExtendedDataValues: job.jobExtendedData.map((el: IJobExtendedData) => {
      return {
        JobServiceSubTypeServiceFieldId: el.jobServiceSubTypeServiceFieldId,
        fieldValue: el.extendedDataFieldValue,
      }
    }),
    files: job?.files,
  }
  const res = await axios.post(
    `${process.env.API_URL}/api/v3/portal/jobs`,
    jobToCreate,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return res
}
export const useAddJob = () => {
  const queryClient = useQueryClient()
  return useMutation(createJob, {
    onError: () => {
      alert('there was an error')
    },
    onSettled: () => {
      queryClient.invalidateQueries('jobs')
    },
  })
}
