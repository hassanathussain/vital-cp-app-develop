import * as React from 'react'
import { useField, useFormikContext } from 'formik'
import { Dayjs } from 'dayjs'
import NewTimePicker from './NewTimePicker'

function FormikTimePicker(props: any) {
  const [field, meta, helpers] = useField(props)

  const { setValue, setError } = helpers
  const formik = useFormikContext()
  function handleChange(value: Dayjs | null) {
    setValue(value)
    const interval = setInterval(() => {
      formik.validateForm()
      clearInterval(interval)
    }, 500)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NewTimePicker
        // error={meta.error ? true : false}
        time={field.value}
        setTime={handleChange}
        setError={setError}
      />
    </div>
  )
}

export default FormikTimePicker
