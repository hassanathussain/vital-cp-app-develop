import dayjs, { Dayjs } from 'dayjs'
import { RRule, RRuleSet, rrulestr, Frequency, ByWeekday } from 'rrule'
import {
  dailyOptions,
  monthlyOptions,
  weeklyOptions,
} from 'shared/modals/RecurrenceDetailsModal/ModalRows'

export interface IGenerateRRuleParams {
  modalStartDate: Dayjs
  modalStartTime: Dayjs
  modalEndTime: Dayjs
  repeats: string
  every?: number
  endDate?: Dayjs
  dayOfWeek?: string
}

export const generateRRule = (values: IGenerateRRuleParams): RRule => {
  //make a dayjs object a year from now
  const oneYearFromNow = dayjs().add(1, 'year')
  const rule = new RRule({
    freq: getFrequency(values.repeats),
    interval: values.every ? getInterval(values.every, values.repeats) : 1,
    dtstart:
      values.modalStartDate && values.modalStartTime
        ? new Date(
            `${values.modalStartDate.format(
              'L',
            )},  ${values.modalStartTime.format('LT')}`,
          )
        : values.modalStartDate
        ? new Date(values.modalStartDate.format('L'))
        : null,

    until:
      values.endDate && values.modalEndTime
        ? new Date(`${values.endDate.hour(23).minute(59).format('llll')}`)
        : new Date(oneYearFromNow.format('llll')),

    byweekday:
      values.dayOfWeek && values.repeats === 'Weekly'
        ? getByWeekdayVal(values.dayOfWeek)
        : null,
  })
  return rule
}
const getDayRRuleValue = (day: string): any => {
  switch (day) {
    case 'Mon':
    case 'Monday':
      return RRule.MO

    case 'Tue':
    case 'Tuesday':
      return RRule.TU

    case 'Wed':
    case 'Wednesday':
      return RRule.WE
    case 'Thu':
    case 'Thursday':
      return RRule.TH
    case 'Fri':
    case 'Friday':
      return RRule.FR
    case 'Sat':
    case 'Saturday':
      return RRule.SA
    case 'Sun':
    case 'Sunday':
      return RRule.SU
    default:
      null
  }
  return null
}
const getByWeekdayVal = (weekdays: string): ByWeekday[] | null => {
  const days = weekdays.split(', ')
  return days.map((day) => {
    return getDayRRuleValue(day)
  })
}
const getFrequency = (repeats: string): Frequency => {
  switch (repeats) {
    case 'Daily':
      return RRule.DAILY
    case 'Weekly':
      return RRule.WEEKLY
    case 'Monthly':
      return RRule.MONTHLY
    case 'Yearly':
      return RRule.YEARLY
  }
  return RRule.DAILY
}
export const getRepeatsOptionValueFromFrequency = (frequency: number) => {
  switch (frequency) {
    case 3:
      return 1
    case 2:
      return 2
    case 1:
      return 3
    case 0:
      return 4
  }
  return 0
}
export const getDaysOfWeekFromByWeekDay = (dayValues: number[]) => {
  const getDayString = (day: number): string => {
    switch (day) {
      case 0:
        return 'Mon'
      case 1:
        return 'Tue'
      case 2:
        return 'Wed'
      case 3:
        return 'Thu'
      case 4:
        return 'Fri'
      case 5:
        return 'Sat'
      case 6:
        return 'Sun'
      default:
    }
    return ''
  }
  return dayValues.map((day) => getDayString(day)).join(', ')
}

const getInterval = (every: string | number, repeats: string): number => {
  if (typeof every === 'number') {
    return every
  }
  switch (repeats) {
    case 'Daily':
      const dayInterval = dailyOptions.find(
        (option) => option.text === every,
      )?.value
      return dayInterval ? dayInterval : 1
    case 'Weekly':
      const weekInterval = weeklyOptions.find(
        (option) => option.text === every,
      )?.value
      return weekInterval ? weekInterval : 1
    case 'Monthly':
      const monthInterval = monthlyOptions.find(
        (option) => option.text === every,
      )?.value
      return monthInterval ? monthInterval : 1
  }
  return 1
}
export const getBasicRRule = (
  frequency: string | null,
  startDate: Dayjs,
  startTime: Dayjs,
): RRule => {
  const rule = new RRule({
    freq: getFrequency(frequency ? frequency : 'Does not repeat'),
    dtstart:
      startDate && startTime
        ? new Date(`${startDate.format('L')},  ${startTime.format('LT')}`)
        : new Date(),
  })
  return rule
}
//by default the rRule.toText() metheod has bad grammer. This function corrects that

export const GetFormattedRRuleText = (rule: RRule, values: any): string => {
  let endDate = false
  const until = rule?.options?.until ? rule?.options?.until : null
  if (until) {
    const endDateUtc = new Date(
      Date.UTC(
        until.getFullYear(),
        until.getMonth(),
        until.getDate(),
        until.getHours(),
        until.getMinutes(),
        until.getSeconds(),
      ),
    )
    const ruleToPrint = new RRule({
      ...rule.origOptions,
      until: !endDate ? endDateUtc : null,
    })
    return `${rule?.toText().charAt(0)?.toUpperCase()}${ruleToPrint
      ?.toText()
      ?.slice(1)}.`
  }
  return `${rule?.toText()?.charAt(0).toUpperCase()}${rule
    ?.toText()
    ?.slice(1)}.`
}
export const makeSetFromRRuleAndExclusion = (
  rule: RRule,
  datesToExclude: Dayjs[],
): RRuleSet => {
  const rruleSet = new RRuleSet()
  if (!rule.options.until) {
    const oneYearFromNow = dayjs().add(1, 'year')
    rule.options.until = new Date(oneYearFromNow.format('llll'))
  }
  rruleSet.rrule(rule)
  if (datesToExclude.length > 0) {
    for (let i = 0; i < datesToExclude.length; i++) {
      if (datesToExclude[i].isValid()) {
        const dateToExclude = new Date(datesToExclude[i].format('llll'))
        if (!isNaN(dateToExclude.getTime())) rruleSet.exdate(dateToExclude)
      }
    }
  }
  return rruleSet
}
export const getDatesFromRRuleString = (rruleString: string) => {
  const exDatesString = rruleString
    ?.slice(rruleString.indexOf('EXDATE:'))
    ?.slice(7)
  const exDates = exDatesString?.split(',')
  return exDates
    ?.map((date) => {
      const newDay = dayjs(date.substring(0, 8))
      return newDay
    })
    ?.filter((date) => date.isValid())
}

//returns true if the two arrays of dates are the same
export const compareExDates = (
  origonalExDates: Dayjs[],
  newExDates: Dayjs[],
) => {
  if (origonalExDates.length !== newExDates.length) {
    return false
  } else {
    if (
      origonalExDates.every((elem) => {
        return newExDates.some((date) => date.isSame(elem, 'day'))
      })
    ) {
      return true
    }
    return false
  }
}
