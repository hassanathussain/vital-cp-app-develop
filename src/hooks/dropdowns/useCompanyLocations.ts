import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

export interface ICompanyLocation {
  id: number
  name: string
  companyId: number
  city: string
  country: string
  state: string
  street1: string
  street2: string | null
  timezone: string | null
  postalCode: string
  latitude: number
  longitude: number
}

export const useCompanyLocations = (companyId: number) => {
  const fetchCompanyLocations = async (companyId: number): Promise<ICompanyLocation[]> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/company/location?companyId=${companyId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res
    return data
    //return data.map((el: ICompanyLocation) => ({ value: el.id, text: el.name }))
  }

  return useQuery(['companyLocations', companyId], () =>
    fetchCompanyLocations(companyId),
  )
}
