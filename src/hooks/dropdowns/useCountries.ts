import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'
interface ICountryOption {
  id: number
  countryName: string
  countryCode: string
}

export const useCountries = () => {
  const fetchCountries = async (): Promise<IOption[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/countries`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res

    return data?.countries?.map((el: ICountryOption): IOption => {
      return { text: el.countryName, value: el.id }
    })
  }

  return useQuery(['countries'], fetchCountries)
}
