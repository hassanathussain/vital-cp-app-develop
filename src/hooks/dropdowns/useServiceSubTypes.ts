import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

export interface IServiceDetails {
  id: number
  name: string
}
export const useServiceSubTypes = (typeId: number) => {
  const fetchServiceSubTypes = async (typeId: number): Promise<IOption[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/servicetype/${typeId}/subtype`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res
    return data.map((el: any) => ({ value: el.id, text: el.name }))
  }

  return useQuery(['serviceSubTypes', typeId], () =>
    fetchServiceSubTypes(typeId),
  )
}
