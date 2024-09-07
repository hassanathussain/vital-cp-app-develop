import * as React from 'react'
import { useField } from 'formik'
import { Dayjs } from 'dayjs'

import TimePicker from './'

function BasicTimePicker(props: any) {
  const [field, meta, helpers] = useField(props)

  const { setValue } = helpers

  function handleChange(value: Dayjs) {
    setValue(value)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TimePicker
        error={meta.error ? true : false}
        value={field.value}
        onChange={handleChange}
        name={field.name}
      />
    </div>
  )
}

export default BasicTimePicker
