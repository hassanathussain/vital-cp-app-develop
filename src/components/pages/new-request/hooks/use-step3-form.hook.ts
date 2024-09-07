import * as Yup from 'yup'
import { RRule } from 'rrule'
import { useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { NewRequestStepsReduceState } from 'context/newRequestReducer'
import { useUserSettings } from 'hooks/user/useUserSettings'
import { useTranslation } from 'react-i18next'
import { useTimeZones } from 'hooks/dropdowns/useTimeZones'

export enum Step3Fields {
  TIMEZONE = 'timezone',
  STARTDATE = 'startDate',
  STARTTIME = 'startTime',
  ENDTIME = 'endTime',
  RECURRING = 'recurring',
  RRULE = 'rRule',
}

export type Step3FormInputs = {
  [Step3Fields.TIMEZONE]: string | number
  [Step3Fields.STARTDATE]: Dayjs
  [Step3Fields.STARTTIME]: Dayjs | null
  [Step3Fields.ENDTIME]: Dayjs | null
  [Step3Fields.RECURRING]: string | null
  [Step3Fields.RRULE]: string | RRule
}

export const useStep3Form = (
  variables: NewRequestStepsReduceState,
  endDate: Dayjs | null,
) => {
  const { t } = useTranslation()
  const user = useUserSettings()
  const startOfToday = new Date()
  startOfToday.setUTCHours(0, 0, 1)
  const errMsj = {
    startDateMin: t('Start Date cannot be in the past'),
    startDateMax: t('Date must be before'),
    startTime: t('Start Time must be before End Time'),
    dateRequired: t('Date cannot be in the past'),
    notEqual: t('Start and end times must not be equal'),
    invalidTime: t('Invalid Time'),
    timezoneRequired: t('Timezone is required')
  }
  const step3ValidationSchema = Yup.object().shape({
    [Step3Fields.TIMEZONE]: Yup.number().required(errMsj.timezoneRequired),
    [Step3Fields.RECURRING]: Yup.string().required(),
    [Step3Fields.STARTDATE]: Yup.date()
      .min(startOfToday, errMsj.startDateMin)
      .max(
        endDate ? endDate : new Date('1/1/2285'),
        `${errMsj.startDateMax} ${endDate?.format('MM/DD/YYYY')}`,
      )
      .required(errMsj.dateRequired),
    startTime: Yup.date().test(
      'same_dates_test',
      errMsj.notEqual,
      function (value) {
        const { endTime } = this.parent
        return dayjs(value).format('llll') !== dayjs(endTime).format('llll')
      },
    ),
    endTime: Yup.date().test(
      'same_dates_test',
      errMsj.notEqual,
      function (value) {
        const { startTime } = this.parent
        return dayjs(value).format('llll') !== dayjs(startTime).format('llll')
      },
    ),
  })

  const timeZones = useTimeZones()
  const userSettings = useUserSettings()

  const defaultValues = useMemo(() => {
    const values = {
      timezone:
        timeZones?.data?.find((el) => {
          return el.timezoneCode === userSettings?.data?.preferredTimeZoneCode
        })?.id || '',
      startDate:
        variables?.startDate !== undefined ? variables.startDate : dayjs(),
      startTime:
        variables?.startTime !== undefined
          ? variables.startTime
          : dayjs().hour(12).minute(0),
      endTime:
        variables?.endTime !== undefined
          ? variables.endTime
          : dayjs().hour(12).minute(15),
      recurring:
        variables?.recurring !== undefined
          ? variables.recurring
          : 'Does not repeat',
      rRule: variables?.rRule !== undefined ? variables.rRule : '',
    }

    return values
  }, [variables, user?.data])

  return { step3ValidationSchema, defaultValues }
}