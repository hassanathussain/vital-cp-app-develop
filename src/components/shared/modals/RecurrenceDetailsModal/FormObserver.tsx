import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

import { IRecurringDetails } from '.'
export default function FormObserver() {
  const formik: any = useFormikContext()
  const values: IRecurringDetails = formik.values
  const [previousValues, setPreviousValues] =
    useState<IRecurringDetails>(values)

  const setEvery = formik.getFieldHelpers('every').setValue
  const setDayOfWeek = formik.getFieldHelpers('dayOfWeek').setValue

  const setVals = () => {
    setEvery(1)
    if (values.repeats === 'Weekly') {
      setDayOfWeek('Mon')
    } else {
      setDayOfWeek('')
    }
  }
  enum dayOfWeek {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
  }

  useEffect(() => {
    if (values.repeats !== previousValues.repeats) {
      setVals()
      setPreviousValues(values)
    }

    // when created a schedule with that repeats weekly
    // this will make sure thart the day of the week is selected for the start date

    if (
      values.modalStartDate !== previousValues.modalStartDate &&
      values.repeats === 'Weekly'
    ) {
      const days = values?.dayOfWeek
        ?.split(',')

        ?.map((day) => dayOfWeek[day.trim() as keyof typeof dayOfWeek])
      const day = values?.modalStartDate?.day()

      if (!days.includes(day)) {
        setDayOfWeek(values?.dayOfWeek.concat(`, ${dayOfWeek[day]}`))
      }
    }
  }, [values.modalStartDate])
  return null
}
