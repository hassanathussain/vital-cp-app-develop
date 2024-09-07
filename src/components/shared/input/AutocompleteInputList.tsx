import React, { useContext } from 'react'
import { FieldArray, useField } from 'formik'
import { ThemeContext } from 'styled-components'

import styled from 'styled-components'
import { StyledInput } from './input.styled'
import { StatusDiv } from 'shared/status/CustomStatus.styled'
import { StyledLabel } from '../../pages/user-settings/userSettings.styled'
import { useTranslation } from 'react-i18next'
import { ContactInfo, Step1FormInputs } from 'hooks/useStepForm'
import { ErrorMessege } from './errorText.styled'
import { useUserSettings } from 'hooks/user/useUserSettings'
import { Contact, useCompanyContacts } from 'hooks/contacts/useCompanyContacts'
import { useFormikContext } from 'formik'
import { Autocomplete, TextField, Tooltip } from '@mui/material'

export interface Label {
  label: string
  id: number
  tooltip?: string
}

export const EmailAutocompleteInput = ({
  contactOptions,
  index,
  formGroupName,
  onChange,
  initialValue,
  handleClear,
  onInputChange,
}: {
  contactOptions: Label[]
  index: number
  formGroupName: string
  onChange: (name: string) => void
  initialValue: string
  handleClear: () => void
  onInputChange: (input: string) => void
}) => {
  const { values } = useFormikContext<Step1FormInputs>()
  return (
    <Autocomplete
      id={`${formGroupName}.${index}.email`}
      options={contactOptions}
      freeSolo
      value={
        contactOptions?.find((option) => option.label === initialValue)
          ? contactOptions?.find((option) => option.label === initialValue)
          : {
              label: initialValue,
              id: -1,
            }
      }
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
      onChange={(event, newValue) => {
        if (newValue === null) {
          handleClear()
        }
        if (newValue) {
          onChange(newValue as string)
        }
      }}
      onInputChange={(event, value) => {
        onInputChange(value)
      }}
      renderInput={(params) => <TextField {...params} />}
      renderOption={(props, option) => {
        // eslint-disable-next-line
        // @ts-ignore
        const shouldDisable = values[formGroupName].find(
          (el: any, i: number) => el.email === option.label && i !== index,
        )
        return (
          <div key={option.id}>
            {shouldDisable ? (
              <></>
            ) : (
              <Tooltip title={option.tooltip || ''} arrow>
                <li {...props}>{option.label}</li>
              </Tooltip>
            )}
          </div>
        )
      }}
    />
  )
}
export const POCEmailAutocompleteInput = ({
  contactOptions,
  onChange,
  initialValue,
  handleClear,
  onInputChange,
  width,
}: {
  contactOptions: Label[]

  onChange: (name: Label) => void
  initialValue: string
  handleClear: () => void
  onInputChange: (input: string) => void
  width?: string
}) => {
  return (
    <Autocomplete
      id={`pocEmail`}
      options={contactOptions}
      freeSolo
      onInputChange={(e, value) => {
        onInputChange(value)
      }}
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          padding: '2px 10px',
          borderRadius: '8px',
          background: 'white',
          cursor: 'pointer',
          caretColor: '#28BFB2',
          fontSize: '16px',
          width: width,
        },
        padding: '0px',
      }}
      onChange={(event, newValue) => {
        if (newValue === null) {
          handleClear()
        }
        if (newValue) {
          onChange(newValue as Label)
        }
      }}
      value={
        contactOptions?.find((option) => option.label === initialValue)
          ? contactOptions.find((option) => option.label === initialValue)
          : {
              label: initialValue,
              id: -1,
            }
      }
      renderInput={(params) => <TextField {...params} />}
      renderOption={(props, option) => {
        return (
          <Tooltip key={option.id} title={option.tooltip || ''} arrow>
            <li {...props}>{option.label}</li>
          </Tooltip>
        )
      }}
    />
  )
}

export const LocationAutocompleteInput = ({
  locationOptions,
  onChange,
  initialValue,
  handleClear,
  disabled,
  required,
  label,
  width,
}: {
  locationOptions: Label[]
  onChange: (id: number) => void
  initialValue: number | null
  handleClear: () => void
  disabled: boolean
  required?: boolean
  label: string
  width?: string
}) => {
  const { t } = useTranslation()
  const defaultVal = locationOptions?.find(
    (option) => option.id === initialValue,
  )

  return (
    <Autocomplete
      id={`location`}
      options={locationOptions}
      autoComplete
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          padding: '2px 10px',
          borderRadius: '8px',
          background: 'white',
          cursor: 'pointer',
          caretColor: '#28BFB2',
          fontSize: '16px',
          width: width,
        },
        padding: '0px',
      }}
      onChange={(event, newValue) => {
        if (newValue === null) {
          handleClear()
        }
        if (newValue?.id) {
          onChange(newValue?.id)
        }
      }}
      disabled={disabled}
      includeInputInList
      selectOnFocus
      filterSelectedOptions
      value={defaultVal}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={
              required ? (
                initialValue == null ? (
                  <span
                    style={{
                      color: '#E63E51',
                    }}
                  >
                    {t(label)} *
                  </span>
                ) : (
                  <span
                    style={{
                      color: '#3DCDC2',
                    }}
                  >
                    {t(label)} *
                  </span>
                )
              ) : (
                label
              )
            }
            fullWidth
          />
        )
      }}
      renderOption={(props, option) => {
        return (
          <Tooltip key={option.id} title={option.tooltip || ''} arrow>
            <li
              style={{
                display: 'flex',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              {...props}
            >
              {option.label}
            </li>
          </Tooltip>
        )
      }}
    />
  )
}
export interface InputListProps {
  value: ContactInfo[]
  formField: string
  width?: string
}

export const ListInput = styled.input<{
  width?: string
  height?: string
  backgroundColor?: string
  focusedBorderColor?: string
  fontSize?: string
  error?: boolean
}>`
  color: '#8d8d8d',
  cursor: pointer;
  font-family: 'Inter';
  border: hidden;
  outline: hidden;
  caret-color: 'black';
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'auto')};

  :focus-visible {
    outline-width: 0px;
    border: hidden;
  }
`

function AutocompleteInputList(props: InputListProps) {
  const { t } = useTranslation()
  const { value, formField, width } = props
  const [field, meta] = useField(formField)
  const [isFieldDisabled, setIsFieldDisabled] = React.useState(
    Array(10).fill(false),
  )
  const contactType =
    formField === 'consumers' || formField === 'serviceFor'
      ? 'Consumer'
      : formField === 'attendees'
      ? 'Attendee'
      : ''
  const themeContext = useContext(ThemeContext)
  const user = useUserSettings()
  const contactList = useCompanyContacts(user?.data?.companyID || -1)
  const contactOptions =
    contactList?.data
      ?.filter((el) => {
        return el.contactType === contactType
      })
      ?.map((contact: Contact) => {
        return {
          label: contact.email,
          tooltip: contact.fullName,
          id: contact.id,
        }
      }) || []
  const formik = useFormikContext()

  const getlabel = () => {
    switch (formField) {
      case 'attendees':
        return t('Add Informed Party')
      case 'prefProviders':
        return t('Add Interpreter')
      case 'consumers':
        return t('Add Consumer')
      case 'serviceFor':
        return t('Add Consumer')
      default:
        'Add'
    }
  }

  const isStringIsInContactOptions = (input: string) => {
    //if the contact is in the contact list we need to set the fields and disable the inputs
    return contactOptions.some((c) => c.label === input)
  }

  document.getElementById(formField)?.setAttribute('name', formField)
  return (
    <FieldArray
      name={`${formField}`}
      render={(arrayHelpers) => {
        return (
          <div
            id={formField}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            {value?.length > 0 ? (
              value?.map((contact: ContactInfo, index: number) => {
                const setFieldsFromStringEmail = (email: string) => {
                  const contact = contactList?.data?.find((el) => {
                    return el.email === email
                  })
                  if (contact) {
                    const newContact = {
                      id: contact.id,
                      fullName: contact.fullName,
                      email: contact.email,
                      phone: contact.phoneNumber,
                      prefName: contact.preferredName,
                    }
                    setIsFieldDisabled(
                      isFieldDisabled.map((el, i) => {
                        if (i === index) {
                          return true
                        }
                        return el
                      }),
                    )
                    formik.setFieldValue(
                      `${formField}.${index}.email`,
                      newContact.email,
                    )
                    formik.setFieldValue(
                      `${formField}.${index}.fullName`,
                      newContact.fullName,
                    )
                    formik.setFieldValue(
                      `${formField}.${index}.phone`,
                      newContact.phone,
                    )
                    formik.setFieldValue(
                      `${formField}.${index}.prefName`,
                      newContact.prefName,
                    )
                  }
                }
                const handleEmailSelected = (input: any) => {
                  if (input) {
                    setFieldsFromStringEmail(input.label)
                  }
                  return
                }
                const handleEmailInput = (input: string) => {
                  formik.setFieldValue(`${formField}.${index}.email`, input)
                  const isInputAnExistingContact =
                    isStringIsInContactOptions(input)

                  setIsFieldDisabled(
                    isFieldDisabled.map((el, i) => {
                      if (i === index) {
                        return isInputAnExistingContact
                      }
                      return el
                    }),
                  )

                  if (isInputAnExistingContact) {
                    setFieldsFromStringEmail(input)
                  }
                }
                const handleClear = () => {
                  setIsFieldDisabled(
                    isFieldDisabled.map((el, i) => {
                      if (i === index) {
                        return false
                      }
                      return el
                    }),
                  )
                  formik.setFieldValue(`${formField}.${index}.email`, '')
                  formik.setFieldValue(`${formField}.${index}.fullName`, '')
                  formik.setFieldValue(`${formField}.${index}.phone`, '')
                  formik.setFieldValue(`${formField}.${index}.prefName`, '')
                }

                return (
                  <div
                    key={index}
                    style={{
                      margin: '12px 0px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: width || '326px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <StyledLabel>{t('Full name')}</StyledLabel>
                        {(index > 0 || formField === 'attendees') && (
                          <div
                            style={{
                              fontSize: '12px',
                              width: '47px',
                              height: '18px',
                              cursor: 'pointer',
                              color: '#BA1A1A',
                              marginLeft: '8px',
                            }}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            {t('Remove')}
                          </div>
                        )}
                      </div>
                      <StyledInput
                        disabled={isFieldDisabled[index]}
                        width="auto"
                        height="26px"
                        backgroundColor="white"
                        borderColor="#d9d9d9"
                        fontSize="16px"
                        ThemeContext={themeContext}
                        placeholder={''}
                        error={
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          meta.error && meta.error[index]?.fullName
                            ? true
                            : false
                        }
                        {...field}
                        name={`${formField}.${index}.fullName`}
                        value={contact?.fullName}
                      />
                      {meta?.error && (
                        <ErrorMessege>
                          {meta?.error && meta?.error[index]
                            ? typeof meta.error[index] === 'object' &&
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              meta?.error[index].fullName
                              ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                meta.error[index].fullName
                              : ''
                            : ''}
                        </ErrorMessege>
                      )}
                    </div>

                    <div
                      style={{
                        width: width || '326px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <StyledLabel>{t('Preferred name')}</StyledLabel>
                      <StyledInput
                        width="auto"
                        disabled={isFieldDisabled[index]}
                        height="26px"
                        backgroundColor="white"
                        borderColor="#d9d9d9"
                        fontSize="16px"
                        ThemeContext={themeContext}
                        placeholder={''}
                        error={
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          meta.error && meta.error[index]?.prefName
                            ? true
                            : false
                        }
                        {...field}
                        name={`${formField}.${index}.prefName`}
                        value={contact?.prefName || ''}
                      />
                    </div>

                    <div
                      style={{
                        width: width || '326px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <StyledLabel>{t('Email address')}</StyledLabel>
                      <EmailAutocompleteInput
                        handleClear={handleClear}
                        contactOptions={contactOptions || []}
                        onChange={handleEmailSelected}
                        onInputChange={handleEmailInput}
                        formGroupName={formField}
                        index={index}
                        initialValue={
                          formik.values &&
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          formik?.values[formField][index].email
                            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              formik?.values[formField][index].email
                            : ''
                        }
                      />
                      {meta?.error && (
                        <ErrorMessege>
                          {meta?.error && meta?.error[index]
                            ? typeof meta.error[index] === 'object' &&
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              meta?.error[index].email
                              ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                meta.error[index].email
                              : ''
                            : ''}
                        </ErrorMessege>
                      )}
                    </div>

                    <div
                      style={{
                        width: width || '326px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <StyledLabel>{t('Phone number')}</StyledLabel>
                      <StyledInput
                        width="auto"
                        height="26px"
                        backgroundColor="white"
                        disabled={isFieldDisabled[index]}
                        borderColor="#d9d9d9"
                        fontSize="16px"
                        ThemeContext={themeContext}
                        placeholder={'XXX-XXX-XXXX'}
                        error={
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          meta.error && meta.error[index]?.phone ? true : false
                        }
                        {...field}
                        name={`${formField}.${index}.phone`}
                        value={contact?.phone || ''}
                      />
                    </div>
                    {meta?.error && (
                      <ErrorMessege>
                        {meta?.error && meta?.error[index]
                          ? typeof meta.error[index] === 'object' &&
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            meta?.error[index]?.phone
                            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              meta.error[index]?.phone
                            : ''
                          : ''}
                      </ErrorMessege>
                    )}
                  </div>
                )
              })
            ) : (
              <></>
            )}
            <StatusDiv backgroundColor={'none'} color={'#585858'}>
              <div
                onClick={() =>
                  arrayHelpers.push({
                    fullName: '',
                    prefName: '',
                    email: '',
                    phone: '',
                  })
                }
              >
                <div
                  style={{ justifyContent: 'space-between', display: 'flex' }}
                >
                  <div
                    style={{
                      alignContent: 'center',
                      display: 'flex',
                      flexWrap: 'wrap',
                      paddingRight: '5px',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0.666667 8C0.666667 3.94991 3.94991 0.666667 8 0.666667C12.0501 0.666667 15.3333 3.94991 15.3333 8C15.3333 12.0501 12.0501 15.3333 8 15.3333C3.94991 15.3333 0.666667 12.0501 0.666667 8ZM8 4.66667C8.36819 4.66667 8.66667 4.96514 8.66667 5.33333V7.33333H10.6667C11.0349 7.33333 11.3333 7.63181 11.3333 8C11.3333 8.36819 11.0349 8.66667 10.6667 8.66667H8.66667V10.6667C8.66667 11.0349 8.36819 11.3333 8 11.3333C7.63181 11.3333 7.33333 11.0349 7.33333 10.6667V8.66667H5.33333C4.96514 8.66667 4.66667 8.36819 4.66667 8C4.66667 7.63181 4.96514 7.33333 5.33333 7.33333H7.33333V5.33333C7.33333 4.96514 7.63181 4.66667 8 4.66667Z"
                        fill="black"
                        fillOpacity="0.6"
                      />
                    </svg>
                  </div>

                  <div>{getlabel()}</div>
                </div>
              </div>
            </StatusDiv>
          </div>
        )
      }}
    />
  )
}

export default AutocompleteInputList
