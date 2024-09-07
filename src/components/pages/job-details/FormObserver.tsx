import { Dayjs } from 'dayjs'
import { useFormikContext } from 'formik'
import { useJobTypes } from 'hooks/dropdowns/useJobTypes'
import { IJobExtendedData, useServiceSubTypeFields } from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import { Dispatch, useEffect, useMemo, useState } from 'react'
import { UseQueryResult } from 'react-query'
import {
  dailyOptions,
  monthlyOptions,
  weeklyOptions,
} from 'shared/modals/RecurrenceDetailsModal/ModalRows'
import { IOption } from 'shared/select/BasicSelect'
import { generateRRule } from 'utils/rrule'

interface IProps {
  setIsFormDirty: Dispatch<React.SetStateAction<boolean>>
  setDatesToExclude: Dispatch<React.SetStateAction<Dayjs[]>>
  setDataCards: Dispatch<React.SetStateAction<any>>
  getFormData: (remote: boolean, isSeries: boolean) => any
  jobTypes: UseQueryResult<IOption[], unknown>
  serviceSubType: number  | null
}
export const getIntervalOptions = (repeats: number) => {
  switch (repeats) {
    case 1:
      return dailyOptions
    case 2:
      return weeklyOptions
    case 3:
      return monthlyOptions
    default:
      return []
  }
}
interface IFormValues {
  requestedService: number
  startDate: Dayjs
  startTime: Dayjs
  endTime: Dayjs
  dayOfWeek: string
  interval: number
  repeats: number
  every: number
  endDate: Dayjs
  serviceType: number 
  serviceSubType: number
  jobExtendedData: IJobExtendedData
}

const FormObserver = (props: IProps) => {
  const { setDataCards, getFormData, setDatesToExclude, jobTypes, serviceSubType } = props
  const formik: any = useFormikContext()
  const values: IFormValues = formik.values
  
  const fieldsToRender = useServiceSubTypeFields(serviceSubType)
  const setRecurrence = formik.getFieldHelpers('recurrenceDetails').setValue
  const setRRule = formik.getFieldHelpers('rrule').setValue
  const setServiceSubtype = formik.getFieldHelpers('serviceSubType').setValue
  const setJobExtendedData = formik.getFieldHelpers('jobExtendedData').setValue

  
  const { dirty, initialValues } = formik
  const [previousValues, setPreviousValues] =
    useState<IFormValues>(initialValues)

  useEffect(() => {
    if (values.serviceType !== previousValues.serviceType) {
      setServiceSubtype(null)
    }
    setPreviousValues(values)
  }, [values])

  useEffect(() => {
    const fields = fieldsToRender.data?.map((field) => {
      if (field.field.fieldType.name === 'TextBox') {
        const defaultValue = field?.field?.defaultValue || ''

        const stringVal = defaultValue.toString()
        return {
          ...field,
          extendedDataFieldValue: stringVal || '',
          extendedDataId: null
        }
      } else {
        return {
          ...field,
          extendedDataFieldValue: null,
          extendedDataId: null
        }
      }
    })
    if (
      initialValues.serviceSubType !== serviceSubType
    ) {
      setJobExtendedData(fields || [])
    }
    else {
      setJobExtendedData(initialValues?.jobExtendedData)
    }
  }, [fieldsToRender.data])

  useEffect(() => {
    props.setIsFormDirty(dirty)
  }, [dirty])

  const repeatOptions = [
    { text: 'Does not repeat', value: 0 },
    { text: 'Daily', value: 1 },
    { text: 'Weekly', value: 2 },
    { text: 'Monthly', value: 3 },
    { text: 'Custom', value: 4 },
  ]
  if (
    values.dayOfWeek !== previousValues.dayOfWeek ||
    values.repeats !== previousValues.repeats ||
    values.interval !== previousValues.interval ||
    values.startDate !== previousValues.startDate ||
    values.startTime !== previousValues.startTime ||
    values.endTime !== previousValues.endTime ||
    values.endDate !== previousValues.endDate
  ) {
    const newRule = generateRRule({
      modalStartDate: formik.values.startDate,
      modalStartTime: formik.values.startTime,
      modalEndTime: formik.values.endTime,
      repeats: formik.values.repeats
        ? repeatOptions.find((el) => el.value === formik.values.repeats)
            ?.text || 'Does not repeat'
        : 'Does not repeat',
      every: formik.values.interval,
      endDate: formik.values.endDate,
      dayOfWeek: formik.values.dayOfWeek,
    })

    setPreviousValues(values)

    if (values.repeats !== 0) {
      setRRule(newRule)
      setRecurrence(newRule.toText())
    }
  }


  if (values?.requestedService !== previousValues.requestedService) {
    if (
      jobTypes?.data?.find((el) => el.value === values?.requestedService)
        ?.code === 'onsite'
    ) {
      setDataCards(getFormData(false, false))
    }
    if (
      jobTypes?.data?.find(
        (el) => el.value === previousValues?.requestedService,
      )?.code === 'onsite' &&
      jobTypes?.data?.find((el) => el.value === values?.requestedService)
        ?.code === 'remote'
    ) {
      setDataCards(getFormData(true, false))
    }
    setPreviousValues(values)
  }

  return null
}
export default FormObserver
