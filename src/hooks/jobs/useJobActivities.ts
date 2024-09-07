import axios from 'axios'
import { useQuery } from 'react-query'

export interface JobActivity {
  jobId: number
  activityId: number
  requestTitle: string
  activityStatus: string
  serviceRequestType: number
  activityStartDate: string
  activityStartTime: string
  activityEndTime: string
  consumerName: string
  activityServiceProvider: string
}
export interface JobActivities {
  jobId: number
  activityId: number
  requestTitle: string
  activityStatus: string
  serviceRequestType: string
  activityStartDate: string
  activityStartTime: string
  activityEndTime: string
  consumerName: string
  activityServiceProvider: string
  isRecurring: boolean
  canEditDeleteActivity: boolean
}
export const useJobActivities = () => {
  const fetchJobActivities = async (): Promise<JobActivities[]> => {
    const accessToken = localStorage.getItem('token')
    const response = await axios.get(
      `${process.env.API_URL}/api/v3/portal/jobactivities/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const data: any = response?.data

    const activities: JobActivities[] = data.map((job: any) => {
      return {
        jobId: job.jobId,
        activityId: job.jobActivityId,
        requestTitle: job.requestTitle,
        activityStatus: job.activityStatus,
        serviceRequestType: job.activityServiceRequestType,
        activityStartDate: new Date(job.activityStartDate).toLocaleDateString(),
        activityStartTime: new Date(job.activityStartTime).toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          },
        ),
        activityEndTime: new Date(job.activityEndTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        consumerName: job.jobConsumerName,
        activityServiceProvider: job.activityServiceProvider,
        isRecurring: job.isRecurring,
        canEditDeleteActivity: job.canEditDeleteActivity,
      }
    })

    return activities
  }

  return useQuery(['jobActivities'], fetchJobActivities)
}
