import { getGeocode, getLatLng } from 'use-places-autocomplete'
import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { useStates } from 'hooks/dropdowns/useStates'
import { useCountries } from 'hooks/dropdowns/useCountries'
import { IOption } from 'shared/select/BasicSelect'
import {
  Autocomplete,
  Box,
  debounce,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
const autocompleteService = { current: null }

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}
interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
}
interface IProps {
  disabled: boolean
}

export const AutocompleteInput = (props: IProps) => {
  const { disabled } = props
  const { t } = useTranslation()
  const [value, setValue] = React.useState<PlaceType | null>(null)
  const formik: any = useFormikContext()
  const [inputValue, setInputValue] = React.useState(formik?.values?.address1)
  const [options, setOptions] = React.useState<readonly PlaceType[]>([])
  //lcoation data for id's
  const states = useStates()
  const countries = useCountries()

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          ;(autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          )
        },
        400,
      ),
    [],
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])
  //formik setters
  const setAddress1 = formik.getFieldHelpers('address1').setValue
  const setAddress2 = formik.getFieldHelpers('address2').setValue
  const setCity = formik.getFieldHelpers('city').setValue
  const setState = formik.getFieldHelpers('state').setValue
  const setZip = formik.getFieldHelpers('zipCode').setValue
  const setCountry = formik.getFieldHelpers('country').setValue
  const setLat = formik.getFieldHelpers('lat').setValue
  const setLong = formik.getFieldHelpers('lng').setValue

  useEffect(() => {
    if (formik.values.address1 === '') {
      setInputValue('')
      setValue(null)
    }
    if (formik.values.address1 !== '') {
      setInputValue(formik.values.address1)
    }
  }, [formik.values.address1])

  useEffect(() => {
    if (inputValue !== '') {
      setAddress1(inputValue)
    }
    if (inputValue === '') {
      setAddress1('')
    }
  }, [inputValue])

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0])

        const addressComponents = results[0].address_components

        const streetNumber = addressComponents.find((component: any) =>
          component.types.includes('street_number'),
        )?.long_name
        const streetName = addressComponents.find((component: any) =>
          component.types.includes('route'),
        )?.long_name

        const city = addressComponents.find((component: any) =>
          component.types.includes('locality'),
        )?.long_name
        const state = addressComponents.find((component: any) =>
          component.types.includes('administrative_area_level_1'),
        )?.long_name
        const zip = addressComponents.find((component: any) =>
          component.types.includes('postal_code'),
        )?.long_name
        const country = addressComponents.find((component: any) =>
          component.types.includes('country'),
        )?.long_name

        if (streetNumber && streetName) {
          setAddress1(`${streetNumber} ${streetName}`)
          setInputValue(`${streetNumber} ${streetName}`)
        } else if (streetName) {
          setAddress1(streetName)
          setInputValue(streetName)
        }
        if (lat && lng) {
          setLat(lat)
          setLong(lng)
        }
        if (city) {
          setCity(city)
        }
        if (state) {
          if (states?.status === 'success') {
            const stateId = states.data?.find(
              (stateObj: IOption) => stateObj.text === state,
            )?.value
            setState(stateId)
          }
        }
        if (zip) {
          setZip(zip)
        }
        if (country) {
          if (countries?.status === 'success') {
            if (country === t('United States')) {
              setCountry(
                countries.data?.find(
                  (countryObj: IOption) => countryObj.text === 'USA',
                )?.value,
              )
              return
            }

            const countryId = countries.data?.find(
              (countryObj: IOption) => countryObj.text === country,
            )?.value

            setCountry(countryId)
          }
        }
      })
    }

  return (
    <Autocomplete
      id="address1-autocomplete"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      disabled={disabled}
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          padding: '2px 10px',
          borderRadius: '8px',
          background: 'white',
          cursor: 'pointer',
          caretColor: '#28BFB2',
          fontSize: '16px',
        },
        padding: '0px',
      }}
      freeSolo
      includeInputInList
      disableClearable
      selectOnFocus
      filterSelectedOptions
      value={inputValue}
      noOptionsText="No locations"
      onChange={(event: any, newValue: string | PlaceType | null) => {
        if (typeof newValue === 'string') {
          setInputValue(newValue)
        } else {
          //   setValue(newValue)
          setOptions(newValue ? [newValue, ...options] : options)
          handleSelect(newValue as any)()
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => {
        return <TextField {...params} fullWidth />
      }}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || []

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {option.structured_formatting.main_text}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
