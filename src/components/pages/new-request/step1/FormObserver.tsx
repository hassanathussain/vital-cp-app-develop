import { oneNonSpaceRegEx } from 'constants/Validation/yupValidatiors'
import { Step1Fields } from 'context/newRequestReducer'
import { useFormikContext } from 'formik'
import { IJobExtendedData } from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
type JobExtendedDataError = {
  fieldId: number
  message: string
}
export const validateExtendedDataFields = (
  jobExtendedData: IJobExtendedData[],
): JobExtendedDataError[] => {
  const jobdataerrors: JobExtendedDataError[] = []
  jobExtendedData?.forEach((field: IJobExtendedData, i: number) => {
    if (field.field.fieldType.name === 'TextBox') {
      if (
        field.isRequired &&
        field.extendedDataFieldValue !== null &&
        (field.extendedDataFieldValue === '' ||
          !oneNonSpaceRegEx.test(field.extendedDataFieldValue))
      ) {
        jobdataerrors.push({
          fieldId: field.jobServiceSubTypeServiceFieldId,
          message: `${field.label} is required`,
        })
      } else {
      }
    }
    if (field.field.fieldType.name === 'CheckBox') {
      if (field.isRequired && field.extendedDataFieldValue === null) {
        jobdataerrors.push({
          fieldId: field.jobServiceSubTypeServiceFieldId,
          message: 'Selection required',
        })
      } else {
      }
    }
  })
  return jobdataerrors
}

export default function FormObserver() {
  const { t } = useTranslation()
  const { values }: { values: Step1Fields } = useFormikContext()
  const formik: any = useFormikContext()
  const [previousValues, setPreviousValues] = useState<Step1Fields>(values)
  const setJobExtendedDataError =
    formik.getFieldHelpers('jobExtendedData').setError
  const setserviceDescription =
    formik.getFieldHelpers('serviceDescription').setValue

  useEffect(() => {
    if (values.serviceType !== previousValues.serviceType) {
      setserviceDescription(null)
    }
    setPreviousValues(values)
  }, [values])

  useEffect(() => {
    const jobdataerrors: JobExtendedDataError[] = []
    jobdataerrors.push(...validateExtendedDataFields(values.jobExtendedData))
    if (jobdataerrors.length > 0) {
      setJobExtendedDataError(jobdataerrors)
    } else {
      setJobExtendedDataError(undefined)
    }
  }, [])
  useEffect(() => {
    //validate job extended data here and set formik error if needed
    if (
      values.jobExtendedData !== previousValues.jobExtendedData ||
      values.jobType !== previousValues.jobType
    ) {
      //check if values are valid and set error if not
      const jobdataerrors: JobExtendedDataError[] = []

      jobdataerrors.push(...validateExtendedDataFields(values.jobExtendedData))

      if (jobdataerrors.length > 0) {
        setJobExtendedDataError(jobdataerrors)
      } else {
        setJobExtendedDataError(undefined)
      }
    }
  }, [values.jobExtendedData, values.jobType])
  return null
}
