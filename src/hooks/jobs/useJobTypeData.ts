import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

export interface JobTypeData {
  id: number
  name: string
  value: string
}
export const useJobTypeData = () => {
  const fetchJobTypes = async (): Promise<JobTypeData[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/jobRequestType`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res

    return data
  }

  return useQuery(['jobTypeData'], fetchJobTypes)
}
