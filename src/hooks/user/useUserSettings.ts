/* global pendo */
import axios from 'axios'
import { UserSettingsInfo } from 'models/profileSettings'
import { useQuery } from 'react-query'
export const useUserSettings = () => {
  const fetchUserSettings = async (): Promise<UserSettingsInfo> => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/userSettings`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const { data } = res

    return data
  }

  return useQuery(['userSettings'], fetchUserSettings, {
    onSuccess: (data) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pendo.initialize({
        visitor: {
          id: data.contactEmail,
          name: data.firstName,
          lastName: data.lastName,
          email: data.contactEmail,
        },
        account: {
          id: data.companyID,
          companyName: data.companyName,
        },
      })
    },
  })
}
