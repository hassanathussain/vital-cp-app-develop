export interface UserInfo {
  id: number
  preferredFirstName: string
  preferredLastName: string
  contactEmail: string
  preferredTimeZoneName: string
  preferredTimeZoneCode: string
  preferredLanguage: string
  contactPhone: string
  preferredTimeZone?: string
  localeCode?: string
}
export interface UserSettingsInfo {
  id: number
  firstName: string
  middleName: string
  lastName: string
  preferredFirstName: string
  preferredLastName: string
  contactEmail: string
  contactPhone: string
  preferredTimeZoneName: string
  preferredTimeZoneCode: string
  isLocked: boolean
  isNotificationSuspended: boolean
  preferredLanguage: string
  localeCode?: string
  createdDT_utc: string
  modifiedDT_utc: string
  modifiedByUserID: 0
  dynamicsID: string
  companyID: number
  companyName: string
}
