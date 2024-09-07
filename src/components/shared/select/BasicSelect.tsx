import React, { useMemo, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useField } from 'formik'

import { t } from 'i18next'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { ErrorMessege } from '../input/errorText.styled'
import { VerticalGroup } from 'styles/styledComponents/containers'
import { useTranslation } from 'react-i18next'
export interface IOption {
  value?: number
  text: string
  code?: string
}
export interface BasicSelectProps {
  name: string
  label?: string
  options: IOption[]
  width?: string
  height?: string
  backgroundColor?: string
  fontSize?: string
  error?: boolean
  onChange?: (id: number) => void
  disabled?: boolean
}

function BasicSelect({
  label,
  width,
  height,
  options,
  backgroundColor,
  fontSize,
  error,
  onChange,
  disabled,
  ...props
}: BasicSelectProps) {
  const { t } = useTranslation()
  const themeContext = React.useContext(ThemeContext)
  const [field, meta, helpers] = useField(props)

  const { setValue } = helpers

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        marginTop: '6px',
      },
    },
  }
  return (
    <VerticalGroup className={field.name} id={field.name}>
      <FormControl
        sx={{
          'label.MuiInputLabel-shrink.MuiFormLabel-filled': {
            display: 'none',
          },
          'label.MuiInputLabel-shrink.Mui-focused': {
            left: '14px',
            top: '11px',
            color: 'rgba(0, 0, 0, 0.6)',
            transform: 'none',
            transition: 'none',
          },
        }}
      >
        <InputLabel
          sx={{
            top: '-5px',
          }}
        >
          {
            t('Select')
          }
        </InputLabel>
        <Select
          disabled={disabled}
          error={meta.error ? true : false}
          value={field.value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          sx={{
            width: width,
            height: height,
            borderRadius: '8px',
            outline: 'none',
            '&:hover': {
              outline: '1px solid #D9D9D9',
              border: 'none',
              color: 'none',
            },
          }}
          MenuProps={MenuProps}
        >
          {options?.map((option: any, i: number) => {
            return (
              <MenuItem
                key={option.value ? option.value : i}
                value={option.value}
              >
                {option.text}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </VerticalGroup>
  )
}

export default BasicSelect
