import React, { useContext } from 'react'
import { FieldArray, useField } from 'formik'
import { ThemeContext } from 'styled-components'

import styled from 'styled-components'
import { StyledInput } from './input.styled'
import { StatusDiv } from 'shared/status/CustomStatus.styled'
import { StyledLabel } from '../../pages/user-settings/userSettings.styled'
import { useTranslation } from 'react-i18next'
import { ErrorMessege } from './errorText.styled'
import {
  DynamicFormTypeOptions,
  IJobExtendedData,
} from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import YesNoField from './YesNoField'
import YesNoFieldDetails from './YesNoField/YesNoFieldDetails'

interface InputListProps {
  value: IJobExtendedData[]
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

function DynamicInputList(props: InputListProps) {
  const { t } = useTranslation()
  const { value, formField, width } = props
  const [field, meta] = useField(formField)
  const themeContext = useContext(ThemeContext)

  return (
    <FieldArray
      name={`${formField}`}
      render={() => (
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
            value?.map((dynamicField: IJobExtendedData, index: number) => {
              if (dynamicField?.field?.fieldType?.name === 'TextBox')
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
                      ></div>
                      <StyledInput
                        width="auto"
                        height="26px"
                        backgroundColor="white"
                        borderColor="#d9d9d9"
                        fontSize="16px"
                        ThemeContext={themeContext}
                        placeholder={''}
                        error={meta.error && meta.error[index] ? true : false}
                        {...field}
                        name={`${formField}.${index}.extendedDataFieldValue`}
                        value={dynamicField?.extendedDataFieldValue || ''}
                      />
                      {/*  {meta?.error && (
                      <ErrorMessege>
                        {meta?.error && meta?.error[index]
                          ? typeof meta.error[index] === 'object' &&
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            meta?.error[index].extendedDataFieldValue
                            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              meta.error[index].extendedDataFieldValue
                            : ''
                          : ''}
                      </ErrorMessege>
                    )} */}
                    </div>
                  </div>
                )
              if (dynamicField.field.fieldType.name === 'CheckBox')
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
                      ></div>
                      <div
                        style={{
                          maxWidth: '300px',
                        }}
                      >
                        <YesNoFieldDetails
                          {...field}
                          {...props}
                          error={meta.error && meta.error[index] ? true : false}
                          width={'300px'}
                          name={`${formField}.${index}.extendedDataFieldValue`}
                          value={dynamicField?.extendedDataFieldValue}
                        />
                        {meta.error && meta.error[index] && (
                            <ErrorMessege>
                              {t('Selection required')}
                            </ErrorMessege>
                        )}
                      </div>
                    </div>
                  </div>
                )
            })
          ) : (
            <></>
          )}
        </div>
      )}
    />
  )
}

export default DynamicInputList