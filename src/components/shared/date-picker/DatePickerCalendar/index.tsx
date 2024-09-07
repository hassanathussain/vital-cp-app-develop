import React, { useMemo } from 'react'
import { Dayjs } from 'dayjs'
import { CalendarCellDiv, DayCellDiv } from './datePickerCalendar.styled'
import { useTranslation } from 'react-i18next'
// our interface for a single cell
export interface ICalendarCell {
  text: string
  value: Dayjs
}

function getCalendarCells(date: Dayjs): ICalendarCell[] {
  const daysInMonth = date.daysInMonth()
  const calendarCells: ICalendarCell[] = []

  const prepareCell = (date: Dayjs, dayNumber: number) => {
    return {
      text: String(dayNumber),
      value: date.clone().set('date', dayNumber),
    }
  }

  // push current month day cells
  for (let i = 0; i < daysInMonth; i++) {
    calendarCells.push(prepareCell(date, i + 1))
  }

  // how much more we need to add?
  // const cellsToAdd = 35 - daysInMonth
  //this is where we need to find a sunday to the first row _________________________
  // add to start from prev month
  const lastMonth = date.subtract(1, 'month')
  let isSunday = false
  let j = 0
  if (calendarCells[0].value.day() === 0) isSunday = true
  const cellsToAdd = 42 - daysInMonth
  while (!isSunday) {
    calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - j))
    if (calendarCells[0].value.day() === 0) isSunday = true
    j++
  }

  // add to end from next month
  const nextMonth = date.add(1, 'month')
  for (let i = 0; i < Math.round(cellsToAdd - j); i++) {
    calendarCells.push(prepareCell(nextMonth, i + 1))
  }
  return calendarCells
}

export function getCalendarRows(date: Dayjs): Array<ICalendarCell[]> {
  const cells = getCalendarCells(date)
  const rows: Array<ICalendarCell[]> = []

  // split one array into chunks

  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }

  return rows
}

export interface IDatePickerCalendarProps {
  shownDate: Dayjs
  selectedDate: Dayjs | Dayjs[]

  onChange: (newDate: Dayjs) => void
}

export const isBetween = (
  value: Dayjs,
  startDate: Dayjs,
  endDate: Dayjs,
  granularity: string,
) => {
  return startDate < value && value < endDate
}

export const DatePickerCalendar: React.FC<IDatePickerCalendarProps> = ({
  shownDate,
  selectedDate,
  onChange,
}) => {
  const { t } = useTranslation()
  const handleSelectDate = (value: Dayjs) => {
    return () => onChange(value)
  }

  const rows = useMemo(() => getCalendarRows(shownDate), [shownDate])

  return (
    <>
      <div style={{ marginBottom: '8px', display: 'flex' }}>
        {rows[0].map(({ value }, i) => (
          <CalendarCellDiv key={i}>{t(value.format('dd'))}</CalendarCellDiv>
        ))}
      </div>

      {rows.map((cells, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', marginTop: '5px' }}>
          {cells.map(({ text, value }, i) => {
            let isSelected = false
            let isInRange = false
            let isStartDate = false
            let isEndDate = false
            const isInMonth = value.isSame(shownDate, 'month')

            if (Array.isArray(selectedDate)) {
              const startDate = selectedDate[0]
              const endDate = selectedDate[1]
              if (isBetween(value, startDate, endDate, 'day')) isInRange = true
              if (value.isSame(startDate, 'day')) {
                isSelected = true
                isStartDate = true
                isInRange = false
              }
              if (value.isSame(endDate, 'day')) {
                isSelected = true
                isEndDate = true
                isInRange = false
              }
            } else {
              if (value.toString() === selectedDate.toString())
                isSelected = true
            }
            return (
              <DayCellDiv
                key={`${text} - ${i}`}
                isSelected={isSelected}
                isInRange={isInRange}
                isInMonth={isInMonth}
                isStartDate={isStartDate}
                isEndDate={isEndDate}
                onClick={handleSelectDate(value)}
              >
                {text}
              </DayCellDiv>
            )
          })}
        </div>
      ))}
    </>
  )
}
