import React, { useContext } from 'react'
import { FieldArray, useField } from 'formik'
import { ThemeContext } from 'styled-components'

import styled from 'styled-components'
import { StyledInput } from './input.styled'
import { StatusDiv } from 'shared/status/CustomStatus.styled'
import { StyledLabel } from '../../pages/user-settings/userSettings.styled'
import { useTranslation } from 'react-i18next'
import { ContactInfo } from 'hooks/useStepForm'
import { ErrorMessege } from './errorText.styled'
import { InputListProps } from './AutocompleteInputList'

function ContactInputList(props: InputListProps) {
  const { t } = useTranslation()
  const { value, formField, width } = props
  const [field, meta] = useField(formField)
  const themeContext = useContext(ThemeContext)

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
  document.getElementById(formField)?.setAttribute('name', formField)
  return (
    <FieldArray
      name={`${formField}`}
      render={(arrayHelpers) => (
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
                        meta.error && meta.error[index]?.fullName ? true : false
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
                      height="26px"
                      backgroundColor="white"
                      borderColor="#d9d9d9"
                      fontSize="16px"
                      ThemeContext={themeContext}
                      placeholder={''}
                      error={
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        meta.error && meta.error[index]?.prefName ? true : false
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
                    <StyledInput
                      width="wuto"
                      height="26px"
                      backgroundColor="white"
                      borderColor="#d9d9d9"
                      fontSize="16px"
                      ThemeContext={themeContext}
                      placeholder={t('email@company.com')}
                      error={
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        meta.error && meta.error[index]?.email ? true : false
                      }
                      {...field}
                      name={`${formField}.${index}.email`}
                      value={contact?.email || ''}
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
              <div style={{ justifyContent: 'space-between', display: 'flex' }}>
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
      )}
    />
  )
}

export default ContactInputList
