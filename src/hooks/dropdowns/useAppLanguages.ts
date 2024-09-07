import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

interface ILangOption {
  id: string
  language: string
}

export const useAppLanguages = () => {
  const fetchAppLanguages = async (): Promise<IOption[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `https://d043a664-b578-4315-b675-2203946b1156.mock.pstmn.io/api/v3/portal/localization`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res

    return data?.appLanguages?.map(
      (el: ILangOption, index: number): IOption => {
        return { text: el.language, value: index, code: el.id }
      },
    )
  }

  return useQuery(['appLanguages'], fetchAppLanguages)
}
