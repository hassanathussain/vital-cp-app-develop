import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

export interface ITimeZone {
  id: number
  timezoneCode: string
  timezoneName: string
}
export const useTimeZones = () => {
  const fetchTimeZones = async (): Promise<ITimeZone[]> => {
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

    return data?.timezones
  }

  return useQuery(['timezones'], fetchTimeZones)
}

export const useTimeZoneOptions = () => {
  const fetchTimeZones = async (): Promise<IOption[]> => {
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

    return data?.timezones?.map((el: ITimeZone): IOption => {
      return { text: el.timezoneName, value: Number(el.id) }
    })
  }

  return useQuery(['timezoneOptions'], fetchTimeZones)
}
