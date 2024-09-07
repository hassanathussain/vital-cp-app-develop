import axios from 'axios'
import { useQuery } from 'react-query'

export interface IOption {
  value: number
  text: string
}
export interface IServiceType {
  id: number
  serviceType: string
}
export const useServiceTypes = () => {
  const fetchServiceTypes = async (): Promise<IOption[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/serviceType`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res
    return data.map((el: any) => ({ value: el.id, text: el.serviceType }))
  }

  return useQuery(['serviceTypes'], fetchServiceTypes)
}
