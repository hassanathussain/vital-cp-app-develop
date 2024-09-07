import axios from 'axios'
import { useQuery } from 'react-query'
import { ITimeZone } from './dropdowns/useTimeZones'

export const useTimezoneData = () => {
  const fetchTimezoneData = async (): Promise<ITimeZone[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/timezones`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res

    return data.timezones
  }

  return useQuery(['timezoneData'], fetchTimezoneData)
}
