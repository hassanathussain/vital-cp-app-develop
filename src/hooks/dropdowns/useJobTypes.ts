import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

interface JobType {
  id: number
  name: string
  value: string
}

export const useJobTypes = () => {
  const fetchJobTypes = async (): Promise<IOption[]> => {
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

    return data.map((el: JobType): IOption => {
      return { text: el.name, value: el.id, code: el.value }
    })
  }
  return useQuery(['jobTypes'], fetchJobTypes)
}
