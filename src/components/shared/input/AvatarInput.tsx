import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { useField } from 'formik'

import Button from '../button'

function AvatarInput(props: any) {
  const [field, meta, helpers] = useField(props)
  const [hasNewValue, setHasNewValue] = useState<boolean>(false)
  const { setValue } = helpers
  const { initials } = props

  const handleFileUpload = (e: any) => {
    setValue(e.currentTarget.files[0].name)
    setHasNewValue(true)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '326px',
      }}
    >
      <div
        style={{
          marginRight: '24px',
        }}
      >
        <Avatar
          sx={{
            width: '60px',
            height: '60px',
            background: '#E3E3E5',
            borderRadius: '200px',
            flex: 'none',
            color: '#595E61',
            fontSize: '22px',
            lineHeight: '18px',
          }}
        >
          {initials ? initials : 'JC'}
        </Avatar>
      </div>
      <input
        onChange={handleFileUpload}
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
        style={{ display: 'none' }}
        id="file"
        name="file"
      />
      {/* <div style={{ display: 'flex', gap: '4px' }}>
        <Button
          onClick={(e: any) => {
            document?.getElementById('file')?.click()
            e.preventDefault()
          }}
          variant="upload"
          size="sm"
        >
          Upload Image
        </Button>
        {hasNewValue && (
          <Button
            onClick={(e: any) => {
              setValue(null)
              setHasNewValue(false)
            }}
            variant="clear"
            size="sm"
          >
            Clear
          </Button>
        )}
      </div> */}
    </div>
  )
}

export default AvatarInput
