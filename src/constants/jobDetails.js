//TODO : with the new Dynamic jobExtended Data we will need to update this function to accept data fir what

import { t } from 'i18next'

//job extended data fields will need to be shown
export const getFormData = (timeZones, jobTypes, isOnsite, serviceTypes) => {
  const pocData = [
    {
      name: 'fullName',
      type: 'text',
      label: t('Full Name'),
    },
    {
      name: 'email',
      type: 'text',
      label: t('Email address'),
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: t('Phone number'),
    },
  ]
  const locationDetailsData = isOnsite
    ? [
        {
          name: 'address1',
          type: 'text',
          label: t('Address1'),
        },
        {
          name: 'address2',
          type: 'text',
          label: t('Address2'),
        },
        {
          name: 'city',
          type: 'text',
          label: t('City'),
        },
        {
          name: 'state',
          type: 'text',
          label: t('State'),
        },
        {
          name: 'zipCode',
          type: 'text',
          label: t('Zip Code'),
        },
        {
          name: 'locationNotes',
          type: 'textarea',
          label: t('Meeting info'),
        },
      ]
    : [
        {
          name: 'locationVideoServiceType',
          type: 'select',
          label: t('Video service'),
          options: [],
        },
        {
          name: 'locationAssociatedURL',
          type: 'text',
          label: t('Meeting link'),
        },
        {
          name: 'locationNotes',
          type: 'textarea',
          label: t('Meeting info'),
        },
      ]
  const formData = [
    {
      name: 'serviceRequested',
      type: 'select',
      label: t('Service Requested'),
      options: jobTypes ? jobTypes : [],
    },
    {
      name: 'jobServiceType',
      type: 'select',
      label: t('Service Type'),
      options: serviceTypes,
    },
    {
      name: 'jobServiceSubType',
      type: 'select',
      label: t('Service sub-type'),
      options: [],
    },
    {
      name: 'startDate',
      type: 'dayjs',
      label: t('Start Date'),
    },
    {
      name: 'endDate',
      type: 'dayjs',
      label: t('Ending Date'),
    },
    {
      name: 'timezone',
      type: 'select',
      label: t('Timezone'),
      options: timeZones
        ? timeZones?.map((el) => ({ text: el.timezoneName }))
        : [],
    },
    {
      name: 'startTime',
      type: 'time',
      label: t('Time'),
    },
    {
      name: 'endTime',
      type: 'time',
      label: t('End Time'),
    },
    {
      name: 'repeats',
      type: 'select',
      label: t('Repeats'),
      options: [
        { text: t('Does not repeat') },
        { text: t('Daily') },
        { text: t('Weekly') },
        { text: t('Monthly') },
      ],
    },
    {
      name: 'language',
      type: 'text',
      label: t('Language'),
    },
    {
      name: 'serviceFor',
      type: 'text',
      label: t('Service For'),
    },
    {
      name: 'attendees',
      type: 'inputList',
      label: t('Informed Parties'),
    },

    {
      name: 'requestNotes',
      type: 'text',
      label: t('Notes'),
    },
  ]
  return { formData, pocData, locationDetailsData }
}
