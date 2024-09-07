import dayjs, { Dayjs } from 'dayjs'
import { Formik, FormikHelpers, useFormikContext } from 'formik'
import { RRule } from 'rrule'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LabelSpan, ModalDiv, RowDiv } from './RecurringDetailsModal.styled'
import FormObserver from './FormObserver'
import { Dialog } from '@mui/material'
import Button from 'shared/button'
import { generateRRule, GetFormattedRRuleText } from 'utils/rrule'
import ModalRow, { getOptions } from './ModalRows'

import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Step3FormInputs } from 'src/components/pages/new-request/hooks/use-step3-form.hook'

export interface IRecurringDetails {
  modalStartDate: Dayjs
  modalStartTime: Dayjs
  modalEndTime: Dayjs
  repeats: string
  every: number
  endDate: Dayjs
  dayOfWeek: string
}

interface IRecurringDetailsModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  formStartDate: Dayjs
  setFormStartDate: (date: Dayjs) => void
  formStartTime: Dayjs
  setFormStartTime: (date: Dayjs) => void
  formEndTime: Dayjs
  setFormEndTime: (date: Dayjs) => void
  formEndDate: Dayjs
  setEndDate: (date: Dayjs) => void
  setrRule: (rule: RRule) => void
  repeats: string
  setFormRecurring: (option: string) => void
}
function RecurrenceDetailsModal(props: IRecurringDetailsModalProps) {
  const { t } = useTranslation()
  const {
    open,
    setOpen,
    setFormStartDate,
    setFormStartTime,
    formStartTime,
    formEndTime,
    setFormEndTime,
    formStartDate,
    setEndDate,
    setrRule,
    formEndDate,
    repeats,
    setFormRecurring,
  } = props

  const defaultValues = {
    modalStartDate: formStartDate,
    modalStartTime: formStartTime,
    modalEndTime: formEndTime,
    repeats: repeats !== 'Custom' ? repeats : 'Weekly',
    every: getOptions(repeats)[0]?.value || 1,
    endDate: formEndDate,
    dayOfWeek: 'Mon',
  }

  const recurrenceDetailsData = [
    {
      label: t('Start Date'),
      forms: [
        {
          name: 'modalStartDate',
          type: 'date',
        },
      ],
    },
    {
      label: t('Time'),
      forms: [
        {
          type: 'timeRange',
          name: 'modalStartTime',
          endTime: 'modalEndTime',
        },
      ],
    },
    {
      label: t('Repeats'),
      forms: [
        {
          type: 'select',
          name: 'repeats',
          options: [
            { text: t('Daily'), value: 'Daily' },
            { text: t('Weekly'), value: 'Weekly' },
            { text: t('Monthly'), value: 'Monthly' },
          ],
        },
      ],
    },
    {
      label: t('Every'),
      forms: [
        {
          type: 'select',
          name: 'every',
          options: [{ text: '1' }, { text: '2' }],
        },
      ],
    },
    {
      label: t('On'),
      forms: [
        {
          type: 'dayOfWeek',
          name: 'dayOfWeek',
        },
      ],
    },
    {
      label: t('Ending Date'),
      forms: [
        {
          name: 'endDate',
          type: 'date',
          offset: '-300px',
        },
      ],
    },
  ]

  function readRecurringDetailsFromStorage(): IRecurringDetails {
    const json = localStorage.getItem('recurrenceDetails')
    const details: IRecurringDetails | null = json && JSON.parse(json)

    if (details) {
      return {
        ...details,
        modalStartDate: defaultValues.modalStartDate,
        modalStartTime: defaultValues.modalStartTime,
        modalEndTime: defaultValues.modalEndTime,
        endDate: defaultValues.endDate,
        repeats: defaultValues.repeats,
      }
    }
    return defaultValues
  }

  const errMsj = {
    minDateMsg: t('Start Date cannot be in the past'),
    nameRequired: t('Name is required'),
    startBeforeEnd: t('Start Time must be before End Time'),
    endDateMsg: t('End Date must be after start date'),
    notEqual: t('Start and end times must not be equal'),
    endDateRequired: t('End Date required'),
    maxDateMsg: t("Events can't be scheduled past 1 year"),
  }

  const startOfToday = new Date()
  startOfToday.setUTCHours(0, 0, 1)

  const { values }: { values: Step3FormInputs } = useFormikContext()
  const startDate = values?.startDate?.toDate()

  const withinOneYear = new Date(
    startDate?.setFullYear(startDate?.getFullYear() + 1),
  )

  const recurringDetialsValidationSchema = Yup.object().shape({
    modalStartDate: Yup.date()
      .min(startOfToday, errMsj.minDateMsg)
      .required(errMsj.nameRequired),
    modalStartTime: Yup.date().test(
      'same_dates_test',
      errMsj.notEqual,
      function (value) {
        const { modalEndTime } = this.parent
        return (
          dayjs(value).format('llll') !== dayjs(modalEndTime).format('llll')
        )
      },
    ),
    modalEndTime: Yup.date().test(
      'same_dates_test',
      errMsj.notEqual,
      function (value) {
        const { modalStartTime } = this.parent
        return (
          dayjs(value).format('llll') !== dayjs(modalStartTime).format('llll')
        )
      },
    ),
    endDate: Yup.date()
      .min(Yup.ref('modalStartDate'), errMsj.endDateMsg)
      .max(withinOneYear, errMsj.maxDateMsg)
      .required(errMsj.endDateRequired),
  })

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: { borderRadius: '10px', overflow: 'visible' },
      }}
    >
      <ModalDiv>
        <div
          style={{
            fontWeight: 600,
            fontSize: '19px',
            lineHeight: '24px',
          }}
        >
          {t('Recurrence Details')}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Formik
            initialValues={readRecurringDetailsFromStorage()}
            validationSchema={recurringDetialsValidationSchema}
            onSubmit={(values: any, { setSubmitting }: FormikHelpers<any>) => {
              const rule = generateRRule(values)
              setrRule(rule)
              setFormStartDate(values.modalStartDate)
              setFormStartTime(values.modalStartTime)
              setFormEndTime(values.modalEndTime)
              setFormRecurring(values.repeats)
              setEndDate(values.endDate)
              props.setOpen(false)
            }}
          >
            {(props) => {
              const tDetails = GetFormattedRRuleText(
                generateRRule(props.values),
                props.values,
              )
                ?.split(' ')
                ?.map((el) => t(el))
                ?.join(' ')

              function setRecurringDetailsInStorage() {
                window.localStorage.setItem(
                  'recurrenceDetails',
                  JSON.stringify(props.values),
                )
              }
              function handleCancel(e: Event) {
                e.preventDefault()
                setOpen(false)
                props.setValues(props.initialValues)
              }

              return (
                <form onSubmit={props.handleSubmit}>
                  <FormObserver />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      width: '100%',
                      padding: '20px 0px',
                    }}
                  >
                    {recurrenceDetailsData.map(
                      (group: { label: string }, i: any) => {
                        if (
                          group.label === 'On' &&
                          props.values.repeats === 'Monthly'
                        ) {
                          return <></>
                        }
                        return <ModalRow rowGroup={group} key={i} {...props} />
                      },
                    )}
                    <RowDiv>
                      <LabelSpan>{t('Details')}</LabelSpan>
                      <div
                        style={{
                          width: '326px',
                          textAlign: 'left',
                        }}
                      >
                        {tDetails}
                      </div>
                    </RowDiv>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '6px',
                    }}
                  >
                    <Button onClick={handleCancel} size="sm" variant="nobg">
                      {t('Cancel')}
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        setRecurringDetailsInStorage()
                        props.submitForm()
                      }}
                      size="sm"
                    >
                      {t('Save')}
                    </Button>
                  </div>
                </form>
              )
            }}
          </Formik>
        </div>
      </ModalDiv>
    </Dialog>
  )
}

export default RecurrenceDetailsModal
