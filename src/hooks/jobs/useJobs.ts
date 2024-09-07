import axios from 'axios'
import { JobRequest } from 'models/jobDashboard'
import { useQuery } from 'react-query'

export const useJobs = () => {
  const fetchJobs = async (): Promise<JobRequest[]> => {
    const accessToken = localStorage.getItem('token')
    const response = await axios.get(
      `${process.env.API_URL}/api/v3/portal/jobs/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const data: any = response?.data.jobList

    const transformed = data.map((job: any) => {
      return {
        id: job.id,
        requestTitle: job.requestTitle,
        status: job.status,
        type: job.type,
        requestedFor: job.requestedFor,
        serviceProvider: job.serviceProvider,
        requestDate: new Date(job.requestStartDate).toLocaleDateString(),
        startDate: new Date(job.requestStartDate).toLocaleDateString(),
        startTime: new Date(job.startTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        endTime: new Date(job.endTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      }
    })

    return transformed
  }

  return useQuery(['jobs'], fetchJobs)
}
