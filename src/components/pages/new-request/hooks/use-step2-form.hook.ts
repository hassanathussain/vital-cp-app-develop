import * as Yup from 'yup'
import { useMemo } from 'react'
import { NewRequestStepsReduceState } from 'context/newRequestReducer'
import { useUserSettings } from 'hooks/user/useUserSettings'
import { useTranslation } from 'react-i18next'
import {
  fullNameString,
  nonEmptyString,
  UrlString,
  zipCodeString,
} from 'constants/Validation/yupValidatiors'

enum Step2Fields {
  LANGUAGE = 'lang',
  VIDEOSERVICE = 'videoService',
  VIDEOSERVICELINK = 'videoServiceLink',
  LOCATIONINFO = 'locationInfo',
  DOCUMENT = 'document',
  ADDRESS1 = 'address1',
  ADDRESS2 = 'address2',
  CITY = 'city',
  STATE = 'state',
  COUNTRY = 'country',
  ZIPCODE = 'zipCode',
  CLEANTRANSCRIPT = 'cleanTranscript',
  LAT = 'lat',
  LNG = 'lng',
  LOCATIONID = 'locationId',
  ISNEWLOCATION = 'isNewLocation',
}

export type Step2FormInputs = {
  [Step2Fields.LANGUAGE]: number | null
  [Step2Fields.VIDEOSERVICE]: string
  [Step2Fields.VIDEOSERVICELINK]: string
  [Step2Fields.LOCATIONINFO]: string
  [Step2Fields.DOCUMENT]: string
  [Step2Fields.ADDRESS1]: string
  [Step2Fields.ADDRESS2]: string
  [Step2Fields.CITY]: string
  [Step2Fields.STATE]: string
  [Step2Fields.COUNTRY]: string
  [Step2Fields.ZIPCODE]: string
  [Step2Fields.CLEANTRANSCRIPT]: boolean
  [Step2Fields.LAT]: number | null
  [Step2Fields.LNG]: number | null
  [Step2Fields.LOCATIONID]: number | null
  [Step2Fields.ISNEWLOCATION]: boolean
}

export const useStep2Form = (variables: NewRequestStepsReduceState) => {
  const { t } = useTranslation()
  const user = useUserSettings()
  const errMsj = {
    locationRequired: t('Location is required'),
    langRequired: t('Language is required'),
    videoServiceRequired: t('Video Service is required'),
    linkRequired: t('Video Service Link is required'),
    addressRequired: t('Address 1 is required'),
    cityRequired: t('City is required'),
    stateRequired: t('State is required'),
    countryRequired: t('Country is required'),
    zipRequired: t('Zip code is required'),
    numbersOnly: t('Numbers only'),
    charactersMax: t('5000 character max'),
  }
  const remoteValidationSchema = Yup.object().shape({
    [Step2Fields.LANGUAGE]: Yup.number().required(errMsj.langRequired),
    [Step2Fields.VIDEOSERVICE]: Yup.string()
      .typeError('')
      .required(errMsj.videoServiceRequired),
    [Step2Fields.VIDEOSERVICELINK]: UrlString,
    [Step2Fields.STATE]: Yup.string().required(errMsj.stateRequired),
    [Step2Fields.LOCATIONINFO]: nonEmptyString.max(5000, errMsj.charactersMax),
  })

  const onsiteValidationSchema = Yup.object().shape({
    [Step2Fields.LANGUAGE]: Yup.number().required(errMsj.langRequired),
    [Step2Fields.ADDRESS1]: nonEmptyString.required(errMsj.addressRequired),
    [Step2Fields.ADDRESS2]: nonEmptyString,
    [Step2Fields.CITY]: fullNameString.required(errMsj.cityRequired),
    [Step2Fields.STATE]: Yup.string().required(errMsj.stateRequired),
    [Step2Fields.COUNTRY]: Yup.string().required(errMsj.countryRequired),
    [Step2Fields.ZIPCODE]: zipCodeString.required(errMsj.zipRequired),
    [Step2Fields.LOCATIONINFO]: nonEmptyString.max(5000, errMsj.charactersMax),
    [Step2Fields.LOCATIONID]: Yup.number().when(Step2Fields.ISNEWLOCATION, {
      is: (isNewLocation: boolean) => {
        return isNewLocation
      },
      then: Yup.number().nullable(),
      otherwise: Yup.number().required(errMsj.locationRequired).nullable(),
    }),
  })

  const defaultValues: Step2FormInputs = useMemo(() => {
    const values = {
      lang: isNaN(Number(user?.data?.preferredLanguage))
        ? null
        : Number(user?.data?.preferredLanguage),
      videoService: '',
      videoServiceLink: '',
      locationInfo: '',
      document: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      cleanTranscript: false,
      lat: null,
      lng: null,
      locationId: null,
      isNewLocation: false,
    }

    return values
  }, [variables])

  return { remoteValidationSchema, onsiteValidationSchema, defaultValues }
}
