import React, { useMemo, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useField, useFormikContext } from 'formik'

import { t } from 'i18next'
import { FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material'

import { ErrorMessege } from '../input/errorText.styled'
import { VerticalGroup } from 'styles/styledComponents/containers'
import { ICompanyLocation, useCompanyLocations } from 'hooks/dropdowns/useCompanyLocations'
import { useStates } from 'hooks/dropdowns/useStates'
import { useCountries } from 'hooks/dropdowns/useCountries'
import { useUserSettings } from 'hooks/user/useUserSettings'
export interface IOption {
  value?: number
  text: string
  code?: string
}
export interface LocationSelectProps {
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

function LocationSelect({
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
}: LocationSelectProps) {
  const themeContext = React.useContext(ThemeContext)
  const userSettings = useUserSettings()
  const [field, meta, helpers] = useField(props)
  const { setValue } = helpers
  const formik: any = useFormikContext()

  const states = useStates()
  const countries = useCountries()

  const { data }= useCompanyLocations(userSettings?.data?.companyID || -1)

   //formik setters
   const setAddress1 = formik.getFieldHelpers('address1').setValue
   const setAddress2 = formik.getFieldHelpers('address2').setValue
   const setCity = formik.getFieldHelpers('city').setValue
   const setState = formik.getFieldHelpers('state').setValue
   const setZip = formik.getFieldHelpers('zipCode').setValue
   const setCountry = formik.getFieldHelpers('country').setValue
   const setLat = formik.getFieldHelpers('lat').setValue
   const setLong = formik.getFieldHelpers('lng').setValue


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
          Select
        </InputLabel>
        <Select
          disabled={disabled}
          error={meta.error ? true : false}
          value={field.value}
          onChange={(e) => {
            setValue(e.target.value)
            const location = data?.find((loc: ICompanyLocation) => loc.id === e.target.value)
            if (location){
              setAddress1(location.street1)
              setAddress2(location.street2 || '')
              setCity(location.city)
              const stateId = states.data?.find(
                (stateObj: IOption) => stateObj.code === location.state,
              )?.value
              setState(stateId)
              setZip(location.postalCode)
              const countryId = countries.data?.find(
                  (countryObj: IOption) => countryObj.text === 'USA'
                )?.value
              setCountry(countryId)
              setLat(location?.latitude)
              setLong(location?.longitude)
            }
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
                <Tooltip key={option.value ? option.value : i} title={option.text} disableInteractive>
                  <div key={option.value ? option.value : i} style={{textOverflow: 'ellipsis', whiteSpace : 'nowrap', overflow: 'hidden'}}> {option.text}</div>
                </Tooltip>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </VerticalGroup>
  )
}

export default LocationSelect
