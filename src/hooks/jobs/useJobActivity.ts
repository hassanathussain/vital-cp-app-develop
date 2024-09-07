import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { IUploadedFile } from 'models/jobDashboard'
import { useQuery } from 'react-query'

export interface JobActivityDetails {
  id: number
  status: string
  startDate: Dayjs
  endDate: Dayjs
  startTime: Dayjs
  endTime: Dayjs
  requestedService: number
  providers: string[]
  languageNeeded: string
  languageId: number
  address?: string
  address2?: string
  city?: string
  stateProvince?: string
  stateProvinceId?: number
  country?: string
  countryId?: number
  zipCode?: string
  timeZone?: string
  timeZoneId: number
  locationName?: string
  locationNotes?: string
  meetingPlatform?: string
  meetingPlatformId?: number
  meetingLink?: string
  hasProviders: boolean
  isWithinValidCancelEditHours: boolean
  locationId?: number
  uploadedFile: IUploadedFile[]
  canEditDeleteActivity: boolean
  jobActivityDisplayId: string
}
export interface APIJobActivityDetails {
  id: number
  status: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  requestedService: number
  providers: string
  languageNeeded: string
  address?: string
  address2?: string
  city?: string
  stateProvince?: string
  country?: string
  timeZone?: string
  locationName?: string
  locationNotes?: string
  meetingPlatform?: string
  meetingLink?: string
}

export const useJobActivity = (jobParamId: number | undefined) => {
  const fetchJobActivity = async (
    jobParamId: number | undefined,
  ): Promise<JobActivityDetails | undefined> => {
    const accessToken = localStorage.getItem('token')
    if (!jobParamId) return
    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/jobactivities/details/${jobParamId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res

    return {
      id: data.jobActivityId,
      status: data.activityStatus,
      startDate: dayjs(data.activityStartDate),
      endDate: dayjs(data.activityEndDate),
      startTime: dayjs(data.activityStartTime),
      endTime: dayjs(data.activityEndTime),
      requestedService: data.activityServiceRequestId,
      providers: data.activityProviders.map((el: any) => el.name),
      languageNeeded: data.activityLanguage,
      languageId: data.activityLanguageID,
      address: data.locationAddress1,
      address2: data.locationAddress2,
      city: data.locationCity,
      stateProvince: data.locationState,
      stateProvinceId: data.locationStateId,
      country: data.locationCountry,
      countryId: data.locationCountryId,
      zipCode: data.locationZip,
      timeZone: data.locationTimeZoneName,
      timeZoneId: data.locationTimeZoneID,
      locationName: data.locationName,
      locationNotes: data.locationNotes,
      meetingPlatform: data.locationMeetingPlatform,
      meetingPlatformId: data.locationMeetingPlatformTypeId,
      meetingLink: data.locationMeetingLink,
      hasProviders: data.hasProviders,
      isWithinValidCancelEditHours: data.isWithinValidCancelEditHours,
      locationId: data.companyLocationId,
      //companyLocationId: data.companyLocationId,
      uploadedFile: data.uploadedFile,
      canEditDeleteActivity: data.canEditDeleteActivity,
      jobActivityDisplayId: data.jobActivityDisplayId,
    }
  }
  return useQuery(['jobActivity', jobParamId], () =>
    fetchJobActivity(jobParamId),
  )
}
