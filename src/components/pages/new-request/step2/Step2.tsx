import React, { useEffect } from 'react'
import Divider from '@mui/material/Divider/Divider'
import { Formik, FormikHelpers } from 'formik'
import { useContext, useMemo, useState } from 'react'
import { NewRequestStepsContext } from 'context/newRequestSteps'
import { Step2FormInputs, useStep2Form } from '../hooks/use-step2-form.hook'
import { NewRequestStepsVariablesActionType } from 'context/newRequestReducer'
import {
  RightSideButtonContainer,
  StyledButtonsContainer,
  StyledRequired,
} from '../step1/step1.styled'
import {
  StyledDescription,
  StyledLabel,
} from '../../user-settings/userSettings.styled'
import Checkbox from 'shared/checkbox/Checkbox'
import FormInputRow from 'shared/input/FormInputRow'
import Button from 'shared/button'
import { useLanguages } from 'hooks/dropdowns/useLanguages'
import { useVideoServices } from 'hooks/dropdowns/useVideoServices'
import { useStates } from 'hooks/dropdowns/useStates'
import { useTranslation } from 'react-i18next'
import ConfirmClearModal from '../ConfirmClearModal'
import { useCountries } from 'hooks/dropdowns/useCountries'
import {
  ICompanyLocation,
  useCompanyLocations,
} from 'hooks/dropdowns/useCompanyLocations'
import { useUserSettings } from 'hooks/user/useUserSettings'

function Step2() {
  const { t } = useTranslation()
  const userSettings = useUserSettings()
  const { setCurrentStep, dispatch, variables } = useContext(
    NewRequestStepsContext,
  )

  const { remoteValidationSchema, onsiteValidationSchema, defaultValues } =
    useStep2Form(variables)

  const [isChecked, setIsChecked] = useState(defaultValues?.cleanTranscript)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const langOptions = useLanguages()

  const { data } = useCompanyLocations(userSettings?.data?.companyID || -1)
  const companyLocationsOptions = data?.map((el: ICompanyLocation) => ({
    value: el.id,
    text: `${el.street1}, ${el.city}, ${el.state}, ${el.postalCode} ${el.country}`,
  }))
  const videoServiceOptions = useVideoServices()
  const stateOptions = useStates()
  const countryOptions = useCountries()

  const remoteForms = [
    {
      label: t('Language needed *'),
      helperText: t('We will supply a provider with this skillset'),
      forms: [
        {
          name: 'lang',
          type: 'select',
          placeholder: 'Select',
          options: langOptions?.data ? langOptions?.data : [],
        },
      ],
    },
    {
      label: t('Video Service Meeting Link *'),
      helperText: t('Meeting link information'),
      forms: [
        {
          name: 'videoService',
          type: 'select',
          options: videoServiceOptions?.data ? videoServiceOptions?.data : [],
        },
        {
          name: 'videoServiceLink',
          type: 'text',
          placeholder: t('Meeting Link'),
        },
        {
          name: 'state',
          type: 'select2',
          helperText: t('State'),
          options: stateOptions?.data ? stateOptions?.data : [],
        },
      ],
    },
    {
      label: t('Additional meeting info'),
      helperText: t(
        'Virtual meeting information such as a password or PIN required to enter the meeting',
      ),
      forms: [
        {
          name: 'locationInfo',
          type: 'textarea',
          placeholder: t('Type here...'),
        },
      ],
    },
  ]

  const [lang, videoService, locationInfo, documentation] = remoteForms

  const Step2B = [
    lang,
    videoService,
    locationInfo,
    {
      label: 'Clean transcript needed',
      helperText:
        'Sorenson will provide you with a clean transcript after the request is fulfilled',
      forms: [
        {
          name: 'cleanTranscript',
          type: 'checkbox',
          label: 'Yes, please prove a clean transcript',
        },
      ],
    },
    documentation,
  ]

  const onsiteForms = [
    {
      label: t('Language needed *'),
      helperText: t('We will supply a provider with this skillset'),
      forms: [
        {
          name: 'lang',
          type: 'select',
          placeholder: 'Select',
          options: langOptions?.data ? langOptions?.data : [],
        },
      ],
    },
    {
      label: t('Service location *'),
      helperText: t('Where the provider will travel to and from'),
      forms: [
        {
          name: 'locationId',
          type: 'locationAutocomplete',
          placeholder: 'Select',
          options: companyLocationsOptions ? companyLocationsOptions : [],
          //disabled: disabled,
        },
        {
          name: 'isNewLocation',
          type: 'checkbox2',
          helperText: t('Add new location'),
          label: t('Add new location'),
        },
        {
          name: 'address1',
          type: 'autocomplete',
          helperText: t('Street name, city, state, and postalcode'),
        },
        {
          name: 'address2',
          type: 'text2',
          helperText: t('Address 2'),
        },
        {
          name: 'city',
          type: 'text2',
          helperText: t('City'),
        },
        {
          name: 'state',
          type: 'select2',
          helperText: t('State'),
          options: stateOptions?.data ? stateOptions?.data : [],
        },
        {
          name: 'zipCode',
          type: 'text2',
          helperText: t('Postal Code'),
        },
        {
          name: 'country',
          type: 'select2',
          helperText: t('Country'),
          options: countryOptions?.data ? countryOptions?.data : [],
        },
      ],
    },
    {
      label: t('Additional location info'),
      helperText: t(
        'Information about where to park and/or how to find the location',
      ),
      forms: [
        {
          name: 'locationInfo',
          type: 'textarea',
          placeholder: t('Type here...'),
        },
      ],
    },
  ]

  const IsJobOnsite = (): boolean => {
    switch (variables.jobLocationType) {
      case 'onsite':
        return true
      default:
        return false
    }
  }

  const dynamicInputs = useMemo(() => {
    if (IsJobOnsite()) {
      return onsiteForms
    } else {
      return remoteForms
    }
  }, [
    variables.jobType,
    variables.jobLocationType,
    stateOptions?.data,
    langOptions?.data,
    videoServiceOptions?.data,
    videoServiceOptions?.data,
    data,
    companyLocationsOptions,
  ])

  const dynamicValidation = useMemo(() => {
    switch (variables.jobLocationType) {
      case 'onsite':
        return onsiteValidationSchema
      default:
        return remoteValidationSchema
    }
  }, [variables.jobType, variables.jobLocationType])

  function readStep2FromStorage(): Step2FormInputs {
    const json = localStorage.getItem('step2')
    const details: Step2FormInputs | null = json && JSON.parse(json)
    if (!details) {
    } else {
      return {
        ...details,
      }
    }
    return defaultValues
  }
  function setStep2InStorage(values: Step2FormInputs) {
    window.localStorage.setItem('step2', JSON.stringify({ ...values }))
  }

  return (
    <>
      <Formik
        initialValues={readStep2FromStorage()}
        validationSchema={dynamicValidation}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={(
          values: Step2FormInputs,
          { setSubmitting }: FormikHelpers<any>,
        ) => {
          setTimeout(() => {
            setSubmitting(false)
          }, 100)
          dispatch({
            type: NewRequestStepsVariablesActionType.Step2,
            payload: {
              lang: values.lang,
              videoService: values.videoService,
              videoServiceLink: values.videoServiceLink,
              locationInfo: values.locationInfo,
              document: values.document,
              address1: values.address1,
              address2: values.address2,
              city: values.city,
              country: values.country,
              state: values.state,
              zipCode: values.zipCode,
              cleanTranscript: isChecked,
              lat: values.lat,
              lng: values.lng,
              locationId: values.locationId,
              isNewLocation: values.isNewLocation,
            },
          })
          setStep2InStorage(values)
          setCurrentStep(2)
        }}
      >
        {(props) => {
          function handleClear() {
            window.localStorage.setItem('step2', '')
            props.setValues(defaultValues)
          }

          return (
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <form onSubmit={props.handleSubmit} onChange={() => {}}>
              <div
                style={{
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <div>
                  <StyledRequired>{t('* required')}</StyledRequired>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '50px',
                      width: '100%',
                    }}
                  >
                    {dynamicInputs?.map((group, i) => {
                      return (
                        <FormInputRow
                          group={group}
                          key={i}
                          isOnsite={IsJobOnsite()}
                        />
                      )
                    })}
                  </div>
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
                    }}
                    variant="nobgGreen"
                    size="sm"
                  >
                    {t('Back')}
                  </Button>
                  <Button
                    onClick={() => {
                      props.handleSubmit()
                      const err = Object.keys(props.errors)
                      if (err.length) {
                        const input = document.querySelector(`[name=${err[0]}]`)

                        input?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                          inline: 'start',
                        })
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
                callback={() => handleClear()}
              />
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default Step2
