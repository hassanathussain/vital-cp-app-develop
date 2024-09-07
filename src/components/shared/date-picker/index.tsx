import React, { useState } from 'react'
import type { Dayjs } from 'dayjs'

import { DatePickerSelector } from './DatePickerSelector'
import { DatePickerCalendar } from './DatePickerCalendar'
import { DatePickerDiv } from './datePicker.styled'
export interface IDatePickerProps {
  value: Dayjs

  onChange: (newDate: Dayjs) => void
}

export function changeDateMonth(date: Dayjs, isNextMonth: boolean): Dayjs {
  // should decrease year
  if (date.month() === 0 && !isNextMonth) {
    return date.set('year', date.year() - 1).set('month', 11)
  }

  // should increase year
  if (date.month() === 11 && isNextMonth) {
    return date.set('year', date.year() + 1).set('month', 0)
  }

  // add or substract
  return date.add(isNextMonth ? 1 : -1, 'month')
}
export const DatePicker: React.FC<IDatePickerProps> = ({ value, onChange }) => {
  const [shownDate, setShownDate] = useState(value)

  return (
    <DatePickerDiv>
      <DatePickerSelector shownDate={shownDate} setShownDate={setShownDate} />

      <DatePickerCalendar
        selectedDate={value}
        shownDate={shownDate}
        onChange={onChange}
      />
    </DatePickerDiv>
  )
}
