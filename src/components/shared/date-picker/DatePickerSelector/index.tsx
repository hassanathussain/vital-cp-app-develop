import React, { useMemo } from 'react'
import { changeDateMonth } from '..'
import { Dayjs } from 'dayjs'
import ExpandMoreIcon from '../../icons/ExpandMoreIcon'
import {
  DatePickerSelectorDiv,
  DatePickerSelectorIconDiv,
} from './datePickerSelector.styled'
import { useTranslation } from 'react-i18next'
export interface IDatePickerSelectorProps {
  shownDate: Dayjs

  setShownDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

export const DatePickerSelector: React.FC<IDatePickerSelectorProps> = ({
  shownDate,
  setShownDate,
}) => {
  const { t } = useTranslation()
  const handleIconClick = (isNextMonth: boolean) => {
    return () => {
      setShownDate(changeDateMonth(shownDate, isNextMonth))
    }
  }

  const translatedDate = useMemo(() => {
    const dateElements = shownDate.format('MMMM YYYY').split(' ')
    const parsedMonth =
      dateElements && dateElements.length ? t(dateElements[0]) : ''
    const year = dateElements && dateElements.length > 1 ? dateElements[1] : ''
    return `${parsedMonth} ${year}`
  }, [shownDate])

  return (
    <DatePickerSelectorDiv>
      <DatePickerSelectorIconDiv
        $rotate={true}
        onClick={handleIconClick(false)}
      >
        <ExpandMoreIcon />
      </DatePickerSelectorIconDiv>

      <div style={{ fontSize: '16px', lineHeight: '24px', opacity: 0.6 }}>
        {translatedDate}
      </div>

      <DatePickerSelectorIconDiv
        $rotate={false}
        onClick={handleIconClick(true)}
      >
        <ExpandMoreIcon />
      </DatePickerSelectorIconDiv>
    </DatePickerSelectorDiv>
  )
}
