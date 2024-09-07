import Divider from '@mui/material/Divider'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import FormInputRow from '../../../shared/input/FormInputRow'
import { Formik, FormikHelpers } from 'formik'
import { StyledRequired } from './step3.styled'
import RecurringDetailsTextArea from './RecurringDetailsTextArea'
import { useNavigate } from 'react-router-dom'
import { NewRequestStepsContext } from 'context/newRequestSteps'
import { Step3FormInputs, useStep3Form } from '../hooks/use-step3-form.hook'
import Button from 'shared/button'
import { NewRequestStepsVariablesActionType } from 'context/newRequestReducer'
import FormObserver from './FormObserver'
import dayjs, { Dayjs } from 'dayjs'
import { RRule, RRuleSet } from 'rrule'
import {
  RightSideButtonContainer,
  StyledButtonsContainer,
} from '../step1/step1.styled'
import { useAddJob } from 'hooks/jobs/useCreateJob'
import { CircularProgress } from '@mui/material'
import { useUserSettings } from 'hooks/user/useUserSettings'
import { useTimeZoneOptions } from 'hooks/dropdowns/useTimeZones'
import { useTranslation } from 'react-i18next'
import ConfirmClearModal from '../ConfirmClearModal'
import { makeSetFromRRuleAndExclusion } from 'utils/rrule'
import { useJobTypes } from 'hooks/dropdowns/useJobTypes'
import { useCompanyLocations } from 'hooks/dropdowns/useCompanyLocations'

const maxSchedulesShown = 364
function Step3() {
  const { t } = useTranslation()
  const { setCurrentStep, dispatch, variables } = useContext(
    NewRequestStepsContext,
  )

  const navigate = useNavigate()
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const { step3ValidationSchema, defaultValues } = useStep3Form(
    variables,
    endDate,
  )
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)
  const [datesToExclude, setDatesToExclude] = useState<Dayjs[]>([])
  const [userId, setUserId] = useState<number>(0)
  const [companyId, setCompanyId] = useState<number>(0)

  const { data: locationsData } = useCompanyLocations(companyId)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const timeZones = useTimeZoneOptions()
  const user = useUserSettings()
  const jobTypes = useJobTypes()

  const getLocationNameForLocationID = (locationId: number) => {
    return locationsData?.find((el) => el.id === locationId)?.name
  }

  useEffect(() => {
    if (user?.data?.id) setUserId(user.data.id)
    if (user?.data?.companyID) setCompanyId(user.data.companyID)
  }, [user?.data?.id, user?.data?.companyID])

  const FormData = [
    {
      label: t('Timezone *'),
      helperText: t('Timezone where event is taking place'),
      forms: [
        {
          name: 'timezone',
          type: 'select',
          placeholder: 'Select',
          options: timeZones?.data,
        },
      ],
    },
    {
      label: t('When services are needed *'),
      helperText: t('Date and time the service will start and end'),
      forms: [
        {
          name: 'startDate',
          type: 'date',
          helperText: t('Start date of the event'),
        },
        {
          name: 'startTime',
          type: 'time',
          helperText: t('Start time'),
        },
        {
          name: 'endTime',
          type: 'time',
          helperText: t('End Time'),
        },
      ],
    },
    {
      label: t('Recurring Schedule *'),
      helperText: t('The event has 2 or more occurrences'),
      forms: [
        {
          name: 'recurring',
          type: 'select',
          options: [
            { text: t('Does not repeat'), value: 'Does not repeat' },
            { text: t('Daily'), value: 'Daily' },
            { text: t('Weekly'), value: 'Weekly' },
            { text: t('Monthly'), value: 'Monthly' },
            { text: t('Custom'), value: 'Custom' },
          ],
        },
      ],
    },
  ]
  function readStep3FromStorage(): Step3FormInputs {
    const json = localStorage.getItem('step3')
    const details: Step3FormInputs | null = json && JSON.parse(json)
    if (!details) {
    } else {
      return {
        ...details,
        startDate: dayjs(details.startDate),
        startTime: dayjs(details.startTime),
        endTime: dayjs(details.endTime),
        rRule:
          typeof details.rRule === 'string'
            ? RRule.fromString(details.rRule)
            : details.rRule,
      }
    }
    return defaultValues
  }
  function setStep3InStorage(values: Step3FormInputs) {
    window.localStorage.setItem(
      'step3',
      JSON.stringify({ ...values, rRule: values.rRule.toString() }),
    )
    window.localStorage.setItem('recurrenceDetails', '')
  }
  function handleClear(setValues: any) {
    setStep3InStorage(defaultValues)
    setValues(defaultValues)
    setEndDate(null)
  }

  const { mutate, isLoading } = useAddJob()

  return (
    <>
      <Formik
        initialValues={readStep3FromStorage()}
        validationSchema={step3ValidationSchema}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={(
          values: Step3FormInputs,
          { setSubmitting }: FormikHelpers<any>,
        ) => {
          setSubmitting(false)

          dispatch({
            type: NewRequestStepsVariablesActionType.Step3,
            payload: {
              timezone: values.timezone,
              startDate: values.startDate,
              startTime: values.startTime || dayjs(),
              endTime: values.endTime || dayjs(),
              recurring: values.recurring,
              rRule: values.rRule.toString(),
            },
          })

          //thi is how we well create a list of dates to send
          // window.alert(exclusionSet ? exclusionSet.all() : 'no exclusinon')
          const finalRule =
            typeof values.rRule === 'string'
              ? RRule.fromString(values.rRule)
              : values.rRule

          const daysToExclude = datesToExclude.map((date) => ({
            month: date.month() + 1,
            day: date.date(),
            year: date.year(),
          }))
          const exclusionSet = makeSetFromRRuleAndExclusion(
            finalRule,
            datesToExclude,
          )
          const startHour = exclusionSet?.options?.dtstart.getHours() || 12

          const newDateStrings = exclusionSet
            .all((d: Date, len: number) => {
              if (len === maxSchedulesShown) return false
              return true
            })
            .filter((date: Date) => {
              return !daysToExclude.some(
                (day) =>
                  day.month === date.getMonth() + 1 &&
                  day.day === date.getDate() &&
                  day.year === date.getFullYear(),
              )
            })
            .map((date: Date) =>
              dayjs(date.setHours(startHour)).format('MM/DD/YYYY'),
            )
          const getEndDate = (): Dayjs => {
            if (endDate) return endDate

            if (values.endTime?.isBefore(values.startTime, 'minute')) {
              return dayjs(values.startDate)
                .add(1, 'day')
                .hour(values.endTime.hour())
                .minute(values.endTime.minute())
                .second(0)
            } else {
              return dayjs(values.startDate)
                .hour(values?.endTime?.hour() || 0)
                .minute(values?.endTime?.minute() || 0)
                .second(0)
            }
          }
          const isOnsite =
            jobTypes?.data?.find((el) => el.value === variables.jobType)
              ?.code === 'onsite'
          mutate(
            {
              ...variables,
              timezone: values.timezone,
              startTime: values.startTime,
              startDate: values.startDate,
              endDate: getEndDate(),
              endTime: values.endTime,
              recurring: values.recurring,
              rRule:
                values.recurring !== 'Does not repeat'
                  ? exclusionSet.toString()
                  : 'Does not repeat',
              userId: userId,
              companyID: companyId,
              isOnsite: isOnsite,
              locationName: variables.locationId
                ? getLocationNameForLocationID(variables.locationId) || null
                : null,
              dates:
                exclusionSet && values.recurring !== 'Does not repeat'
                  ? newDateStrings
                  : [
                      new Date(
                        values?.startDate
                          ?.hour(values?.startTime?.hour() || 12)
                          ?.minute(values?.startTime?.minute() || 0)
                          ?.format('llll'),
                      ),
                    ],
            },
            {
              onError: () => {
                window.alert('error posting job')
              },
              onSuccess: (d) => {
                window.localStorage.setItem(
                  'recentlyCreated',
                  JSON.stringify(d.data),
                )
                window.localStorage.setItem('step1', '')
                window.localStorage.setItem('step2', '')
                window.localStorage.setItem('step3', '')
                setCurrentStep(0)
                navigate('/')
              },
            },
          )
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <FormObserver setShowDetailsModal={setShowDetailsModal} />
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
                  gap: '45px',
                  width: '100%',
                }}
              >
                {FormData.map((group, i) => {
                  return <FormInputRow group={group} key={i} />
                })}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {props.values.recurring !== 'Does not repeat' && (
                    <RecurringDetailsTextArea
                      setDatesToExclude={setDatesToExclude}
                      datesToExclude={datesToExclude}
                      showDetailsModal={showDetailsModal}
                      setShowDetailsModal={setShowDetailsModal}
                      endDate={endDate}
                      setEndDate={setEndDate}
                    />
                  )}
                </div>
              </div>
            </div>

            <Divider style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }} />

            <StyledButtonsContainer>
              <div style={{ alignSelf: 'flex-start' }}>
                <Button
                  onClick={() => {
                    setIsOpen(true)
                  }}
                  size="sm"
                >
                  {t('Clear')}
                </Button>
              </div>
              <RightSideButtonContainer>
                <Button
                  onClick={() => {
                    setCurrentStep(1)
                    setStep3InStorage(props.values)
                  }}
                  variant="nobgGreen"
                  size="sm"
                >
                  {t('Back')}
                </Button>
                {isLoading && (
                  <div
                    style={{
                      width: '130px',
                      height: '36px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CircularProgress
                      size="2rem"
                      sx={{
                        color: '#28BFB2',
                      }}
                    />
                  </div>
                )}
                {!isLoading && (
                  <Button
                    onClick={() => {
                      props.handleSubmit()
                    }}
                    variant="primary"
                    overrideHover="#00a297"
                    size="sm"
                    disabled={!props.isValid}
                  >
                    {t('Submit')}
                  </Button>
                )}
              </RightSideButtonContainer>
            </StyledButtonsContainer>
            <ConfirmClearModal
              open={isOpen}
              setOpen={setIsOpen}
              callback={() => handleClear(props.setValues)}
            />
          </form>
        )}
      </Formik>
    </>
  )
}

export default Step3
