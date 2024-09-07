import React, { useEffect } from 'react'

import {
  IJobExtendedData,
  useServiceSubTypeFields,
} from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import { CircularProgress } from '@mui/material'
import YesNoField from 'shared/input/YesNoField'
import { ThemeContext } from 'styled-components'
import { StyledInput } from 'shared/input/input.styled'
import {
  StyledDescription,
  StyledLabel,
} from '../../pages/user-settings/userSettings.styled'
import { useTranslation } from 'react-i18next'
import { Formik, useFormikContext } from 'formik'
import { useServiceSubTypes } from 'hooks/dropdowns/useServiceSubTypes'
import YesNoFieldBasic from 'shared/input/YesNoField/YesNoFieldBasic'
import { VerticalGroup } from 'styles/styledComponents/containers'
import { ErrorMessege } from 'shared/input/errorText.styled'

export interface IDynamicFieldsProps {
  serviceSubTypeId: number | null
}

export const DynamicFields: React.FC<IDynamicFieldsProps> = ({
  serviceSubTypeId,
}) => {
  const { values, setFieldValue, initialValues, errors } = useFormikContext<{
    serviceType: number | null
    serviceDescription: number | null
    jobExtendedData: IJobExtendedData[]
  }>()
  const themeContext = React.useContext(ThemeContext)
  const { t } = useTranslation()
  const fieldsToRender = useServiceSubTypeFields(serviceSubTypeId)

  //TODO use the fields to render to create the shape of the job extended data here

  const [dynamicFieldsState, setDynamicFieldsState] = React.useState<
    Omit<IJobExtendedData, 'extendedDataId'>[]
  >(initialValues.jobExtendedData || [])
  //create prev values state , if servivce description is different reset the fields
  const [prevValues, setPrevValues] = React.useState<{
    serviceDescription: number | null
  }>({
    serviceDescription: values.serviceDescription,
  })
  useEffect(() => {
    //check if service description has been changed, if it has, set the dynamic fields to be empty
    if (values.serviceDescription !== prevValues.serviceDescription) {
      setDynamicFieldsState([])
    }
    //set the prev values
    setPrevValues({
      serviceDescription: values.serviceDescription,
    })
  }, [values.serviceDescription])

  React.useEffect(() => {
    const fields = fieldsToRender.data?.map((field) => {
      if (field.field.fieldType.name === 'TextBox') {
        const defaultValue = field?.field?.defaultValue || ''

        const stringVal = defaultValue.toString()
        return {
          ...field,
          extendedDataFieldValue: stringVal || '',
        }
      } else {
        return {
          ...field,
          extendedDataFieldValue: null,
        }
      }
    })
    //Only set the initial values if they are not already set

    //checkif service sub type has been changed
    if (
      !initialValues.jobExtendedData ||
      initialValues.serviceDescription !== serviceSubTypeId
    ) {
      const sortedFields = fields?.sort((a, b) => {
        return a.field.fieldType.name === 'TextBox' ? -1 : 1
      })
      setDynamicFieldsState(sortedFields || [])
    }
    if (initialValues.serviceDescription === serviceSubTypeId) {
      setDynamicFieldsState(initialValues.jobExtendedData)
    }
  }, [fieldsToRender.data])

  const serviceSubTypes = useServiceSubTypes(values.serviceType || -1)
  const serciveDescription = values.serviceDescription

  const serviceDescriptionText = serviceSubTypes.data?.find(
    (el) => el.value === serciveDescription,
  )?.text

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDynamicFieldsState((prevState) => {
      const newState = prevState.map((field) => {
        if (field.jobServiceSubTypeService.name === name) {
          return {
            ...field,
            extendedDataFieldValue: value,
          }
        }
        return field
      })
      return newState
    })
  }

  useEffect(() => {
    setFieldValue('jobExtendedData', dynamicFieldsState)
  }, [dynamicFieldsState])

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {fieldsToRender.isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '326px',
            }}
          >
            <CircularProgress
              size="3.5rem"
              sx={{
                color: '#28BFB2',
              }}
            />
          </div>
        </div>
      )}
      {fieldsToRender.isError && <div>Something went wrong</div>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {fieldsToRender.isSuccess &&
          dynamicFieldsState.map((field, i) => {
            const isFieldRequired = field.isRequired

            const jobExtendedDataErrors: {
              fieldId: number
              message: string
            }[] = errors.jobExtendedData as {
              fieldId: number
              message: string
            }[]

            const fieldError = jobExtendedDataErrors?.find(
              (el: { fieldId: number; message: string }) =>
                el.fieldId === field.jobServiceSubTypeServiceFieldId,
            )

            if (field.field.fieldType.name === 'TextBox') {
              return (
                <div
                  key={field.jobServiceSubTypeServiceFieldId}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    {i === 0 && (
                      <StyledLabel>{`Additional Information for ${serviceDescriptionText}*`}</StyledLabel>
                    )}
                    <StyledDescription>{t(field.label)}</StyledDescription>
                  </div>
                  <div>
                    <VerticalGroup>
                      <StyledInput
                        width="304px"
                        height="26px"
                        backgroundColor="white"
                        borderColor="#d9d9d9"
                        fontSize="16px"
                        ThemeContext={themeContext}
                        placeholder={field.label || ''}
                        error={fieldError ? true : false}
                        required={isFieldRequired}
                        name={field.jobServiceSubTypeService.name}
                        type="text"
                        value={field.extendedDataFieldValue || undefined}
                        onChange={handleInputChange}
                      />
                      {fieldError && (
                        <ErrorMessege>{fieldError.message}</ErrorMessege>
                      )}
                    </VerticalGroup>
                  </div>
                </div>
              )
            } else if (field.field.fieldType.name === 'CheckBox') {
              return (
                <div
                  key={field.jobServiceSubTypeServiceFieldId}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    {' '}
                    {i === 0 && (
                      <StyledLabel>{`Additional Information for ${serviceDescriptionText}*`}</StyledLabel>
                    )}
                    <StyledDescription>{t(field.label)}</StyledDescription>
                  </div>
                  <div>
                    <YesNoFieldBasic
                      value={field.extendedDataFieldValue}
                      onChange={(value: string) => {
                        setDynamicFieldsState((prevState) => {
                          const newState = prevState.map((f) => {
                            if (
                              f.jobServiceSubTypeServiceFieldId ===
                              field.jobServiceSubTypeServiceFieldId
                            ) {
                              return {
                                ...f,
                                extendedDataFieldValue: value,
                              }
                            }
                            return f
                          })
                          return newState
                        })
                      }}
                      key={field.jobServiceSubTypeServiceFieldId}
                    ></YesNoFieldBasic>
                    {fieldError?.message && (
                      <ErrorMessege>{fieldError.message}</ErrorMessege>
                    )}
                  </div>
                </div>
              )
            }
          })}
      </div>
    </div>
  )
}
