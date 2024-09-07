import axios from 'axios'
import { useQuery } from 'react-query'

type ContactType = 'Consumer' | 'Attendee' | 'POC'
export interface Contact {
  id: number
  contactTypeId: number
  contactType: ContactType
  email: string
  phoneNumber: string
  fullName: string
  preferredName: string
}

export const useCompanyContacts = (companyId: number) => {
  const fetchCompanyContacts = async (
    companyId: number,
  ): Promise<Contact[]> => {
    const accessToken = localStorage.getItem('token')
    const response = await axios.get(
      `${process.env.API_URL}/api/v3/portal/contacts?companyId=${companyId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const data: any = response?.data

    return data
  }

  return useQuery(['contacts', companyId], () =>
    fetchCompanyContacts(companyId),
  )
}
