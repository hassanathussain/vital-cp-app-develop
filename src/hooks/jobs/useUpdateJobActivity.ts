import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { IJobFormValues } from 'src/components/pages/job-details/JobDetailsForm'
import { IOption } from 'shared/select/BasicSelect'
import { FormattedFile, getLocationName } from './useCreateJob'
interface ILocationInfo {
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
}
interface IUpdateJobActivityPayload {
  activityId: number
  statusId: number
  requestedServiceId: number
  jobActivityLanguageId: number
  providerQuantityNeeded: number
  expectedStartDate: string
  expectedEndDate: string
  expectedStartTime: string
  expectedEndTime: string
  locationTimeZoneId: number
  location: ILocationInfo
  files: FormattedFile[]
}

const updateJobActivity = async ({
  jobFormData,
  activityId,
  states,
  countries,
  isOnsite,
  locationName,
}: {
  jobFormData: IJobFormValues
  activityId: number
  states: IOption[]
  countries: IOption[]
  isOnsite: boolean
  locationName: string
}) => {
  const accessToken = localStorage.getItem('token')
  const localeCodeInStorage = window.localStorage.getItem('i18nextLng')

  const getVal = (val: string | undefined | null, arr: IOption[]) => {
    const found = arr.find((item) => item.value === val)
    return found?.value
  }

  const activityToPut: IUpdateJobActivityPayload = {
    activityId: activityId,
    statusId: 1,
    requestedServiceId: jobFormData.requestedService || 1,
    jobActivityLanguageId: jobFormData.language || 1,
    providerQuantityNeeded: 1,
    expectedStartDate: jobFormData.startDate?.format('llll') || '',
    expectedEndDate: jobFormData.endDate?.format('llll') || '',
    expectedStartTime: jobFormData.startTime?.format('llll') || '',
    expectedEndTime: jobFormData.endTime?.format('llll') || '',
    locationTimeZoneId: jobFormData.timezone,
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
      stateId: jobFormData?.state || 1,
      zipCode: jobFormData.zipCode || '',
      countryId: jobFormData?.country || 1,
      meetingLink: jobFormData.locationAssociatedURL || '',
      meetingServiceProviderId: jobFormData.locationVideoServiceType || 1,
      note: jobFormData.locationNotes || '',
    },
    files: jobFormData.files,
  }
  const res = await axios.put(
    `${process.env.API_URL}/api/v3/portal/jobactivity`,
    activityToPut,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return res
}

export const useUpdateJobActivity = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation(updateJobActivity, {
    onError: () => {
      alert(`there was an error updating job activity`)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['jobActivities'])
      queryClient.invalidateQueries(['jobActivity', id])
    },
  })
}
