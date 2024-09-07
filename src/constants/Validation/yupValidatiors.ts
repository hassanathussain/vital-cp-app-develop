import { IJobExtendedData } from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import { t } from 'i18next'
import * as Yup from 'yup'

const errMsj = {
  emailInvalid: t('Email is not valid'),
  emailRequired: t('Email is required'),
  phoneInvalid: t('Phone number is not valid'),
  serviceRequired: t('Service is required'),
  titleRequired: t('Title is required'),
  nameRequired: t('Name is required'),
  eventRequired: t('Event is required'),
  selectRequired: t('Select one'),
  invalid: t('Invalid input'),
  latinOnly: t('Invalid character'),
  phoneRequired: t('Phone is required'),
  zipInvalid: t('Zip code is invalid'),
  urlInvalid: t('Link is invalid'),
  required: t('Required'),
}

export const oneNonSpaceRegEx = /^(?!\s*$).+/
const fullNameRegEx = /^[a-z ,.'-]+$/i

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegExp =
  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const zipCodeRegExp =
  /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d)|([A-Z]\d[A-Z]))$/

const urlRegExp =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

export const stringRequired = Yup.string().required(errMsj.required)
export const stringNonRequired = Yup.string()

export const emailString = Yup.string()
  .min(1)
  .matches(emailRegExp, errMsj.emailInvalid)

export const requiredEmailString = emailString.required(errMsj.emailRequired)
export const UrlString = Yup.string()
  .min(1)
  .matches(urlRegExp, errMsj.urlInvalid)

export const phoneString = Yup.string().matches(
  phoneRegExp,
  errMsj.phoneInvalid,
)
export const zipCodeString = Yup.string().matches(
  zipCodeRegExp,
  errMsj.zipInvalid,
)
export const requiredPhoneString = phoneString.required(errMsj.phoneRequired)
export const nonEmptyString = Yup.string().matches(
  oneNonSpaceRegEx,
  errMsj.invalid,
)
export const fullNameString = nonEmptyString.matches(
  fullNameRegEx,
  errMsj.latinOnly,
)
