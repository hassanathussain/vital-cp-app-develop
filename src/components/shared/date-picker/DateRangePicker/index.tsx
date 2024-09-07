import React, { useEffect, useRef, useState } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { DatePickerSelector } from '../DatePickerSelector'
import { DatePickerCalendar } from '../DatePickerCalendar'
import { DateRangePickerDiv } from './dateRangePicker.styled'
import Input from '../../input'
export interface IDateRangePickerProps {
  dates: Dayjs[]
  setUpdatedDates: (e: any) => void
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
export const DateRangePicker: React.FC<IDateRangePickerProps> = ({
  dates,
  onChange,
  setUpdatedDates,
}) => {
  const [shownDate, setShownDate] = useState(dates[0])
  const [startDate, setStartDate] = useState(dates[0].format('MMM DD, YYYY'))
  const [endDate, setEndDate] = useState(dates[1].format('MMM DD, YYYY'))
  const [showConfirm, setShowConfirm] = useState(false)
  const [startDateInputError, setStartDateInputError] = useState(false)
  const [endDateInputError, setEndDateInputError] = useState(false)

  useEffect(() => {
    setStartDate(dates[0].format('MMM DD, YYYY'))
    setEndDate(dates[1].format('MMM DD, YYYY'))
  }, [dates])

  function handleValueChange(change: string, value: string) {
    if (!showConfirm) setShowConfirm(true)
    if (value === 'start') setStartDate(change)
    if (value === 'end') setEndDate(change)
  }

  function inputErrorChecker() {
    if (!dayjs(startDate).isValid()) setStartDateInputError(true)
    else {
      setStartDateInputError(false)
    }
    if (!dayjs(endDate).isValid()) setEndDateInputError(true)
    else {
      setEndDateInputError(false)
    }
  }

  useEffect(() => {
    inputErrorChecker()
  }, [startDate, endDate])

  function handleSaveInput(e: any) {
    e.preventDefault()
    if (!endDateInputError && !startDateInputError) {
      setUpdatedDates([
        dayjs(startDate) ? dayjs(startDate) : dates[0],
        dayjs(endDate) ? dayjs(endDate) : dates[1],
      ])
    }
  }

  return (
    <DateRangePickerDiv>
      <DatePickerSelector shownDate={shownDate} setShownDate={setShownDate} />
      <form onClick={handleSaveInput}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            alignItems: 'center',
            padding: '8px 0px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              value={startDate}
              setValue={(e: any) => {
                handleValueChange(e.target.value, 'start')
              }}
              fontSize="16px"
              backgroundColor="#f5f5f5"
              padding="10px"
              error={startDateInputError}
              size="sm"
            />
          </div>
          <div>-</div>
          <Input
            value={endDate}
            setValue={(e: any) => {
              handleValueChange(e.target.value, 'end')
            }}
            fontSize="16px"
            backgroundColor="#f5f5f5"
            size="sm"
            padding="10px"
            error={endDateInputError}
          />
        </div>
      </form>
      <div style={{ marginTop: '5px', marginBottom: '10px' }}>
        <DatePickerCalendar
          selectedDate={dates}
          shownDate={shownDate}
          onChange={onChange}
        />
      </div>
    </DateRangePickerDiv>
  )
}
