import React, { useEffect, useMemo, useState } from 'react'
import type { Dayjs } from 'dayjs'

import { PickerDiv, PlaceHolderDiv } from './datePickerInput.styled'
import CalendarIcon from '../../icons/CalendarIcon'
import { useField } from 'formik'
import { ThemeContext } from 'styled-components'
import { DatePicker } from '..'
import Button from '../../button'
import { useTranslation } from 'react-i18next'
export interface IDatePickerInputProps {
  name: string
  width: string
  height: string
  offset?: string
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

export const DatePickerInput: React.FC<IDatePickerInputProps> = (props) => {
  const { t } = useTranslation()
  const { name, width, height, offset } = props

  const themeContext = React.useContext(ThemeContext)

  const [field, meta, helpers] = useField(name)

  const { setValue } = helpers
  const [expanded, setExpanded] = React.useState(false)
  const [shownDate, setShownDate] = useState(
    field.value.format('MMMM DD, YYYY'),
  )
  const [selectedDate, setSelectedDate] = useState(field.value)

  const handleElseWhereClick = (event: any) => {
    const concernedElement = document.querySelector(`.datepicker-${name}`)
    if (concernedElement?.contains(event?.target)) {
      document.removeEventListener('mousedown', handleElseWhereClick)
    } else {
      document.removeEventListener('mousedown', handleElseWhereClick)
      setExpanded(false)
    }
  }

  function toggleExpand() {
    if (!expanded) {
      document.addEventListener('mousedown', handleElseWhereClick)
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }
  useEffect(() => {
    const transMonth = t(field.value.format('MMMM'))
    const rest = field.value.format('DD, YYYY')
    setShownDate(`${transMonth} ${rest}`)
  }, [field])

  function handleClose() {
    toggleExpand()
  }
  function handleConfirm() {
    setValue(selectedDate)
    toggleExpand()
  }
  function handleChange(event: any) {
    setSelectedDate(event)
  }

  return (
    <div className={`datepicker-${name}`}>
      <PlaceHolderDiv
        width={width}
        height={height}
        expanded={expanded}
        onClick={toggleExpand}
        error={meta.error ? true : false}
        themeContext={themeContext}
      >
        {shownDate} <CalendarIcon />
      </PlaceHolderDiv>
      {meta.error && (
        <div
          style={{
            color: '#BA1A1A',
            paddingTop: '6px',
            maxWidth: '326px',
          }}
        >
          {meta.error}
        </div>
      )}
      <PickerDiv expanded={expanded} offset={offset}>
        <div style={{ padding: '5px 5px 15px 5px' }}>
          <div style={{ borderBottom: '1px solid #b3b3b3' }}>
            <DatePicker value={selectedDate} onChange={handleChange} />
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
