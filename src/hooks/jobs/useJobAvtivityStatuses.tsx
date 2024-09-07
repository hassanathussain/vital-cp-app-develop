import axios from 'axios'
import { useQuery } from 'react-query'

export interface JobTypeData {
  id: number
  name: string
  value: string
}
interface IStatus {
  status: string
}
export const useJobActivityStatuses = () => {
  const fetchJobActivityStatuses = async (): Promise<IStatus[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/JobActivityStatus`,
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

  return useQuery(['jobActivityStatuses'], fetchJobActivityStatuses)
}
