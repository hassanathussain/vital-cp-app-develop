import { useFormikContext } from 'formik'
import React, { useEffect, useState, Dispatch } from 'react'
import { SetStateAction } from 'react'

export default function FormObserver({
  setHasChanges,
}: {
  setHasChanges: Dispatch<SetStateAction<boolean>>
}) {
  const { values } = useFormikContext()
  const [previousValues, setPreviousValues] = useState<any>(values)

  useEffect(() => {
    if (previousValues !== values) {
      setHasChanges(true)
    } else {
      setHasChanges(false)
    }
  }, [values])
  return null
}
