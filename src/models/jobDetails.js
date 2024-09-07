import * as Yup from 'yup'

const startOfToday = new Date()
startOfToday.setUTCHours(0, 0, 1)

export const requestDetailsValidationSchema = Yup.object().shape({
    language: Yup.string().required('Required'),
    startDate: Yup.date().min(startOfToday, 'Start date cannot be in the past'),
    endDate: Yup.date().min(
      Yup.ref('startDate'),
      'End date cannot be before start date',
    ),
    endTime: Yup.date().min(
      Yup.ref('startTime'),
      'End time cannot be before start time',
    ),
  }),
  pocValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    phoneNumber: Yup.string().required('Required'),
  }),
  locationDetailsValidationSchema = Yup.object().shape({
    location: Yup.object().default(null).nullable().shape({
      country: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
    }),
  })
