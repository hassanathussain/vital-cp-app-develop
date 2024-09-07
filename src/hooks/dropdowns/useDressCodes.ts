import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

interface IDressCodeOption {
  dressCodeId: number
  name: string
}
export const useDressCodes = () => {
  const fetchDressCodes = async (): Promise<IOption[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `https://d043a664-b578-4315-b675-2203946b1156.mock.pstmn.io/api/v3/portal/dressCodes`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res

    return data?.dressCodes?.map((el: IDressCodeOption): IOption => {
      return { text: el.name, value: el.dressCodeId }
    })
  }

  return useQuery(['dressCodes'], fetchDressCodes)
}
