import React, { useState } from 'react'
import type { Dayjs } from 'dayjs'

import { PickerDiv } from './customDates.styled'
import { DateRangePicker } from '../date-picker/DateRangePicker'
import Button from '../button'
import dayjs from 'dayjs'
import { t } from 'i18next'

export interface IDatePickerInputProps {
  dates: Dayjs[]
  setDates: (date: Dayjs[]) => void
  customDateChange: (date: Dayjs[]) => void
  collapseAll?: () => void
  expanded: boolean
  setExpanded: (expanded: boolean) => void
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

function CustomDates(props: IDatePickerInputProps) {
  const {
    dates,
    setDates,
    customDateChange,
    collapseAll,
    expanded,
    setExpanded,
  } = props

  const initialState = dates.length > 0 ? dates : [dayjs(), dayjs()]
  const [updatedDates, setUpdatedDates] = useState<Dayjs[]>(initialState)
  const [dateRangeSeletorToggle, setDateRangeSeletorToggle] =
    useState<boolean>(true)

  function toggleExpand() {
    if (!expanded) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }

  function handleClose(e: Event) {
    e.preventDefault()
    toggleExpand()
    setUpdatedDates(initialState)
  }
  function handleConfirm(e: Event) {
    e.preventDefault()
    setDates(updatedDates)
    customDateChange(updatedDates)
    // toggleExpand()
    collapseAll ? collapseAll() : null
  }
  function handleChange(day: Dayjs) {
    if (dateRangeSeletorToggle) {
      setUpdatedDates([day, day])
    } else {
      if (
        new Date(day.format('llll')) > new Date(updatedDates[0].format('llll'))
      ) {
        setUpdatedDates([updatedDates[0], day])
      } else {
        setUpdatedDates([day, updatedDates[0]])
      }
    }

    setDateRangeSeletorToggle(!dateRangeSeletorToggle)
  }
  return (
    <div>
      <div onClick={toggleExpand} style={{ fontWeight: 600 }}>
        {t('Custom Dates')}
      </div>
      <PickerDiv expanded={expanded} offset="-250px">
        <div style={{ padding: '5px 5px 15px 5px' }}>
          <div style={{ borderBottom: '1px solid #b3b3b3' }}>
            <DateRangePicker
              dates={updatedDates}
              onChange={handleChange}
              setUpdatedDates={setUpdatedDates}
            />
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '20px',
              gap: '24px',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Button onClick={handleClose} size="sm" variant="nobg">
              {t('Cancel')}
            </Button>
            <Button variant="primary" onClick={handleConfirm} size="sm">
              {t('Apply')}
            </Button>
          </div>
        </div>
      </PickerDiv>
    </div>
  )
}
export default CustomDates
