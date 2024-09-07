import { useField, useFormikContext } from 'formik'
import { ErrorMessege } from './errorText.styled'
import { AttendeeInfo, ContactInfo } from 'hooks/useStepForm'
import React, { useMemo, useState } from 'react'
import Button from 'shared/button'
import Checkbox from 'shared/checkbox/Checkbox'
import { DatePickerInput } from 'shared/date-picker/DatePickerInput'
import BasicSelect, { IOption } from 'shared/select/BasicSelect'
import {
  StyledDescription,
  StyledEventDescription,
  StyledLabel,
} from '../../pages/user-settings/userSettings.styled'

import styled, { ThemeContext } from 'styled-components'
import { VerticalGroup } from 'styles/styledComponents/containers'
import AvatarInput from './AvatarInput'
import ContactInputList from './ContactInputList'
import { FormRowsContainer } from './FormInputRow/inputRow.styles'
import { StyledInput } from './input.styled'
import { StyledTextarea } from './textarea.styled'
import YesNoField from './YesNoField'
import { useTranslation } from 'react-i18next'
import FormikTimePicker from 'shared/timePicker/FormikTimePicker'
import { AutocompleteInput } from './AutocompleteInput'
import { Dayjs } from 'dayjs'
import { StyledDuration } from '../../pages/new-request/step3/step3.styled'
import AutocompleteInputList, {
  Label,
  LocationAutocompleteInput,
  POCEmailAutocompleteInput,
} from './AutocompleteInputList'
import { useUserSettings } from 'hooks/user/useUserSettings'
import { useCompanyContacts } from 'hooks/contacts/useCompanyContacts'
import LocationSelect from 'shared/select/LocationSelect'
import Checkbox2 from 'shared/checkbox/Checkbox2'
import {
  ICompanyLocation,
  useCompanyLocations,
} from 'hooks/dropdowns/useCompanyLocations'
import { useStates } from 'hooks/dropdowns/useStates'
import { useCountries } from 'hooks/dropdowns/useCountries'
import FileInput from './FileInput'
function FormInputRow(props: any) {
  const themeContext = React.useContext(ThemeContext)
  const { t } = useTranslation()

  const userSettings = useUserSettings()
  const contactList = useCompanyContacts(userSettings?.data?.companyID || -1)

  const { data } = useCompanyLocations(userSettings?.data?.companyID || -1)
  const companyLocationsOptions = data?.map((el: ICompanyLocation) => ({
    value: el.id,
    text: `${el.street1}, ${el.city}, ${el.state}, ${el.postalCode} ${el.country}`,
  }))

  const { group, setReadOnly, isOnsite = false } = props
  const formik = useFormikContext()

  const { values } = useFormikContext<{
    attendees: AttendeeInfo[]
    prefProviders: ContactInfo[]
    consumers: ContactInfo[]
    isActive: boolean
    onChange: (event: any) => void
    pocEmail: string
    isNewLocation: boolean
    locationId: number | null
  }>()

  const [startTimeField, startTimeMeta] = useField('startTime')
  const [endTimeField, endTimeMeta] = useField('endTime')

  const [cityField, cityMeta] = useField('city')
  const [zipField, zipMeta] = useField('zipCode')

  const startTime = startTimeField?.value as Dayjs
  const endTime = endTimeField?.value as Dayjs

  const hourDiff = endTime?.hour() - startTime?.hour()
  const minDiff = endTime?.minute() - startTime?.minute()

  const calcMeetingTime = (min: number, hours: number) => {
    if (hours > 0 && min > 0) {
      return `${t('Duration')}: ${hours} ${
        hours === 1 ? t('hour') : t('hours')
      } ${min} ${min === 1 ? t('minute') : t('minutes')}`
    } else if (hours > 0 && min < 0) {
      return `${t('Duration')}: ${hours - 1} ${t('hours')} ${60 + min} ${
        60 + min === 1 ? t('minute') : t('minutes')
      } `
    } else if (hours < 0 && min > 0) {
      return `${t('Duration')}: ${24 + hours} hours ${min} ${
        min === 1 ? t('minute') : t('minutes')
      } `
    } else if (hours < 0 && min === 0) {
      return `${t('Duration')}: ${24 + hours} ${t('hours')}`
    } else if (min > 0 && hours === 0) {
      return `${t('Duration')}: ${min} ${
        min === 1 ? t('minute') : t('minutes')
      }`
    } else if (hours > 0 && min === 0) {
      return `${t('Duration')}: ${hours} ${
        hours === 1 ? t('hour') : t('hours')
      }`
    } else if (hours <= 0 && min < 0) {
      return `${t('Duration')}: ${24 + hours - 1} ${t('hours')} ${60 + min} ${
        60 + min === 1 ? t('minute') : t('minutes')
      }  `
    } else {
      return ''
    }
  }

  const duration = useMemo(
    () => calcMeetingTime(minDiff, hourDiff),
    [minDiff, hourDiff],
  )

  const states = useStates()
  const countries = useCountries()

  //formik setters
  const setAddress1 = formik.getFieldHelpers('address1').setValue
  const setAddress2 = formik.getFieldHelpers('address2').setValue
  const setCity = formik.getFieldHelpers('city').setValue
  const setState = formik.getFieldHelpers('state').setValue
  const setZip = formik.getFieldHelpers('zipCode').setValue
  const setCountry = formik.getFieldHelpers('country').setValue
  const setLat = formik.getFieldHelpers('lat').setValue
  const setLong = formik.getFieldHelpers('lng').setValue
  const setLocationId = formik.getFieldHelpers('locationId').setValue

  const contactOptions =
    contactList?.data
      ?.filter((el) => {
        return el.contactType === 'POC'
      })
      .map((el) => {
        return {
          label: el.email,
          id: el.id,
          tooltip: el.fullName,
        }
      }) || []
  const isStringIsInContactOptions = (input: string) => {
    //if the contact is in the contact list we need to set the fields and disable the inputs
    return contactOptions.some((c) => c.label === input)
  }

  const setFieldsFromStringEmail = (email: string) => {
    const contact = contactList?.data?.find((el) => {
      return el.email === email
    })
    if (contact) {
      const selected = {
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        phone: contact.phoneNumber,
        prefName: contact.preferredName,
      }
      setReadOnly(true)

      formik.setFieldValue('pocEmail', selected.email)
      formik.setFieldValue('pocFullName', selected.fullName)
      formik.setFieldValue('pocPrefName', selected.prefName)
      formik.setFieldValue('pocPhone', selected.phone)
    }
  }

  const handleEmailSelected = (name: Label) => {
    const selected = contactList?.data?.find(
      (contact) => contact.email === name.label,
    )
    if (selected) {
      if (setReadOnly && selected.email) {
        setReadOnly(true)
      }
      setFieldsFromStringEmail(selected.email)
    }
  }

  const handleLocationSelected = (id: number) => {
    const location = data?.find((location) => location.id === id)
    if (location) {
      setLocationId(location.id)
      setAddress1(location.street1)
      setAddress2(location.street2 || '')
      setCity(location.city)
      const stateId = states.data?.find(
        (stateObj: IOption) =>
          stateObj.code === location.state || stateObj.text === location.state,
      )?.value
      setState(stateId)
      setZip(location.postalCode)
      const countryId = countries.data?.find(
        (countryObj: IOption) => countryObj.text === 'USA',
      )?.value
      setCountry(countryId)
      setLat(location?.latitude)
      setLong(location?.longitude)
    }
  }

  const handleClear = () => {
    setReadOnly(false)
    formik.setFieldValue('pocEmail', '')
    formik.setFieldValue('pocFullName', '')
    formik.setFieldValue('pocPrefName', '')
    formik.setFieldValue('pocPhone', '')
    setLocationId(null)
    setAddress1('')
    setAddress2('')
    setCity('')
    setState('')
    setZip('')
    setLat(null)
    setLong(null)
    setCountry('')
  }

  return (
    <FormRowsContainer>
      <VerticalGroup style={{ width: '356px' }}>
        <StyledLabel>{group.label}</StyledLabel>
        {group.label === t('Name of Event *') ? (
          <StyledEventDescription>{group.helperText}</StyledEventDescription>
        ) : (
          <StyledDescription>{group.helperText}</StyledDescription>
        )}
        {/* {group.label === t('Service location *') && <CreateRequestMap />} */}
      </VerticalGroup>
      <VerticalGroup
        gap={
          group.label === 'Service location *' && !values.isNewLocation
            ? '0px'
            : '28px'
        }
      >
        {group?.forms?.map((form: any, i: number) => {
          const [field, meta] = useField(form)

          return (
            <div key={i}>
              {form.type === 'text' && (
                <VerticalGroup>
                  <StyledInput
                    disabled={form.name === 'contactEmail'}
                    width="304px"
                    height="26px"
                    backgroundColor={
                      form.name === 'contactEmail' ? '#E7EBF0' : 'white'
                    }
                    borderColor="#d9d9d9"
                    fontSize="16px"
                    ThemeContext={themeContext}
                    placeholder={form?.placeholder || ''}
                    error={meta.error ? true : false}
                    {...field}
                    {...form}
                  />
                  {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
                </VerticalGroup>
              )}
              {form.type === 'select' && (
                <BasicSelect
                  backgroundColor="white"
                  width="326px"
                  height="42px"
                  error={meta.error ? true : false}
                  {...form}
                />
              )}
              {form.type === 'locationSelect' && (
                <LocationSelect
                  disabled={values.isNewLocation}
                  backgroundColor="white"
                  width="460px"
                  height="42px"
                  error={meta.error ? true : false}
                  {...form}
                />
              )}
              {form.type === 'password' && (
                <VerticalGroup>
                  <StyledLabel>{form.helperText}</StyledLabel>
                  <StyledInput
                    width="304px"
                    type={'password'}
                    height="26px"
                    backgroundColor="white"
                    borderColor="#d9d9d9"
                    fontSize="16px"
                    ThemeContext={themeContext}
                    error={meta.error ? true : false}
                    {...field}
                  />
                </VerticalGroup>
              )}
              {form.type === 'select2' &&
                (values.isNewLocation || !isOnsite) &&
                (form.name === 'state' || form.name === 'country') && (
                  <div
                    style={{
                      width: '326px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <StyledLabel>{form.helperText}</StyledLabel>
                    <BasicSelect
                      backgroundColor="white"
                      width="326px"
                      height="42px"
                      disabled={
                        (form.name === 'state' && isOnsite) ||
                        form.name === 'country'
                      }
                      {...form}
                    />
                  </div>
                )}{' '}
              {form.type === 'select2' &&
                form.name !== 'state' &&
                form.name !== 'country' && (
                  <div
                    style={{
                      width: '326px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <StyledLabel>{form.helperText}</StyledLabel>
                    <BasicSelect
                      backgroundColor="white"
                      width="326px"
                      height="42px"
                      disabled={
                        form.name === 'state' || form.name === 'country'
                      }
                      {...form}
                    />
                  </div>
                )}{' '}
              {form.type === 'text2' &&
                values.isNewLocation &&
                (form.name === 'address2' ||
                  form.name === 'city' ||
                  form.name === 'zipCode') && (
                  <div
                    style={{
                      width: '326px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <StyledLabel>{form.helperText}</StyledLabel>
                    <StyledInput
                      disabled={
                        form.readOnly ||
                        form.name === 'city' ||
                        form.name === 'zipCode'
                      }
                      width="304px"
                      height="26px"
                      backgroundColor="white"
                      borderColor="#d9d9d9"
                      fontSize="16px"
                      ThemeContext={themeContext}
                      placeholder={form?.placeholder || ''}
                      error={
                        form.name === 'city' || form.name === 'zipCode'
                          ? false
                          : meta.error
                          ? true
                          : false
                      }
                      {...field}
                    />
                    {meta.error &&
                      form.name !== 'city' &&
                      form.name !== 'zipCode' && (
                        <ErrorMessege>{meta.error}</ErrorMessege>
                      )}
                  </div>
                )}{' '}
              {form.type === 'text2' &&
                form.name !== 'address2' &&
                form.name !== 'city' &&
                form.name !== 'zipCode' && (
                  <div
                    style={{
                      width: '326px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <StyledLabel>{form.helperText}</StyledLabel>
                    <StyledInput
                      disabled={
                        form.readOnly ||
                        form.name === 'city' ||
                        form.name === 'zipCode'
                      }
                      width="304px"
                      height="26px"
                      backgroundColor="white"
                      borderColor="#d9d9d9"
                      fontSize="16px"
                      ThemeContext={themeContext}
                      placeholder={form?.placeholder || ''}
                      error={meta.error ? true : false}
                      {...field}
                    />
                    {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
                  </div>
                )}{' '}
              {form.type === 'contactEmail' && (
                <div
                  style={{
                    width: '326px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <StyledLabel>{form.helperText}</StyledLabel>
                  <POCEmailAutocompleteInput
                    onInputChange={(change: string) => {
                      const exists = isStringIsInContactOptions(change)
                      setReadOnly(exists)
                      if (exists) {
                        setFieldsFromStringEmail(change)
                      } else {
                        formik.setFieldValue('pocEmail', change)
                      }
                    }}
                    contactOptions={contactOptions}
                    onChange={handleEmailSelected}
                    handleClear={handleClear}
                    initialValue={values.pocEmail}
                  />
                  {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
                </div>
              )}{' '}
              {form.type === 'locationAutocomplete' && (
                <div
                  style={{
                    width: '326px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <StyledLabel>{form.helperText}</StyledLabel>
                  <LocationAutocompleteInput
                    locationOptions={
                      companyLocationsOptions?.map((el) => {
                        return {
                          label: el.text,
                          id: el.value,
                          tooltip: el.text,
                        }
                      }) || []
                    }
                    onChange={handleLocationSelected}
                    handleClear={() => {
                      setLocationId(null)
                      setAddress1('')
                      setAddress2('')
                      setCity('')
                      setState('')
                      setZip('')
                      setLat(null)
                      setLong(null)
                      setCountry('')
                    }}
                    initialValue={values.locationId}
                    disabled={values.isNewLocation}
                    required={false}
                    label={t('Location')}
                  />
                  {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
                </div>
              )}{' '}
              {form.type === 'autocomplete' && values.isNewLocation && (
                <div
                  style={{
                    width: '326px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <StyledLabel>{form.helperText}</StyledLabel>
                  <LocationAutocompleteInput
                    locationOptions={
                      companyLocationsOptions?.map((el) => {
                        return {
                          label: el.text,
                          id: el.value,
                          tooltip: el.text,
                        }
                      }) || []
                    }
                    onChange={handleLocationSelected}
                    handleClear={() => {
                      setLocationId(null)
                      setAddress1('')
                      setAddress2('')
                      setCity('')
                      setState('')
                      setZip('')
                      setLat(null)
                      setLong(null)
                      setCountry('')
                    }}
                    initialValue={values.locationId}
                    disabled={values.isNewLocation}
                    required={false}
                    label={t('Location')}
                  />
                  {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
                </div>
              )}{' '}
              {form.type === 'autocomplete' && values.isNewLocation && (
                <div
                  style={{
                    width: '326px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <StyledLabel>{form.helperText}</StyledLabel>
                  <AutocompleteInput disabled={false} />
                  {(meta.error || zipMeta.error || cityMeta.error) && (
                    <ErrorMessege>
                      {t(
                        'Street name, city, state, and postal code are required',
                      )}
                    </ErrorMessege>
                  )}
                </div>
              )}
              {form.type === 'avatarInput' && (
                <AvatarInput {...form} initials={form.initials} />
              )}{' '}
              {form.type === 'yesNo' && (
                <YesNoField {...field} error={meta.error} />
              )}
              {form.type === 'inputList' && form.name === 'consumers' && (
                <AutocompleteInputList
                  value={values.consumers}
                  formField={'consumers'}
                />
              )}
              {form.type === 'inputList' && form.name === 'attendees' && (
                <AutocompleteInputList
                  value={values.attendees}
                  formField={'attendees'}
                />
              )}
              {form.type === 'inputList' && form.name === 'prefProviders' && (
                <ContactInputList
                  value={values.prefProviders}
                  formField={'prefProviders'}
                />
              )}
              {form.type === 'textarea' && (
                <VerticalGroup>
                  <StyledTextarea
                    ThemeContext={themeContext}
                    rows={5}
                    fontSize={'16px'}
                    width="300px"
                    error={meta.error ? true : false}
                    placeholder={form?.placeholder || t('Type here...')}
                    {...field}
                    {...props}
                  />
                  {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
                </VerticalGroup>
              )}
              {form.type === 'checkbox' && (
                <Checkbox
                  onChange={form.onChange}
                  checked={form.checked}
                  label={form.label}
                />
              )}
              {form.type === 'checkbox2' && !values.isNewLocation && (
                <div style={{ marginTop: '28px' }}>
                  <Checkbox2 name={form.name} label={t('Add new location')} />
                </div>
              )}
              {form.type === 'checkbox2' && values.isNewLocation && (
                <Checkbox2 name={form.name} label={t('Add new location')} />
              )}
              {form.type === 'date' && (
                <VerticalGroup>
                  <StyledLabel>{form.helperText}</StyledLabel>
                  <DatePickerInput width="300px" height="26px" {...form} />
                </VerticalGroup>
              )}
              {form.type === 'time' && form.name === 'startTime' && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '326px',
                      alignItems: 'center',
                    }}
                  >
                    <VerticalGroup>
                      <StyledLabel>{form.helperText}</StyledLabel>
                      <FormikTimePicker width="100px" height="26px" {...form} />
                    </VerticalGroup>
                    <VerticalGroup
                      style={{
                        paddingTop: '15px',
                      }}
                    >
                      -
                    </VerticalGroup>
                    <VerticalGroup>
                      <StyledLabel>{t('End time')}</StyledLabel>
                      <FormikTimePicker
                        width="100px"
                        height="26px"
                        name="endTime"
                      />
                    </VerticalGroup>
                  </div>
                  <StyledDuration>{duration}</StyledDuration>
                  {meta.error && endTimeMeta.error && (
                    <div
                      style={{
                        color: '#BA1A1A',
                        paddingTop: '6px',
                        maxWidth: '326px',
                      }}
                    >
                      <VerticalGroup>
                        <div>{meta.error && t('Invalid start time')}</div>
                        <div>{endTimeMeta.error && t('Invalid end time')}</div>
                      </VerticalGroup>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </VerticalGroup>
    </FormRowsContainer>
  )
}

export default FormInputRow
