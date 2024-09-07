import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'
interface IStateOption {
  id: number
  stateProvinceName: string
  stateProvinceCode: string
}

export const useStates = () => {
  const fetchStates = async (): Promise<IOption[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(`${process.env.API_URL}/api/v3/portal/states`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const { data } = res

    return data?.states?.map((el: IStateOption): IOption => {
      return { text: el.stateProvinceName, value: el.id, code: el.stateProvinceCode }
    })
  }

  return useQuery(['states'], fetchStates)
}
