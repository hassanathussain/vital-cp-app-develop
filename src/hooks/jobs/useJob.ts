import axios from 'axios'
import dayjs from 'dayjs'
import { Job } from 'models/jobDashboard'
import { useQuery } from 'react-query'
import { DynamicFormTypeOptions } from './dynamicForms/useServiceSubTypeFields'

export const useJob = (jobParamId: number) => {
  const fetchJob = async (jobParamId: number): Promise<Job> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/jobs/details/?jobId=${jobParamId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res
    const transformed = {
      id: data?.id,
      requestedService: data?.requestedService,
      requestedServiceId: data?.requestedServiceId,
      timezone: data?.timezone,
      status: data?.jobActivityStatus,
      requestTitle: data?.requestTitle,
      requestedByName: data?.requestedByName,
      occurrence: data?.occurrence,
      language: data?.language,
      attendees: data?.attendees,
      requestStartDateTime: dayjs(data?.requestStartDateTime),
      requestEndDateTime: dayjs(data?.requestEndDateTime),
      requestedCreatedDate: dayjs(data?.requestedCreatedDate),
      requestFor: data?.serviceFor[0]?.serviceForName,
      serviceFor: data?.serviceFor,
      pointOfContacts: data?.pointOfContacts,
      jobActivitySchedules: data?.jobActivitySchedules,
      locationAddress1: data?.locationAddress1,
      locationAddress2: data?.locationAddress2,
      locationState: data?.locationState,
      locationZip: data?.locationZip,
      jobServiceType: data?.jobServiceType,
      jobServiceSubType: data?.jobServiceSubType,
      jobServiceTypeId: data?.jobServiceTypeId,
      jobServiceSubTypeId: data?.jobServiceSubTypeId,
      // **********
      requestNotes: data?.service_Notes,
      locationVideoServiceType: data?.locationVideoServiceType,
      locationVideoServiceTypeId: data?.locationVideoServiceTypeId,
      locationAssociatedURL: data?.locationAssociatedURL,
      displayJobID: data?.displayJobID,
      timezoneId: data?.locationTimeZoneID,
      languageId: data?.languageId,
      locationNotes: data?.locationNotes,
      locationId: data?.companyLocationId,
      locationStateId: data?.locationStateId,
      locationCity: data?.locationCity,
      locationCountry: data?.locationCountry,
      locationCountryId: data?.locationCountryId,
      preferredProviders: data?.preferredProviders,
      canEditJobSeries: data?.canEditJobSeries,
      jobExtendedData: data?.jobExtendedData,
      uploadedFile: data?.uploadedFile,
    }
    return transformed
  }
  return useQuery(['job', jobParamId], () => fetchJob(jobParamId))
}
