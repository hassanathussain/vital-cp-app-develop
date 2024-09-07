import { el } from 'date-fns/locale'
import { useField } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DatePickerInput } from 'shared/date-picker/DatePickerInput'
import { ErrorMessege } from 'shared/input/errorText.styled'
import { VerticalGroup } from 'styles/styledComponents/containers'
import BasicTimePicker from '../../timePicker/BasicTimePicker'
import Occurrence from '../../occurrence'
import BasicSelect, { IOption } from '../../select/BasicSelect'
import { LabelSpan, RowDiv } from './RecurringDetailsModal.styled'
import FormikTimePicker from 'shared/timePicker/FormikTimePicker'

export enum Repeat {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

export const dailyOptions: IOption[] = [
  {
    value: 1,
    text: 'Day',
  },
  {
    value: 2,
    text: '2 Days',
  },
  {
    value: 3,
    text: '3 Days',
  },
  {
    value: 4,
    text: '4 Days',
  },
  {
    value: 5,
    text: '5 Days',
  },
  {
    value: 6,
    text: '6 Days',
  },
  {
    value: 7,
    text: '7 Days',
  },
]

export const weeklyOptions: IOption[] = [
  {
    value: 1,
    text: 'Week',
  },
  {
    value: 2,
    text: '2 Weeks',
  },
  {
    value: 3,
    text: '3 Weeks',
  },
  {
    value: 4,
    text: '4 Weeks',
  },
]

export const monthlyOptions: IOption[] = [
  {
    text: 'Month',
    value: 1,
  },
  {
    text: '2 Months',
    value: 2,
  },
  {
    text: '3 Months',
    value: 3,
  },
  {
    text: '4 Months',
    value: 4,
  },
  {
    text: '5 Months',
    value: 5,
  },
  {
    text: '6 Months',
    value: 6,
  },
  {
    text: '7 Months',
    value: 7,
  },
  {
    text: '8 Months',
    value: 8,
  },
  {
    text: '9 Months',
    value: 9,
  },
  {
    text: '10 Months',
    value: 10,
  },
  {
    text: '11 Months',
    value: 11,
  },
  {
    text: '12 Months',
    value: 12,
  },
]
export const dayOfMonthOptions: IOption[] = [
  {
    text: '1st day of the month',
    value: 1,
  },
  {
    text: '2nd day of the month',
    value: 2,
  },
  {
    text: '3rd day of the month',
    value: 3,
  },
  {
    text: '4th day of the month',
    value: 4,
  },
  {
    text: '5th day of the month',
    value: 5,
  },
  {
    text: '6th day of the month',
    value: 6,
  },
  {
    text: '7th day of the month',
    value: 7,
  },
  {
    text: '8th day of the month',
    value: 8,
  },
  {
    text: '9th day of the month',
    value: 9,
  },
  {
    text: '10th day of the month',
    value: 10,
  },
  {
    text: '11th day of the month',
    value: 11,
  },
  {
    text: '12th day of the month',
    value: 12,
  },
  {
    text: '13th day of the month',
    value: 13,
  },
  {
    text: '14th day of the month',
    value: 14,
  },
  {
    text: '15th day of the month',
    value: 15,
  },
  {
    text: '16th day of the month',
    value: 16,
  },
  {
    text: '17th day of the month',
    value: 17,
  },
  {
    text: '18th day of the month',
    value: 18,
  },
  {
    text: '19th day of the month',
    value: 19,
  },
  {
    text: '20th day of the month',
    value: 20,
  },
  {
    text: '21st day of the month',
    value: 21,
  },
  {
    text: '22nd day of the month',
    value: 22,
  },
  {
    text: '23rd day of the month',
    value: 23,
  },
  {
    text: '24th day of the month',
    value: 24,
  },
  {
    text: '25th day of the month',
    value: 25,
  },
  {
    text: '26th day of the month',
    value: 26,
  },
  {
    text: '27th day of the month',
    value: 27,
  },
  {
    text: '28th day of the month',
    value: 28,
  },
  {
    text: '29th day of the month',
    value: 29,
  },
  {
    text: '30th day of the month',
    value: 30,
  },
  {
    text: '31st day of the month',
    value: 31,
  },
]

export function getOptions(interval: Repeat | string): IOption[] {
  if (interval === 'Daily') {
    return dailyOptions
  }
  if (interval === 'Weekly') {
    return weeklyOptions
  }
  if (interval === 'Monthly') {
    return monthlyOptions
  }

  return []
}

function ModalRow(props: any) {
  const { t } = useTranslation()
  const { rowGroup } = props

  function getDayOfMonthOptions() {
    return dayOfMonthOptions.map((ele) => {
      return { ...ele, text: t(ele.text) }
    })
  }
  return (
    <div>
      {rowGroup.forms.map((form: any, j: number) => {
        const [field, meta] = useField(form)
        return (
          <div key={j}>
            {form.type === 'timeRange' && (
              <RowDiv>
                <LabelSpan>{rowGroup.label}</LabelSpan>
                <VerticalGroup>
                  <div
                    style={{
                      width: '326px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <FormikTimePicker
                      width="100px"
                      height="26px"
                      name="modalStartTime"
                    />
                    {t('to')}
                    <FormikTimePicker
                      width="100px"
                      height="26px"
                      name="modalEndTime"
                    />
                  </div>
                  {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
                </VerticalGroup>
              </RowDiv>
            )}
            {form.type === 'date' &&
              (form.name === 'modalStartDate' || form.name === 'endDate') && (
                <RowDiv>
                  <LabelSpan>{rowGroup.label}</LabelSpan>
                  <DatePickerInput
                    width="300px"
                    height="26px"
                    offset={form?.offset}
                    {...form}
                  />
                </RowDiv>
              )}
            {form.type === 'dayOfWeek' && props.values.repeats !== 'Daily' && (
              <RowDiv>
                <LabelSpan>{rowGroup.label}</LabelSpan>
                {props.values.repeats === 'Weekly' && (
                  <Occurrence name={form?.name} width="326px" />
                )}
                {props.values.repeats === 'Monthly' && (
                  <BasicSelect
                    backgroundColor="white"
                    width="300px"
                    height="26px"
                    name={form.name}
                    options={getDayOfMonthOptions()}
                  />
                )}
              </RowDiv>
            )}
            {form.type === 'select' && (
              <RowDiv>
                <LabelSpan>{rowGroup.label}</LabelSpan>

                <BasicSelect
                  backgroundColor="white"
                  width="326px"
                  height="40px"
                  name={form.name}
                  {...form}
                  options={
                    form.name === 'every'
                      ? getOptions(props.values.repeats).map((ele) => {
                          return { ...ele, text: t(ele.text) }
                        })
                      : form.options
                  }
                />
              </RowDiv>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ModalRow
