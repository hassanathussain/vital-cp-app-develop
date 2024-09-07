import dayjs from 'dayjs'
import { useFormikContext } from 'formik'
import React, { useEffect, useState, Dispatch } from 'react'
import { SetStateAction } from 'react'
import { RRule } from 'rrule'
import { getBasicRRule } from 'utils/rrule'
import { Step3FormInputs } from '../hooks/use-step3-form.hook'

export default function FormObserver({
  setShowDetailsModal,
}: {
  setShowDetailsModal: Dispatch<SetStateAction<boolean>>
}) {
  const formik: any = useFormikContext()
  const values: Step3FormInputs = formik.values
  const [previousValues, setPreviousValues] = useState<Step3FormInputs>(values)

  const setrRule = formik.getFieldHelpers('rRule').setValue

  function dateIsValid(date: any) {
    // eslint-disable-next-line
    //@ts-ignore
    return date instanceof Date && !isNaN(date)
  }
  useEffect(() => {
    if (values !== previousValues && values.recurring === 'Does not repeat') {
      setrRule(
        getBasicRRule(
          values.recurring,
          values?.startDate,
          values?.startTime || dayjs(),
        ),
      )
    } else if (
      values !== previousValues &&
      values.recurring !== 'Does not repeat'
    ) {
      if (typeof values.rRule !== 'string') {
        const newStartdt = new Date(
          `${values?.startDate?.format('L')},  ${values?.startTime?.format(
            'LT',
          )}`,
        )

        setrRule(
          new RRule({
            ...values.rRule?.origOptions,
            dtstart: dateIsValid(newStartdt) ? newStartdt : new Date(),
          }),
        )
      }
    }
    if (
      values.recurring !== previousValues.recurring &&
      values.recurring !== 'Does not repeat'
    ) {
      setShowDetailsModal(true)
    }
    setPreviousValues(values)
  }, [values.recurring, values.startTime, values.endTime, values.startDate])
  return null
}
