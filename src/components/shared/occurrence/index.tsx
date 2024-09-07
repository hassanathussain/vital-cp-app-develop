import React from 'react'
import { useField } from 'formik'
import { DayDiv, OccurrenceDiv } from './Occurrence.styled'
import { useTranslation } from 'react-i18next'

function Occurrence(props: any) {
  const { t } = useTranslation()
  const { width } = props
  const [field, meta, helpers] = useField(props)

  const { setValue } = helpers
  function handleChange(e: any) {
    const newvals: string[] = []
    days.forEach((elem, i) => {
      if (e.target.id !== elem.value && field.value.includes(elem.value))
        newvals.push(elem.value)
      else if (e.target.id === elem.value && !field.value.includes(elem.value))
        newvals.push(elem.value)
    }),
      setValue(newvals.join(', '))
  }
  const days = [
    {
      value: 'Sun',
      label: t('Sun'),
    },
    {
      value: 'Mon',
      label: t('Mon'),
    },
    {
      value: 'Tue',
      label: t('Tue'),
    },
    {
      value: 'Wed',
      label: t('Wed'),
    },
    {
      value: 'Thu',
      label: t('Thu'),
    },
    {
      value: 'Fri',
      label: t('Fri'),
    },
    {
      value: 'Sat',
      label: t('Sat'),
    },
  ]
  return (
    <OccurrenceDiv width={width}>
      {days.map((elem, i: number) => {
        return (
          <DayDiv
            key={i}
            onClick={handleChange}
            id={elem.value}
            selected={field.value.includes(elem.value)}
            isFirst={i === 0}
            isLast={i === 6}
          >
            {elem.label}
          </DayDiv>
        )
      })}
    </OccurrenceDiv>
  )
}

export default Occurrence
