import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

interface ILangOption {
  id: number
  language: string
}
export const useLanguages = () => {
  const fetchLanguages = async (): Promise<IOption[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/joblanguage`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res

    return data?.jobLanguages?.map((el: ILangOption): IOption => {
      return { text: el.language, value: el.id }
    })
  }

  return useQuery(['languages'], fetchLanguages)
}
