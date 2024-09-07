import { enUS } from 'date-fns/locale'

/**
 *
 * this value is passed to to the toDateString method
 * which will return a formatted date string
 * commas are added to match the formats of other screens.
 *
 * @todo this will need to be refactored when we want to return a different date format
 *
 * @param date
 * @returns date is formatted like this => "Wed, Mar 30, 2022"
 */
export const getLocaleDateString = (date: Date): string => {
  const result = date.toDateString()
  const delimiter = result.indexOf(' ')
  const delim2 = result.indexOf(' ', delimiter + 5)
  const dateWithComma =
    result.slice(0, delimiter) +
    ',' +
    result.slice(delimiter, delim2) +
    ',' +
    result.slice(delim2)
  return dateWithComma
}
export const getLocaleNumberDateString = (
  date: Date | string | undefined | null,
): string => {
  const currentLanguage: string | null = localStorage.getItem('i18nextLng')
  if (typeof date === 'string') {
    date = new Date(date)
  }

  if (date) {
    return date.toLocaleDateString(currentLanguage ? currentLanguage : 'enUS')
  } else {
    return ''
  }
}

/**
 * the purpose of this function is to change date strings to their
 * locale equivalents for example
 * english => spanish
 * "5/1/2022 " ====> "1/5/2022"
 *
 */

export const getLocaleDateStringFromString = (dateString: string): string => {
  const date = new Date(dateString)
  return getLocaleNumberDateString(date)
}
/**
 * this function accepts a date string and will return a string representation
 * of the time based on the locale in local storge
 * english  spanish
 * "12:59:07 PM " ==== "12:59:07"
 *
 */

export const getLocaleTimeStringfromString = (dateString: string): string => {
  const date = new Date(dateString)
  const currentLanguage: string | null = localStorage.getItem('i18nextLng')
  return date.toLocaleTimeString(currentLanguage ? currentLanguage : 'enUS')
}

/**
 * the purpose of this function is to change date range strings to their
 * locale equivalents for example
 * "5/1/2022 - 7/23/2022" ====> "1/5/2022 - 23/7/2022"
 *
 */
export const getDateRange = (dateRangeString: string): string => {
  const delem = dateRangeString.indexOf('-')
  const startDate: string | null = dateRangeString?.slice(0, delem - 1)
  const endDate: string | null = dateRangeString?.slice(delem + 1)

  const localeDateRange = `${getLocaleDateStringFromString(
    startDate,
  )} - ${getLocaleDateStringFromString(endDate)}`

  return localeDateRange
}
export const getNextDay = (date: Date): Date => {
  const temp = new Date(date)
  temp.setDate(temp.getDate() + 1)
  const returned = new Date(temp)
  return returned
}
export const getPreviousDay = (date: Date): Date => {
  const temp = new Date(date)
  temp.setDate(temp.getDate() - 1)
  const returned = new Date(temp)
  return returned
}
