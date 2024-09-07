import axios from 'axios'
import { UserInfo } from 'models/profileSettings'
import { useMutation, useQueryClient } from 'react-query'
interface IPutUserSetting {
  firstName: string
  middleName: string
  lastName: string
  preferredFirstName: string
  preferredLastName: string
  contactEmail: string
  contactPhone: string
  preferredTimeZoneCode: string
  PreferredLanguageCode: string
  localeCode: string
}

const updateUser = async ({
  userSettings,
  user,
  timezone,
}: {
  userSettings: UserInfo
  user: any
  timezone: string | undefined
}) => {
  const accessToken = localStorage.getItem('token')
  const localeCodeInStorage = window.localStorage.getItem('i18nextLng')
  const settingsToPost: IPutUserSetting = {
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    preferredLastName: userSettings.preferredLastName,
    preferredFirstName: userSettings.preferredFirstName,
    contactEmail: userSettings.contactEmail,
    contactPhone: userSettings.contactPhone,
    preferredTimeZoneCode: timezone || userSettings.preferredTimeZoneCode,
    PreferredLanguageCode: userSettings.preferredLanguage,
    localeCode:
      localeCodeInStorage && typeof localeCodeInStorage === 'string'
        ? localeCodeInStorage
        : 'en-us',
  }

  const res = await axios.put(
    `${process.env.API_URL}/api/v3/portal/userSettings`,
    settingsToPost,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return res
}
export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient()
  return useMutation(updateUser, {
    onError: () => {
      alert('there was an error updateing user settings')
    },
    onSettled: () => {
      queryClient.invalidateQueries('userSettings')
    },
  })
}
