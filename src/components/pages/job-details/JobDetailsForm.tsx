import { useJobTypes } from 'hooks/dropdowns/useJobTypes'
import { getFormData } from 'constants/jobViewDataCards'
import {
  DataCardProps,
  IDataCard,
  IDataCardProps,
  IUploadedFile,
  Job,
} from 'models/jobDashboard'
import NewDataCard from '../jobs-dashboard/data-card/NewDataCard'
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik'
import { JobViewProps, viewModes } from './JobView'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
} from 'react'
import { JobActivityDetails, useJobActivity } from 'hooks/jobs/useJobActivity'
import { useJob } from 'hooks/jobs/useJob'
import { useServiceTypes } from 'hooks/dropdowns/useServiceTypes'
import { useServiceSubTypes } from 'hooks/dropdowns/useServiceSubTypes'
import { useLanguages } from 'hooks/dropdowns/useLanguages'
import { useTimeZoneOptions, useTimeZones } from 'hooks/dropdowns/useTimeZones'
import { useVideoServices } from 'hooks/dropdowns/useVideoServices'
import FormObserver from './FormObserver'
import {
  getRRuleSentence,
  parseRRule,
} from '../jobs-dashboard/data-card/DataCardRowForm'
import { t } from 'i18next'
import {
  UrlString,
  emailString,
  fullNameString,
  nonEmptyString,
  phoneString,
  requiredEmailString,
  oneNonSpaceRegEx,
} from 'constants/Validation/yupValidatiors'
import * as Yup from 'yup'
import { cartJobId } from '../new-request/hooks/use-step1-form.hook'
import dayjs, { Dayjs } from 'dayjs'
import { useUpdateJobActivity } from 'hooks/jobs/useUpdateJobActivity'
import { useStates } from 'hooks/dropdowns/useStates'
import { useCountries } from 'hooks/dropdowns/useCountries'
import { useUpdateJobSeries } from 'hooks/jobs/useUpdateJobSeries'
import {
  compareExDates,
  getDatesFromRRuleString,
  getDaysOfWeekFromByWeekDay,
  getRepeatsOptionValueFromFrequency,
  makeSetFromRRuleAndExclusion,
} from 'utils/rrule'
import { useUserSettings } from 'hooks/user/useUserSettings'

import { RRule, RRuleSet } from 'rrule'
import SchedulesModal from 'shared/modals/SchedulesModal'
import { useJobTypeData } from 'hooks/jobs/useJobTypeData'
import { useQueryClient } from 'react-query'
import {
  ICompanyLocation,
  useCompanyLocations,
} from 'hooks/dropdowns/useCompanyLocations'
import { IJobExtendedData } from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import { FormattedFile } from 'hooks/jobs/useCreateJob'
import { useDeleteFileFromJob } from 'hooks/jobs/files/useDeleteFileFromJob'

interface IProps {
  viewMode: viewModes
  isEditMode: boolean
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  setIsFormDirty: Dispatch<SetStateAction<boolean>>
  jobId: number
  activityId: number
  children?: ReactNode
  handleClose: Dispatch<SetStateAction<boolean>>
  setHaveExDatesBeenChanged: Dispatch<SetStateAction<boolean>>
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
}
export interface IJobFormValues {
  // **** Request Details ****
  requestedService: number | undefined
  requestTitle: string | undefined
  serviceFor: {
    fullName: string
    email: string
    phone: string
    prefName: string
  }[]
  language: number | undefined

  serviceType: number | undefined
  serviceSubType: number | null

  jobExtendedData: IJobExtendedData[]
  requestNotes: string
  providers: string[]

  // **** TimeCard ****
  timezone: number
  startDate: Dayjs | undefined
  endDate: Dayjs | undefined
  startTime: Dayjs | undefined
  endTime: Dayjs | undefined
  recurrenceDetails: string
  repeats: number
  rrule: RRule
  interval: number
  dayOfWeek: string
  // **** Location ****
  address1: string | undefined
  address2: string | undefined | null
  city: string | undefined
  state: number | undefined | null
  zipCode: string | undefined
  country: number | undefined | null
  locationVideoServiceType: number | undefined | null
  locationAssociatedURL: string | undefined
  locationNotes: string | undefined | null
  locationId: number | null | undefined
  isNewLocation: boolean
  // **** Point of Contact ****
  pocFullName: string | undefined
  pocPrefName: string | undefined
  pocEmail: string | undefined
  pocPhone: string | undefined
  attendees: Attendee[]
  uploadedFile: IUploadedFile[]
  files: FormattedFile[]
  filesToDelete: IUploadedFile[]
}
interface Attendee {
  fullName: string
  prefName?: string
  email?: string
  phone?: string
}
export const hasTimeBeenChange = (
  initialJobFormData: IJobFormValues,
  jobFormData: IJobFormValues,
  hasExDatesBeenChanged: boolean,
) => {
  if (
    initialJobFormData.timezone !== jobFormData.timezone ||
    initialJobFormData.startTime?.hour() !== jobFormData.startTime?.hour() ||
    initialJobFormData.startTime?.minute() !==
      jobFormData.startTime?.minute() ||
    initialJobFormData.endTime?.hour() !== jobFormData.endTime?.hour() ||
    initialJobFormData.endTime?.minute() !== jobFormData.endTime?.minute() ||
    initialJobFormData.startDate !== jobFormData.startDate ||
    initialJobFormData.endDate !== jobFormData.endDate ||
    initialJobFormData.repeats !== jobFormData.repeats ||
    initialJobFormData.interval !== jobFormData.interval ||
    initialJobFormData.dayOfWeek !== jobFormData.dayOfWeek ||
    hasExDatesBeenChanged
  ) {
    return true
  }
  return false
}

// **** Job Details ****

const JobDetailsForm = (props: IProps) => {
  const jobTypes = useJobTypes()
  const queryClient = useQueryClient()
  const jobTypeData = useJobTypeData()
  const serviceTypes = useServiceTypes()
  const languages = useLanguages()
  const states = useStates()
  const countries = useCountries()
  const timezones = useTimeZoneOptions()

  const {
    viewMode,
    isEditMode,
    jobId,
    activityId,
    setIsEditMode,
    setIsFormDirty,
    handleClose,
    setHaveExDatesBeenChanged,
    setJobViewInfo,
  } = props

  // **** API calls ****
  const user = useUserSettings()

  const activityDetails = useJobActivity(activityId)
  const jobDetails = useJob(jobId)

  const timezoneData = useTimeZones()
  const stateOptions = useStates()
  const countryOptions = useCountries()
  const videoServiceProvider = useVideoServices()
  const { data } = useCompanyLocations(user.data?.companyID || -1)

  const serviceSubTypes = useServiceSubTypes(
    jobDetails?.data?.jobServiceTypeId
      ? jobDetails?.data?.jobServiceTypeId
      : -1,
  )

  // ***** Mutations *****
  const { mutate, isLoading } = useUpdateJobActivity(activityId)
  const { mutate: mutateSeries, isLoading: seriesLoading } =
    useUpdateJobSeries(jobId)

  const getLocationNameForLocationID = (locationId: number) => {
    return data?.find((el) => el.id === locationId)?.name
  }
  //STATE

  const dayjsDates =
    getDatesFromRRuleString(jobDetails?.data?.occurrence || '') || []
  const [exclusionDates, setExclusionDates] = React.useState<Dayjs[]>(
    dayjsDates || [],
  )
  const [showScheduleModal, setShowScheduleModal] = React.useState(false)
  const [dataCards, setDataCards] = React.useState<IDataCard[]>([])

  const userTimeZoneId = timezoneData?.data?.find(
    (el) => el.timezoneCode === user?.data?.preferredTimeZoneCode,
  )?.id

  const isRemote =
    jobTypes?.data?.find(
      (el) => activityDetails?.data?.requestedService === el.value,
    )?.code === 'remote'

  const isAnOnsite = (requestedService: number) => {
    const onsite =
      jobTypeData?.data?.find((el) => el.id === requestedService)?.value ===
      'onsite'
    return onsite
  }

  const companyLocationsOptions = data?.map((el: ICompanyLocation) => ({
    value: el.id,
    text: `${el.street1}, ${el.city}, ${el.state}, ${el.postalCode} ${el.country}`,
  }))

  // **** DATA card rows ****
  // this information is used to create the data cards
  // the function getFormData will set all of the information for what ur rows
  //will render.
  const { dataCardRows, eventDataCardRows, singleEventDataCardRows } =
    getFormData(
      viewMode,
      isEditMode,
      jobTypes?.data,
      languages?.data,
      serviceTypes?.data,
      serviceSubTypes?.data,
      timezones?.data,
      videoServiceProvider?.data,
      stateOptions?.data,
      countryOptions?.data,
      isRemote,
      companyLocationsOptions,
    )
  const getNewFormData = (remote: boolean, isSeries: boolean) => {
    const {
      dataCardRows: newSeriesRows,
      eventDataCardRows: newEventRows,
      singleEventDataCardRows,
    } = getFormData(
      viewMode,
      isEditMode,
      jobTypes?.data,
      languages?.data,
      serviceTypes?.data,
      serviceSubTypes?.data,
      timezones?.data,
      videoServiceProvider?.data,
      stateOptions?.data,
      countryOptions?.data,
      remote,
      companyLocationsOptions,
    )

    //if it is single set it here
    const isDNR = jobDetails?.data?.occurrence === null
    return isSeries
      ? newSeriesRows
      : isDNR
      ? singleEventDataCardRows
      : newEventRows
  }

  //need to set hour and time here

  useEffect(() => {
    if (!compareExDates(dayjsDates, exclusionDates)) {
      setHaveExDatesBeenChanged(true)
    } else {
      setHaveExDatesBeenChanged(false)
    }
  }, [exclusionDates])
  const resetDataCards = (viewMode: viewModes) => {
    switch (viewMode) {
      case 'series':
        setDataCards(dataCardRows)
        break
      case 'event':
        setDataCards(eventDataCardRows)
        break
      case 'single':
        setDataCards(singleEventDataCardRows)
        break
      default:
        setDataCards(dataCardRows)
    }
  }
  useEffect(() => {
    resetDataCards(viewMode)
  }, [viewMode, isEditMode])

  useEffect(() => {
    if (serviceTypes?.status === 'success') {
      setDataCards(getNewFormData(isRemote, viewMode === 'series'))
    }
    if (serviceSubTypes?.status === 'success') {
      setDataCards(getNewFormData(isRemote, viewMode === 'series'))
    }
  }, [serviceTypes?.status, serviceSubTypes?.status])

  // **** Formik initial vlues ****
  // These initial values are used to populate the form fields

  const getInitialValues = (
    activityDetails: JobActivityDetails | undefined,
    jobDetails: Job | undefined,
  ) => {
    const poc = jobDetails?.pointOfContacts[0]
    const pocInitialValues = {}
    const initialValues: IJobFormValues = {
      // **** Request Details ****
      requestedService: activityDetails?.requestedService,
      requestTitle: jobDetails?.requestTitle,
      serviceFor:
        jobDetails?.serviceFor?.map((el) => ({
          fullName: el.serviceForName,
          email: el.serviceForEmail,
          phone: el.serviceForPhone,
          prefName: el.serviceForPreferredName,
        })) || [],
      language:
        viewMode === 'series'
          ? jobDetails?.languageId || 1
          : activityDetails?.languageId || 1,
      serviceType: jobDetails?.jobServiceTypeId,
      serviceSubType:
        jobDetails?.jobServiceSubTypeId !== null &&
        jobDetails?.jobServiceSubTypeId
          ? jobDetails?.jobServiceSubTypeId
          : null,
      //TODO update this to parse the jobExtendedData from the jobDetails
      jobExtendedData: jobDetails?.jobExtendedData || [],
      //********** */

      requestNotes:
        jobDetails?.requestNotes && jobDetails?.requestNotes !== ''
          ? jobDetails?.requestNotes
          : 'None',
      providers: activityDetails?.providers || [],
      // **** TimeCard ****
      timezone:
        viewMode === 'series'
          ? jobDetails?.timezoneId || 1
          : activityDetails?.timeZoneId || 1,
      startDate:
        viewMode === 'series'
          ? jobDetails?.requestStartDateTime
          : activityDetails?.startDate,

      //the end date is set to start date cureently, becuase all repeating jobs have an end date.
      //otherwise the end date gets set to a year in the future this is to prevent that from being the defualt value.
      endDate:
        jobDetails?.occurrence === null
          ? jobDetails?.requestStartDateTime
          : activityDetails?.endDate
          ? activityDetails?.endDate
          : jobDetails?.requestEndDateTime,
      startTime: activityDetails?.startTime,
      endTime: activityDetails?.endTime,
      recurrenceDetails: jobDetails?.occurrence
        ? getRRuleSentence(parseRRule(jobDetails?.occurrence))
        : 'Does not repeat',
      rrule: parseRRule(jobDetails?.occurrence || ''),
      repeats: jobDetails?.occurrence
        ? getRepeatsOptionValueFromFrequency(
            parseRRule(jobDetails.occurrence)?.options?.freq,
          )
        : 0,

      interval:
        parseRRule(jobDetails?.occurrence || '')?.options?.interval || 0,
      dayOfWeek: getDaysOfWeekFromByWeekDay(
        parseRRule(jobDetails?.occurrence || '')?.options?.byweekday || [],
      ),
      // **** Location ****
      address1:
        viewMode === 'series'
          ? jobDetails?.locationAddress1
          : activityDetails?.address,
      address2:
        viewMode === 'series'
          ? jobDetails?.locationAddress2
          : activityDetails?.address2,
      city:
        viewMode === 'series'
          ? jobDetails?.locationCity
          : activityDetails?.city,
      state:
        viewMode === 'series'
          ? jobDetails?.locationStateId ||
            states?.data?.find(
              (state) => state.code === jobDetails?.locationState,
            )?.value
          : activityDetails?.stateProvinceId ||
            states?.data?.find(
              (state) => state.code === activityDetails?.stateProvince,
            )?.value,
      zipCode:
        viewMode === 'series'
          ? jobDetails?.locationZip
          : activityDetails?.zipCode,
      country:
        viewMode === 'series'
          ? jobDetails?.locationCountryId
          : activityDetails?.countryId,
      locationVideoServiceType:
        viewMode === 'series'
          ? jobDetails?.locationVideoServiceTypeId
          : activityDetails?.meetingPlatformId,
      locationAssociatedURL:
        viewMode === 'series'
          ? jobDetails?.locationAssociatedURL
          : activityDetails?.meetingLink,
      locationNotes:
        viewMode === 'series'
          ? jobDetails?.locationNotes || ''
          : activityDetails?.locationNotes,
      locationId:
        viewMode === 'series'
          ? jobDetails?.locationId || null
          : activityDetails?.locationId,
      isNewLocation: false,
      // **** Point of Contact ****
      pocFullName: poc?.poC_Name,
      pocEmail: poc?.pocContactEmail,
      pocPhone: poc?.pocContactPhone,
      pocPrefName: poc?.poC_PreferredName,
      attendees:
        jobDetails?.attendees?.map((el) => {
          return {
            fullName: el.attendeeName,

            prefName: el.attendeePreferredName,

            email: el.attendeeEmail,
            phone: el.attendeePhone,
          }
        }) || [],
      uploadedFile: activityDetails?.uploadedFile || [],
      files: [],
      filesToDelete: [],
    }
    return initialValues
  }
  const initialValues = useMemo(
    () => getInitialValues(activityDetails?.data, jobDetails?.data),
    [viewMode],
  )
  const errMsj = {
    serviceRequired: t('Service is required'),
    serviceSubTypeRequired: t('Service Sub Type is required'),
    titleRequired: t('Title is required'),
    nameRequired: t('Name is required'),
    eventRequired: t('Event is required'),
    selectRequired: t('Select one'),
    emailRequired: t('Email is required'),
    startDateMin: t('Start Date cannot be in the past'),
    startDateMax: t('Date must be before'),
    startTime: t('Start Time must be before End Time'),
    dateRequired: t('Date cannot be in the past'),
    notEqual: t('Start and end times must not be equal'),
    invalidTime: t('Invalid Time'),
    endDateMin: t('End Date must be after start date'),
    maxDateMsg: t("Events can't be scheduled past 1 year"),
  }
  const startOfToday = new Date()
  startOfToday.setUTCHours(0, 0, 1)

  const withinOneYear = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  )

  const jobFormValidationSchema = Yup.object().shape({
    // **** Request Details ****
    requestTitle: nonEmptyString.required(errMsj.titleRequired),
    serviceType: Yup.number().required(errMsj.serviceRequired),
    serviceSubType: Yup.number().required(errMsj.serviceSubTypeRequired),
    serviceFor: Yup.array().when('jobType', {
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
          email: emailString.nullable(),
          phone: phoneString.nullable(),
          prefName: fullNameString.nullable(),
        }),
      ),
    }),
    requestNotes: nonEmptyString.max(250, '250 character max'),
    // serviceDe
    //******Job extended ******
    jobExtendedData: Yup.array().of(
      Yup.object()
        .shape({
          extendedDataFieldValue: Yup.string().nullable(),
          isRequired: Yup.boolean(),
        })
        .test('isRequired', 'This field is required', function (value) {
          const index = this.parent.indexOf(value)
          if (
            value.isRequired &&
            (value.extendedDataFieldValue === undefined ||
              value.extendedDataFieldValue === null ||
              value.extendedDataFieldValue === '' ||
              !oneNonSpaceRegEx.test(value.extendedDataFieldValue))
          ) {
            return this.createError({
              path: `jobExtendedData[${index}].extendedDataFieldValue`,
              message: 'Field is required',
            })
          }
          return true
        }),
    ),
    //****** Time ******
    startDate: Yup.date()
      .min(startOfToday, errMsj.startDateMin)
      .required(errMsj.dateRequired),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), errMsj.endDateMin)
      .max(withinOneYear, errMsj.maxDateMsg)
      .required(errMsj.dateRequired),
    startTime: Yup.date()
      .typeError('invalid time')
      .test('same_dates_test', errMsj.notEqual, function (value) {
        const { endTime, startTime } = this.parent
        return (
          dayjs(startTime).format('HH:mm') !== dayjs(endTime).format('HH:mm')
        )
      }),
    //
    endTime: Yup.date()
      .typeError('invalid time')
      .test('same_dates_test', errMsj.notEqual, function (value) {
        const { startTime, endTime } = this.parent
        return (
          dayjs(endTime).format('HH:mm') !== dayjs(startTime).format('HH:mm')
        )
      }),
    // **** Location ****
    locationVideoServiceType: Yup.number().when('requestedService', {
      is: (requestedService: number) => {
        return !isAnOnsite(requestedService)
      },
      then: Yup.number().required('video service type is required'),
      otherwise: Yup.number().nullable(),
    }),
    locationAssociatedURL: Yup.string().when('requestedService', {
      is: (requestedService: number) => {
        return !isAnOnsite(requestedService)
      },
      then: UrlString,
      otherwise: Yup.string().nullable(),
    }),
    address1: Yup.string().when('requestedService', {
      is: (requestedService: number) => {
        return isAnOnsite(requestedService)
      },
      then: Yup.string().required('address is required'),
      otherwise: Yup.string().nullable(),
    }),
    city: Yup.string().when('requestedService', {
      is: (requestedService: number) => {
        return isAnOnsite(requestedService)
      },
      then: Yup.string().required('city is required'),
      otherwise: Yup.string().nullable(),
    }),
    state: Yup.string().when('requestedService', {
      is: (requestedService: number) => {
        true
      },
      then: Yup.string().required('state is required'),
      otherwise: Yup.string().nullable(),
    }),
    country: Yup.string().when('requestedService', {
      is: (requestedService: number) => {
        return isAnOnsite(requestedService)
      },
      then: Yup.string().required('country is required'),
      otherwise: Yup.string().nullable(),
    }),
    //*******POC ****** */
    pocFullName: fullNameString,
    pocEmail: requiredEmailString,
    pocPhone: phoneString,
    pocPrefName: fullNameString,
    attendees: Yup.array().of(
      Yup.object().shape({
        fullName: fullNameString.required(errMsj.nameRequired),
        email: requiredEmailString,
      }),
    ),
  })
  const { mutate: mutateFile, isLoading: isDeleteFileLoading } =
    useDeleteFileFromJob()

  const handleDeleteFile = async (file: IUploadedFile) => {
    const fileElement = document.getElementById(file.id)
    if (file.owner === 'JOB') {
      await mutateFile(
        {
          id: jobId,
          fileId: file.id,
          level: 'JOB',
        },
        {
          onSuccess: () => {
            fileElement?.remove()
          },
        },
      )
    } else {
      await mutateFile(
        { id: activityId || -1, fileId: file.id, level: 'JOB_ACTIVITY' },
        {
          onSuccess: () => {
            fileElement?.remove()
          },
        },
      )
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={jobFormValidationSchema}
      //this will be repalces witht the proper api call. if an error is returned
      //we can keep edit mode and allow the user the handle the error
      onSubmit={(
        values: IJobFormValues,

        { setSubmitting, resetForm }: FormikHelpers<any>,
      ) => {
        setSubmitting(true)
        const locationNameToSend = values.locationId
          ? getLocationNameForLocationID(values?.locationId) || ''
          : ''

        const isJobOnsite = values.requestedService
          ? isAnOnsite(values.requestedService)
          : false
        const stateOptions = states?.data || []
        const countryOptions = countries?.data || []
        const filesToDelete = values.filesToDelete
        filesToDelete.forEach(async (file) => {
          await handleDeleteFile(file)
        })
        if (viewMode === 'event')
          mutate(
            {
              jobFormData: values,
              activityId,
              states: stateOptions,
              countries: countryOptions,
              isOnsite: isJobOnsite,
              locationName: locationNameToSend,
            },
            {
              onSettled: () => {
                setSubmitting(false)
                jobDetails.refetch()
                activityDetails.refetch()
                queryClient.refetchQueries(['jobActivities'])
                queryClient.removeQueries(['jobActivity'])
                queryClient.removeQueries(['job'])
                resetForm({ values: values })
              },
            },
          )
        else if (viewMode === 'series' || viewMode === 'single') {
          const daysToExclude = exclusionDates.map((date) => ({
            month: date.month() + 1,
            day: date.date(),
            year: date.year(),
          }))
          const exclusionSet = makeSetFromRRuleAndExclusion(
            values.rrule,
            exclusionDates,
          )
          const startHour = values.rrule?.options?.dtstart.getHours() || 12

          const newDateStrings = values.rrule
            .all((d: Date, len: number) => {
              if (len === 364) return false
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
          setJobViewInfo((info) => {
            if (!info) return null
            const origonalExDates = getDatesFromRRuleString(
              jobDetails?.data?.occurrence || '',
            )
            const newExDates = getDatesFromRRuleString(
              exclusionSet.toString() || '',
            )

            const hasExDatesBeenChanged = !compareExDates(
              origonalExDates,
              newExDates,
            )

            if (
              hasTimeBeenChange(initialValues, values, hasExDatesBeenChanged)
            ) {
              return {
                ...info,
                activityId: undefined,
              }
            } else return info
          })
          mutateSeries(
            {
              jobFormData: values,

              initialJobFormData: initialValues,

              initialRRuleString: jobDetails?.data?.occurrence || null,
              jobId: jobId,
              states: stateOptions,
              countries: countryOptions,

              dates: exclusionSet ? newDateStrings : [],
              rruleSet: exclusionSet,
              locationName: locationNameToSend,
              isOnsite: isJobOnsite,
              userTimeZoneId: userTimeZoneId || 1,
              setIsJobViewOpen: handleClose,
            },
            {
              onSettled: () => {
                setSubmitting(false)
                jobDetails.refetch()
                activityDetails.refetch()
                queryClient.refetchQueries(['jobActivities'])
                queryClient.removeQueries(['job'])
                queryClient.removeQueries(['jobActivity'])
                resetForm({ values: values })
              },
            },
          )
        }
        setIsEditMode(false)
        setIsFormDirty(false)
      }}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => {
        return (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <FormObserver
              setIsFormDirty={setIsFormDirty}
              setDataCards={setDataCards}
              getFormData={getNewFormData}
              setDatesToExclude={setExclusionDates}
              jobTypes={jobTypes}
              serviceSubType={values.serviceSubType}
            />
            {dataCards?.map((dataCard, i) => {
              return (
                <NewDataCard
                  toggleScheduleModal={() => setShowScheduleModal(true)}
                  isEditMode={isEditMode}
                  viewMode={viewMode}
                  title={dataCard.title}
                  rows={dataCard.rows}
                  key={i}
                  jobId={jobId}
                  activityId={activityId}
                />
              )
            })}{' '}
            <SchedulesModal
              open={showScheduleModal}
              setOpen={setShowScheduleModal}
              rRule={values?.rrule}
              setRRule={(newRule: RRule) => {
                setFieldValue('rrule', newRule)
              }}
              setDatesToExclude={setExclusionDates}
              datesToExclude={exclusionDates}
            />
            {props.children}
          </Form>
        )
      }}
    </Formik>
  )
}

export default JobDetailsForm
