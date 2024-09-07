import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

interface IVideoServiceOption {
  id: number
  meetingServiceProvider: string
}
export const useVideoServices = () => {
  const fetchVideoServices = async (): Promise<IOption[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/meetingProviders`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res

    return data?.map((el: IVideoServiceOption): IOption => {
      return { text: el.meetingServiceProvider, value: el.id }
    })
  }

  return useQuery(['videoServices'], fetchVideoServices)
}
