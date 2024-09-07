import { useField, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { ThemeContext } from 'styled-components'

import AvatarInput from '../AvatarInput'
import BasicSelect from '../../select/BasicSelect'
import ContactInputList from '../ContactInputList'

import { StyledInput } from '../input.styled'

import Checkbox from '../../checkbox/Checkbox'
import { StyledTextarea } from '../textarea.styled'
import BasicTimePicker from '../../timePicker/BasicTimePicker'
import { VerticalGroup } from '../../../../styles/styledComponents/containers'
import { FormRowsContainer } from './inputRow.styles'

import { AttendeeInfo, ContactInfo } from 'hooks/useStepForm'
import Button from 'shared/button'
import { DatePickerInput } from 'shared/date-picker/DatePickerInput'
import {
  StyledDescription,
  StyledLabel,
} from 'src/components/pages/user-settings/userSettings.styled'
import AttendeeInputList from '../AttendeeInputList'

function FormInputRow(props: any) {
  const themeContext = React.useContext(ThemeContext)

  const { group } = props
  const { values } = useFormikContext<{
    attendees: AttendeeInfo[]
    prefProviders: ContactInfo[]
    consumers: ContactInfo[]
    isActive: boolean
    onChange: (event: any) => void
  }>()

  return (
    <FormRowsContainer>
      <VerticalGroup style={{ width: '300px' }}>
        <StyledLabel>{group.label}</StyledLabel>
        <StyledDescription>{group.helperText}</StyledDescription>
      </VerticalGroup>
      <VerticalGroup gap="28px">
        {group?.forms?.map((form: any, i: number) => {
          const [field, meta] = useField(form)

          return (
            <div key={i}>
              {form.type === 'text' && (
                <div>
                  <StyledInput
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
                </div>
              )}
              {form.type === 'select' && (
                <BasicSelect
                  backgroundColor="white"
                  width="300px"
                  height="26px"
                  error={meta.error ? true : false}
                  placeholder={form?.placeholder || ''}
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
              {form.type === 'select2' && (
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
                    width="300px"
                    height="26px"
                    placeholder={form?.placeholder || ''}
                    {...form}
                  />
                </div>
              )}
              {form.type === 'text2' && (
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
                </div>
              )}
              {form.type === 'avatarInput' && (
                <AvatarInput {...form} initials={form.initials} />
              )}
              {form.type === 'inputList' && form.name === 'consumers' ? (
                <ContactInputList
                  value={values.consumers}
                  formField={'consumers'}
                />
              ) : (
                <></>
              )}
              {form.type === 'inputList' && form.name === 'attendees' ? (
                <AttendeeInputList
                  value={values.attendees}
                  formField={'attendees'}
                />
              ) : (
                <></>
              )}
              {form.type === 'inputList' && form.name === 'prefProviders' ? (
                <ContactInputList
                  value={values.prefProviders}
                  formField={'consumers'}
                />
              ) : (
                <></>
              )}
              {form.type === 'textarea' ? (
                <StyledTextarea
                  ThemeContext={themeContext}
                  rows={5}
                  fontSize={'16px'}
                  width="300px"
                  placeholder={form?.placeholder || 'Type here...'}
                  {...field}
                  {...props}
                />
              ) : (
                <></>
              )}
              {form.type === 'checkbox' ? (
                <Checkbox
                  onChange={form.onChange}
                  checked={form.checked}
                  label={form.label}
                />
              ) : (
                <></>
              )}
              {form.type === 'upload' ? (
                <div style={{ width: '320px' }}>
                  {' '}
                  <Button
                    variant="primary"
                    fontSize="16px"
                    size="xl"
                    width="320px"
                    overrideHover="#00a297"
                    {...field}
                    {...props}
                  >
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.74923 7.14303C6.5632 4.17816 9.2764 2 12.5 2C15.7236 2 18.4368 4.17816 19.2508 7.14303C21.6861 7.70961 23.5 9.8925 23.5 12.5C23.5 14.4079 22.5277 16.0883 21.0563 17.0732C20.5973 17.3804 19.9762 17.2574 19.669 16.7985C19.3618 16.3395 19.4848 15.7184 19.9437 15.4112C20.8842 14.7817 21.5 13.7125 21.5 12.5C21.5 10.6778 20.1067 9.17984 18.328 9.01511C17.875 8.97315 17.5073 8.63059 17.4335 8.18159C17.0436 5.80968 14.9822 4 12.5 4C10.0178 4 7.95643 5.80968 7.5665 8.18159C7.49268 8.63059 7.12505 8.97315 6.67196 9.01511C4.89329 9.17984 3.5 10.6778 3.5 12.5C3.5 13.7125 4.11575 14.7817 5.05626 15.4112C5.51521 15.7184 5.63822 16.3395 5.33101 16.7985C5.0238 17.2574 4.40269 17.3804 3.94374 17.0732C2.47228 16.0883 1.5 14.4079 1.5 12.5C1.5 9.8925 3.3139 7.70961 5.74923 7.14303ZM11.5 14.4142L9.20711 16.7071C8.81658 17.0976 8.18342 17.0976 7.79289 16.7071C7.40237 16.3166 7.40237 15.6834 7.79289 15.2929L11.7929 11.2929C12.1834 10.9024 12.8166 10.9024 13.2071 11.2929L17.2071 15.2929C17.5976 15.6834 17.5976 16.3166 17.2071 16.7071C16.8166 17.0976 16.1834 17.0976 15.7929 16.7071L13.5 14.4142V21C13.5 21.5523 13.0523 22 12.5 22C11.9477 22 11.5 21.5523 11.5 21V14.4142Z"
                        fill="black"
                        fillOpacity="0.87"
                      />
                    </svg>

                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '24px',
                      }}
                    >
                      {form.label}
                    </span>
                  </Button>
                </div>
              ) : (
                <></>
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
                      <BasicTimePicker width="100px" height="26px" {...form} />
                    </VerticalGroup>
                    <VerticalGroup
                      style={{
                        paddingTop: '15px',
                      }}
                    >
                      -
                    </VerticalGroup>
                    <VerticalGroup>
                      <StyledLabel>End Time</StyledLabel>
                      <BasicTimePicker
                        width="100px"
                        height="26px"
                        name="endTime"
                      />
                    </VerticalGroup>
                  </div>
                  <div style={{ color: '#BA1A1A', paddingTop: '6px' }}>
                    {meta.error}
                  </div>
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
