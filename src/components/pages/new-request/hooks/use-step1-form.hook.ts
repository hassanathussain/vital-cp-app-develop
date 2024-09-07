import {
  emailString,
  fullNameString,
  nonEmptyString,
  phoneString,
  requiredEmailString,
  requiredPhoneString,
} from 'constants/Validation/yupValidatiors'
import { NewRequestStepsReduceState } from 'context/newRequestReducer'
import { useUserSettings } from 'hooks/user/useUserSettings'
import { Step1Fields, Step1FormInputs } from 'hooks/useStepForm'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Yup from 'yup'

export const cartJobId = 100000
export const useStep1Form = (variables: NewRequestStepsReduceState) => {
  const { t } = useTranslation()
  const user = useUserSettings()
  const errMsj = {
    serviceRequired: t('Service is required'),
    titleRequired: t('Title is required'),
    nameRequired: t('Name is required'),
    eventRequired: t('Event is required'),
    selectRequired: t('Select one'),
    emailRequired: t('Email is required'),
  }

  const step1ValidationSchema = Yup.object().shape({
    jobType: Yup.number().required(errMsj.serviceRequired),
    [Step1Fields.EVENTNAME]: nonEmptyString.required(errMsj.titleRequired),
    [Step1Fields.SERVICETYPE]: Yup.string().required(errMsj.eventRequired),
    [Step1Fields.SERVICEDESCRIPTION]: nonEmptyString.required(
      errMsj.eventRequired,
    ),
    [Step1Fields.POCPHONE]: requiredPhoneString.nullable(),
    [Step1Fields.POCFULLNAME]: fullNameString,
    [Step1Fields.POCPREFNAME]: fullNameString
      .required(errMsj.nameRequired)
      .nullable(),
    [Step1Fields.POCEMAIL]: requiredEmailString.nullable(),

    [Step1Fields.CONSUMERS]: Yup.array().when('jobType', {
      is: (jobType: number) => {
        return jobType === cartJobId
      },
      then: Yup.array().of(
        Yup.object().shape({
          fullName: fullNameString.required(errMsj.nameRequired),
          email: requiredEmailString,
          phone: phoneString,
          prefName: fullNameString,
        }),
      ),
      otherwise: Yup.array().of(
        Yup.object().shape({
          fullName: fullNameString.required(errMsj.nameRequired),
          email: emailString,
          phone: phoneString,
          prefName: fullNameString,
        }),
      ),
    }),

    [Step1Fields.ATTENDEES]: Yup.array().of(
      Yup.object().shape({
        fullName: fullNameString.required(errMsj.nameRequired),
        email: requiredEmailString,
      }),
    ),
    //TODO: REMOvE THESE WITH NEW jobExtendedDataValue Type
    // [Step2Fields.ISPRESENTING]: Yup.boolean()
    //   .required(errMsj.selectRequired)
    //   .nullable(),
    // [Step2Fields.ISLIVESTREAMED]: Yup.boolean()
    //   .required(errMsj.selectRequired)
    //   .nullable(),
    // [Step2Fields.ISMEDICALORSCIENTIFIC]: Yup.boolean()
    //   .required(errMsj.selectRequired)
    //   .nullable(),

    //************** */
    [Step1Fields.ADDITIONALREQUESTINFO]: nonEmptyString.max(
      250,
      '250 character max',
    ),
  })

  const defaultValues: Step1FormInputs = useMemo(() => {
    const values = {
      isActive: true,
      jobType: null,
      eventName: '',
      consumers: [{ fullName: '', prefName: '', email: '', phone: '' }],
      pocFullName:
        user?.data?.firstName && user?.data?.lastName
          ? `${user?.data?.firstName} ${user?.data?.lastName}`
          : 'empty',
      pocPrefName: user.data?.preferredFirstName
        ? user?.data?.preferredFirstName
        : 'empty',
      pocEmail: user.data?.contactEmail
        ? user?.data?.contactEmail
        : 'empty@empty.com',
      pocPhone: user.data?.contactPhone
        ? user?.data?.contactPhone
        : '999-999-9999',
      attendees: [],
      serviceType: null,
      serviceDescription: null,
      prefProviders: [{ fullName: '' }],
      jobExtendedData: [],
      additionalRequestInfo: '',
      files: [],
    }

    return values
  }, [variables, user.data])

  return { step1ValidationSchema, defaultValues }
}
