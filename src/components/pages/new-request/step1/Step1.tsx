import Divider from '@mui/material/Divider'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import FormInputRow from '../../../shared/input/FormInputRow'
import { Formik, FormikHelpers } from 'formik'
import { useStep1Form } from '../hooks/use-step1-form.hook'

import Providers from './Providers'
import { NewRequestStepsContext } from 'context/newRequestSteps'
import { NewRequestStepsVariablesActionType } from 'context/newRequestReducer'
import {
  RightSideButtonContainer,
  StyledButtonsContainer,
  StyledRequired,
} from './step1.styled'
import {
  StyledDescription,
  StyledLabel,
} from '../../user-settings/userSettings.styled'
import Button from 'shared/button'
import Checkbox from 'shared/checkbox/Checkbox'
import { useNavigate } from 'react-router-dom'
import { useJobTypes } from 'hooks/dropdowns/useJobTypes'
import { useTranslation } from 'react-i18next'
import { Step1FormInputs } from 'hooks/useStepForm'
import ConfirmClearModal from '../ConfirmClearModal'
import FormObserver, { validateExtendedDataFields } from './FormObserver'
import { useJobTypeData } from 'hooks/jobs/useJobTypeData'
import FileInputRow from 'shared/input/FileInputRow'
import NoPermissions from 'shared/permissions/NoPermissions'
import { openSupportForm } from '../../../navbar/index'

export type IFile = {
  lastModified: string
  lastModifiedDate: string
  name: string
  size: number
  type: 'application/pdf' | 'image/png' | 'image/jpeg' | 'image/jpg'
  webkitRelativePath: string
}
function Step1() {
  const { t } = useTranslation()
  const createPocFormData = (isEmailSelected: boolean) => {
    const pocFormData = [
      {
        forms: [
          {
            name: 'pocFullName',
            helperText: t('Full name'),
            type: 'text2',
            placeholder: '',
            readOnly: isEmailSelected,
          },
        ],
      },
      {
        forms: [
          {
            name: 'pocPrefName',
            helperText: t('Preferred name'),
            type: 'text2',
            placeholder: '',
            readOnly: isEmailSelected,
          },
        ],
      },
      {
        forms: [
          {
            name: 'pocEmail',
            helperText: t('Email address'),
            type: 'contactEmail',
            placeholder: t('email@company.com'),
          },
        ],
      },
      {
        forms: [
          {
            name: 'pocPhone',
            helperText: t('Phone number'),
            type: 'text2',
            placeholder: 'XXX-XXX-XXXX',
            readOnly: isEmailSelected,
          },
        ],
      },
    ]
    return pocFormData
  }
  const [pocFormData, setPocFormData] = useState(createPocFormData(false))
  const { setCurrentStep, dispatch, variables } = useContext(
    NewRequestStepsContext,
  )
  const navigate = useNavigate()
  const { step1ValidationSchema, defaultValues } = useStep1Form(variables)

  const [isChecked, setIsChecked] = useState(readStep1FromStorage()?.isActive)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [files, setFiles] = useState<IFile[]>([])

  //this state is used in the Formik component to determine if the form should be validated on change
  //it starts as false, and is set to true when the user clicks the next button, this is so that it will only validate on change after the user has clicked next
  const [shouldValidateOnChange, setShouldValidateOnChange] =
    useState<boolean>(false)

  const jobTypes = useJobTypes()
  const jobTypeData = useJobTypeData()

  if (
    (!jobTypes.data && jobTypes.isFetching) ||
    (!jobTypeData.data && jobTypeData.isFetching)
  ) {
    return <div>{t('Loading your form settings')}</div>
  }

  if (
    //eslint-disable-next-line
    //@ts-ignore
    jobTypes?.error?.response?.status === 403 ||
    //eslint-disable-next-line
    //@ts-ignore
    jobTypeData?.error?.response?.status === 403
  ) {
    return (
      <div
        style={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <NoPermissions />
        <Button
          variant="grey"
          fontSize="16px"
          size="lg"
          overrideWidth="390px"
          overrideHeight="44px"
          onClick={openSupportForm}
        >
          <span>{t('Contact Support')}</span>
        </Button>
      </div>
    )
  }

  const topFormData = [
    {
      label: t('Requested service *'),
      helperText: t('Type of service that you need from Sorenson'),
      forms: [
        {
          name: 'jobType',
          type: 'select',
          placeholder: 'Select',
          options: jobTypes?.data ? jobTypes.data : [],
        },
      ],
    },
    {
      label: t('Name of Event *'),
      helperText: t('Warning: this title will be public to provider pool'),
      forms: [
        {
          name: 'eventName',
          type: 'text',
          placeholder: t('New Event Title'),
        },
      ],
    },
    {
      label: t('Who are the services for?  *'),
      helperText: t(
        'Name of the Deaf or hard-of-hearing individual(s) that you are requesting the services for',
      ),

      forms: [
        {
          name: 'consumers',
          type: 'inputList',
          consumers: defaultValues.consumers,
        },
      ],
    },
  ]

  const middleFormData = [
    {
      label: t('Informed parties'),
      helperText: t(
        'Additional individuals to receive communications and updates on this request',
      ),
      forms: [
        {
          name: 'attendees',
          type: 'inputList',
          label: t('Informed Party'),
          attendees: defaultValues.attendees,
        },
      ],
    },
  ]
  //TODO: REMOvE THE yes/no questions
  const bottomFormData = [
    {
      label: t('Can you tell us more about this request?'),
      helperText: t(
        'Details such as agenda, points of discussion, location details, etc.',
      ),
      forms: [
        {
          name: 'additionalRequestInfo',
          type: 'textarea',
        },
      ],
    },
  ]

  function handleClear(setValues: any) {
    setStep1InStorage(defaultValues)
    setIsChecked(true)
    setValues(defaultValues)
    setFiles([])
  }

  function readStep1FromStorage(): Step1FormInputs {
    const json = localStorage.getItem('step1')
    const details: Step1FormInputs | null = json && JSON.parse(json)
    if (!details) {
    } else {
      return {
        ...details,
      }
    }
    return defaultValues
  }
  function setStep1InStorage(values: Step1FormInputs) {
    try {
      window.localStorage.setItem('step1', JSON.stringify({ ...values }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Formik
        initialValues={readStep1FromStorage()}
        validationSchema={step1ValidationSchema}
        validateOnBlur={false}
        validateOnChange={shouldValidateOnChange}
        validateOnMount={false}
        onSubmit={(
          values: Step1FormInputs,
          helpers: FormikHelpers<Step1FormInputs>,
        ) => {
          const location = jobTypeData.data?.find((el) => {
            return el.id === values.jobType
          })?.value

          const extendedDataErrors = validateExtendedDataFields(
            values.jobExtendedData,
          )
          if (extendedDataErrors.length > 0) {
            //eslint-disable-next-line
            //@ts-ignore
            helpers.setErrors({ jobExtendedData: extendedDataErrors })
            return
          }

          const payload = {
            isActive: isChecked,
            jobType: values.jobType,
            eventName: values.eventName,
            consumers: values.consumers,
            pocFullName: values.pocFullName,
            pocPrefName: values.pocPrefName,
            pocEmail: values.pocEmail,
            pocPhone: values.pocPhone,
            attendees: values.attendees,
            serviceType: values.serviceType,
            serviceDescription: values.serviceDescription,
            prefProviders: values.prefProviders,
            additionalRequestInfo: values.additionalRequestInfo,
            jobLocationType: location ? location : '',
            jobExtendedData: values.jobExtendedData,
            files: values.files,
          }
          dispatch({
            type: NewRequestStepsVariablesActionType.Step1,
            payload: payload,
          })
          setStep1InStorage(payload)
          setCurrentStep(1)
        }}
      >
        {(props) => {
          const handleChange = () => {
            const defaults = readStep1FromStorage()
            props.setValues({
              ...props.values,
              pocEmail: defaults.pocEmail,
              pocPhone: defaults.pocPhone,
              pocFullName: defaults.pocFullName,
              pocPrefName: defaults.pocPrefName,
            })
            setIsChecked(!isChecked)
          }
          return (
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <form onSubmit={props.handleSubmit} onChange={() => {}}>
              <FormObserver />
              <div
                style={{
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <StyledRequired>{t('* required')}</StyledRequired>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '50px',
                    width: '100%',
                  }}
                >
                  {topFormData.map((group, i) => {
                    return <FormInputRow group={group} key={i} />
                  })}
                </div>
              </div>

              <Divider
                style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '50px',
                    width: '100%',
                  }}
                >
                  <div
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
                        width: '300px',
                      }}
                    >
                      <StyledLabel>{t('Point of contact *')}</StyledLabel>
                      <StyledDescription>
                        {t('Who should Sorenson contact')}
                      </StyledDescription>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                      }}
                    >
                      <div
                        style={{
                          width: '326px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
                        <Checkbox
                          checked={isChecked}
                          onChange={handleChange}
                          label={t('I am the point of contact')}
                        />

                        {!isChecked ? (
                          <div
                            style={{
                              flexDirection: 'column',
                              display: 'flex',
                              gap: '16px',
                              margin: '12px 0px',
                            }}
                          >
                            {pocFormData.map((group, i) => {
                              return (
                                <FormInputRow
                                  group={group}
                                  setReadOnly={(value: boolean) => {
                                    setPocFormData(createPocFormData(value))
                                  }}
                                  key={i}
                                />
                              )
                            })}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>

                  {middleFormData.map((group, i) => {
                    return <FormInputRow group={group} key={i} />
                  })}
                  <Providers />
                  {bottomFormData.map((group, i) => {
                    return <FormInputRow group={group} key={i} />
                  })}
                  <FileInputRow files={files} setFiles={setFiles} />
                </div>
              </div>
              <Divider
                style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}
              />

              <StyledButtonsContainer>
                <Button
                  onClick={() => {
                    setIsOpen(true)
                  }}
                  size="sm"
                >
                  {t('Clear')}
                </Button>
                <RightSideButtonContainer>
                  <Button
                    onClick={() => {
                      setCurrentStep(0)
                      navigate('/')
                    }}
                    variant="nobgGreen"
                    size="sm"
                  >
                    {t('Back')}
                  </Button>
                  <Button
                    onClick={() => {
                      setShouldValidateOnChange(true)
                      const err = Object.keys(props.errors)
                      if (err.length) {
                        const input = document.querySelector(`[name=${err[0]}]`)

                        input?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                          inline: 'start',
                        })
                      } else {
                        props.handleSubmit()
                      }
                    }}
                    // disabled={Object.keys(props.errors).length > 0 ? true : false}
                    variant="primary"
                    overrideHover="#00a297"
                    size="sm"
                  >
                    {t('Next')}
                  </Button>
                </RightSideButtonContainer>
              </StyledButtonsContainer>
              <ConfirmClearModal
                open={isOpen}
                setOpen={setIsOpen}
                callback={() => handleClear(props.setValues)}
              />
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default Step1
