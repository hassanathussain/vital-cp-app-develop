import { DataCardFormTypes, IUploadedFile } from 'models/jobDashboard'
import React, { useContext } from 'react'
import { useField, useFormikContext } from 'formik'
import { ThemeContext } from 'styled-components'

import { StyledInput } from 'shared/input/input.styled'
import { StyledTextarea } from 'shared/input/textarea.styled'
import InputList from 'shared/input/InputList'
import { DatePickerInput } from 'shared/date-picker/DatePickerInput'
import Occurrence from 'shared/occurrence'
import BasicSelect, { IOption } from 'shared/select/BasicSelect'

import YesNoField from 'shared/input/YesNoField'
import dayjs, { Dayjs } from 'dayjs'
import { RRule } from 'rrule'
import { t } from 'i18next'
import FormikTimePicker from 'shared/timePicker/FormikTimePicker'
import { VerticalGroup } from 'styles/styledComponents/containers'
import { StyledLabel } from '../../user-settings/userSettings.styled'
import { useServiceSubTypes } from 'hooks/dropdowns/useServiceSubTypes'
import ContactInputList from 'shared/input/ContactInputList'
import DynamicInputList from 'shared/input/DynamicInputList'
import { ContactInfo } from 'hooks/useStepForm'
import { useStates } from 'hooks/dropdowns/useStates'
import { useCountries } from 'hooks/dropdowns/useCountries'
import { getIntervalOptions } from '../../job-details/FormObserver'
import { AutocompleteInput } from 'shared/input/AutocompleteInput'
import { ErrorMessege } from 'shared/input/errorText.styled'
import Checkbox from 'shared/checkbox/Checkbox'
import Checkbox2 from 'shared/checkbox/Checkbox2'
import LocationSelect from 'shared/select/LocationSelect'
import {
  ICompanyLocation,
  useCompanyLocations,
} from 'hooks/dropdowns/useCompanyLocations'
import { useUserSettings } from 'hooks/user/useUserSettings'
import AutocompleteInputList, {
  Label,
  LocationAutocompleteInput,
  POCEmailAutocompleteInput,
} from 'shared/input/AutocompleteInputList'
import { IJobExtendedData } from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import UploadedFiles from 'shared/input/UploadedFiles'
import FileWithDownload from './FileWithDownload'
import { viewModes } from '../../job-details/JobView'
import { useCompanyContacts } from 'hooks/contacts/useCompanyContacts'
interface IDataCardRowFormProps {
  type: DataCardFormTypes
  name: string
  isEdit: boolean
  placeholder?: string
  label?: string
  options?: IOption[]
  selectValue?: (value: number) => string
  disabled?: boolean
  jobId: number
  activityId: number
  viewMode: viewModes
}

export const parseRRule = (ruleString: string): RRule => {
  const pattern = 'DTSTART'

  const endPattern = 'EXDATE'

  const firstChar = ruleString.indexOf(pattern)
  const lastChar = ruleString.indexOf(endPattern)

  const getFormattedString = () => {
    if (firstChar >= 0 && lastChar >= 0)
      return ruleString.substring(firstChar, lastChar)
    else if (firstChar >= 0) return ruleString.slice(firstChar)
    else return ruleString
  }
  const formattedString = getFormattedString()
  return RRule.fromString(formattedString)
}
export const getRRuleSentence = (rule: RRule | undefined) => {
  if (!rule) return t('Does not repeat')
  return `${rule?.toText()?.charAt(0).toUpperCase()}${rule
    ?.toText()
    ?.slice(1)}.`
    ?.split(' ')
    ?.map((el) => t(el))
    ?.join(' ')
}
const DataCardRowForm = (props: IDataCardRowFormProps) => {
  const {
    type,
    name,
    isEdit,
    options,
    label,
    placeholder,
    selectValue,
    disabled,
    jobId,
    activityId,
    viewMode,
  } = props
  const user = useUserSettings()
  const themeContext = useContext(ThemeContext)
  const [field, meta] = useField(name)
  const [endTime] = useField('endTime')

  const [cityField, cityMeta] = useField('city')
  const [zipField, zipMeta] = useField('zipCode')

  const formik = useFormikContext()
  interface IValues {
    address1: string
    address2: string
    city: string
    state: number
    zipCode: string
    country: number
    serviceType: number
    serviceSubType: number
    repeats: number
    isNewLocation: boolean
    pocEmail: string
    locationVideoServiceType: number | null
  }
  const values = formik.values as IValues
  const stateOptions = useStates()
  const countryOptions = useCountries()
  const contactList = useCompanyContacts(user?.data?.companyID || -1)
  const { data } = useCompanyLocations(user?.data?.companyID || -1)
  const companyLocationsOptions = data?.map((el: ICompanyLocation) => ({
    value: el.id,
    text: `${el.street1}, ${el.city}, ${el.state}, ${el.postalCode} ${el.country}`,
  }))

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

  const handleLocationSelected = (id: number) => {
    const location = data?.find((location) => location.id === id)
    if (location) {
      setLocationId(location.id)
      setAddress1(location.street1)
      setAddress2(location.street2 || '')
      setCity(location.city)
      const stateId = stateOptions.data?.find(
        (stateObj: IOption) =>
          stateObj.code === location.state || stateObj.text === location.state,
      )?.value
      setState(stateId)
      setZip(location.postalCode)
      const countryId = countryOptions.data?.find(
        (countryObj: IOption) => countryObj.text === 'USA',
      )?.value
      setCountry(countryId)
      setLat(location?.latitude)
      setLong(location?.longitude)
    }
  }
  const handleClear = () => {
    formik.setFieldValue('pocEmail', '')
    formik.setFieldValue('pocFullName', '')
    formik.setFieldValue('pocPrefName', '')
    formik.setFieldValue('pocPhone', '')
  }
  const handleEmailSelected = (name: Label) => {
    const selected = contactList?.data?.find(
      (contact) => contact.email === name.label,
    )
    if (selected) {
      formik.setFieldValue('pocEmail', selected.email)
      formik.setFieldValue('pocFullName', selected.fullName)
      formik.setFieldValue('pocPrefName', selected.preferredName)
      formik.setFieldValue('pocPhone', selected.phoneNumber)
    }
  }

  const getFormattedAddress = () => {
    const address = `${values?.address1 || ''} ${values?.address2 || ''} ${
      values?.city
    }, ${stateOptions?.data?.find((el) => el.value === values.state)?.text} ${
      countryOptions?.data?.find((el) => el.value === values.country)?.text
    }`
    return address
  }

  const serviceSubTypes = useServiceSubTypes(values?.serviceType || -1)
  const renderValue = (
    value:
      | string
      | Date
      | string[]
      | Dayjs
      | boolean
      | number
      | ContactInfo[]
      | IJobExtendedData[]
      | IUploadedFile[],
  ) => {
    if (typeof value === 'string') {
      if (field.name === 'repeats') {
        return <span>{getRRuleSentence(meta.value)}</span>
      }
      if (
        field.name === 'address2' ||
        field.name === 'city' ||
        field.name === 'state' ||
        field.name === 'zipCode'
      ) {
        return <></>
      }
      if (field.name === 'address1') return getFormattedAddress()
      //this is where we need to render the address for the
      else return <span>{meta.value}</span>
    } else if (value instanceof Date) {
      return (
        <>
          {meta.value.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </>
      )
    } else if (typeof value === 'boolean') {
      if (field.name === 'isNewLocation') {
        return undefined
      }
      return <span>{!meta.value ? 'No' : 'Yes'}</span>
    } else if (typeof value === 'number') {
      if (
        (field.name === 'state' && values.locationVideoServiceType === null) ||
        field.name === 'country' ||
        field.name === 'locationId'
      ) {
        return undefined
      }
      return <span>{selectValue ? t(selectValue(value)) : ''}</span>
    }
    if (dayjs.isDayjs(value)) {
      if (type === 'dayjs') {
        const transMonth = t(meta.value.format('MMMM'))
        const rest = meta.value.format('DD, YYYY')
        return <>{`${transMonth} ${rest}`}</>
      } else if (type === 'time' && props.name === 'startTime') {
        return (
          <>{`${meta.value.format('hh:mm A')} - ${endTime.value.format(
            'hh:mm A',
          )}`}</>
        )
      }
    } else if (type === 'inputList' && typeof value === 'object') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {value?.map((val, i) => {
            if (typeof val === 'string') {
              return <span key={i}>{val}</span>
            } else {
              return <span key={i}>{(val as ContactInfo)?.fullName}</span>
            }
          })}
        </div>
      )
    } else if (type === 'attendeeList') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(value as ContactInfo[])?.map((val, i) => {
            return (
              <VerticalGroup key={i}>
                <span>{val?.fullName}</span>
                <span>{val?.email}</span>
                <span>{val?.phone}</span>
              </VerticalGroup>
            )
          })}
        </div>
      )
    } else if (type === 'dynamicFields') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {(value as IJobExtendedData[])
            ?.sort((a, b) => {
              return a.field.fieldType.name === 'TextBox' ? -1 : 1
            })
            .map((field, i) => {
              if (field?.field?.fieldType?.name === 'TextBox') {
                return <span key={i}>{field.extendedDataFieldValue}</span>
              } else if (field?.field?.fieldType?.name === 'CheckBox') {
                if (!meta?.value[i]?.extendedDataFieldValue) {
                  return <span key={i}>{field.extendedDataFieldValue}</span>
                }
                return (
                  <span key={i}>
                    {meta?.value[i]?.extendedDataFieldValue === 'True' ||
                    meta?.value[i]?.extendedDataFieldValue === 'true'
                      ? 'Yes'
                      : 'No'}
                  </span>
                )
              }
            })}
        </div>
      )
    } else if (type === 'file') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {(value as IUploadedFile[])
            ?.sort((a, b) => {
              return a.owner === 'JOB' ? -1 : 1
            })
            .map((field, i) => {
              return <FileWithDownload file={field} key={field.id} />
            })}
          {value.length === 0 && <span>{t('No files for job')}</span>}
        </div>
      )
    } else {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {value?.map((val, i) => {
            if (typeof val === 'string')
              return (
                <span
                  key={i}
                  style={{ fontSize: '16px', marginBottom: '12px' }}
                >
                  {val}
                </span>
              )
          })}
        </div>
      )
    }
  }

  if (isEdit)
    return (
      <div>
        {type === 'text' && (
          <VerticalGroup>
            <StyledLabel>{label}</StyledLabel>
            <StyledInput
              padding="4px 12px"
              width="274px"
              height="26px"
              backgroundColor="white"
              borderColor="#d9d9d9"
              fontSize="16px"
              ThemeContext={themeContext}
              disabled={disabled}
              error={
                name === 'city' || name === 'zipCode'
                  ? false
                  : meta.error
                  ? true
                  : false
              }
              {...field}
              {...props}
            />
            {meta.touched && meta.error ? (
              <div style={{ color: '#BA1A1A', paddingTop: '6px' }}>
                {meta.error}
              </div>
            ) : null}
          </VerticalGroup>
        )}
        {type === 'select' && (
          <VerticalGroup>
            <StyledLabel>{label}</StyledLabel>
            <BasicSelect
              backgroundColor="white"
              width="300px"
              height="40px"
              error={meta.error ? true : false}
              {...field}
              {...props}
              options={
                field.name === 'serviceSubType'
                  ? serviceSubTypes?.data || []
                  : field.name === 'interval'
                  ? getIntervalOptions(values?.repeats) || []
                  : props.options || []
              }
            />
          </VerticalGroup>
        )}
        {type === 'dayjs' && (
          <DatePickerInput width="274px" height="26px" {...props} />
        )}
        {type === 'time' && props.name === 'startTime' && (
          <div>
            <div
              style={{
                width: '300px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <VerticalGroup>
                <StyledLabel>{t('Start time')}</StyledLabel>
                <FormikTimePicker width="100px" height="26px" {...props} />
              </VerticalGroup>
              <div
                style={{
                  paddingTop: '16px',
                }}
              >
                to
              </div>
              <VerticalGroup>
                <StyledLabel>{t('End time')}</StyledLabel>
                <FormikTimePicker width="100px" height="26px" name="endTime" />
              </VerticalGroup>
            </div>{' '}
            <div style={{ color: '#BA1A1A', paddingTop: '6px' }}>
              {meta.error}
            </div>
          </div>
        )}
        {type === 'autocomplete' && (
          <div
            style={{
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <StyledLabel>{label}</StyledLabel>
            <AutocompleteInput disabled={!values.isNewLocation} />
            {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
            {zipMeta.error && <ErrorMessege>{zipMeta.error}</ErrorMessege>}
            {cityMeta.error && <ErrorMessege>{cityMeta.error}</ErrorMessege>}
          </div>
        )}
        {type === 'inputList' && (
          <AutocompleteInputList
            value={field.value}
            formField={'serviceFor'}
            width={'300px'}
          />
        )}{' '}
        {type === 'attendeeList' && (
          <AutocompleteInputList
            value={field.value}
            formField={'attendees'}
            width={'300px'}
          />
        )}{' '}
        {type === 'dynamicFields' && (
          <DynamicInputList
            value={field.value}
            formField={'jobExtendedData'}
            width={'300px'}
          />
        )}{' '}
        {type === 'inputListProviders' && (
          <InputList formField="providers" value={field.value} />
        )}
        {type === 'dayOfWeek' && <Occurrence {...props} width={'300px'} />}
        {type === 'yesNo' && (
          <div
            style={{
              maxWidth: '300px',
            }}
          >
            <YesNoField
              {...field}
              {...props}
              error={meta.error}
              width={'300px'}
            />
          </div>
        )}
        {type === 'textarea' && (
          <div
            style={{
              maxWidth: '300px',
            }}
          >
            <StyledTextarea
              ThemeContext={themeContext}
              rows={5}
              fontSize={'16px'}
              error={meta.error ? true : false}
              width="278px"
              {...field}
              {...props}
            />
            {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
          </div>
        )}
        {type === 'checkbox' && (
          <Checkbox2 name={field.name} label={'Add new location'} />
        )}
        {type === 'locationSelect' && (
          <LocationSelect
            {...field}
            {...props}
            backgroundColor="white"
            width="326px"
            //width="450px"
            height="42px"
            error={meta.error ? true : false}
            options={options || []}
            disabled={values.isNewLocation}
          />
        )}
        {type === 'locationAutocomplete' && (
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
            handleClear={() => {}}
            initialValue={field.value}
            disabled={values.isNewLocation}
            required={false}
            label={'Location'}
            width={'300px'}
          />
        )}
        {type === 'file' && (
          <UploadedFiles
            isSeriesEdit={
              viewMode === 'series' || viewMode === 'single' ? true : false
            }
            value={field.value}
            jobId={jobId}
            activityId={activityId}
          />
        )}
        {type === 'contactEmail' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <POCEmailAutocompleteInput
              onInputChange={(change: string) => {
                formik.setFieldValue('pocEmail', change)
              }}
              width="300px"
              contactOptions={
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
              }
              onChange={handleEmailSelected}
              handleClear={handleClear}
              initialValue={values.pocEmail ? values.pocEmail : ''}
            />
            {meta.error && <ErrorMessege>{meta.error}</ErrorMessege>}
          </div>
        )}{' '}
      </div>
    )
  else {
    if (renderValue(meta.value) === undefined) {
      return <div style={{ display: 'none' }}></div>
    }
    return (
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.84)',
          fontWeight: 600,
          width: '300px',
        }}
      >
        {renderValue(meta.value)}
      </div>
    )
  }
}

export default DataCardRowForm
