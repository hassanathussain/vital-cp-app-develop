import { t } from 'i18next'

import { Column } from 'models/columns'
export const columns: Column[] = [
  { id: 'requestTitle', label: t('Request Title') },
  { id: 'activityStatus', label: t('Status') },
  {
    id: 'serviceRequestType',
    label: t('Type'),
  },
  {
    id: 'activityStartDate',
    label: t('Appointment Date'),
  },
  {
    id: 'activityStartTime',
    label: t('Start Time'),
  },
  {
    id: 'activityEndTime',
    label: t('End Time'),
  },
  {
    id: 'consumerName',
    label: t('Request For'),
  },
  {
    id: 'activityServiceProvider',
    label: t('Service Provider'),
  },
  {
    id: 'actions',
    label: '',
  },
]

export const getFilters = (statusOptions: string[], jobTypes: string[]) => {
  return [
    {
      name: t('Time Period'),
      options: [
        t('Next 7 days'),
        t('Last 7 days'),
        t('Next 30 days'),
        t('Last 30 days'),
        t('Last Quarter'),
        t('Last Year'),
      ],
      isMultiSelect: false,
      id: 1,
      customDate: true,
    },
    {
      name: t('Status'),
      options: statusOptions,
      isMultiSelect: true,
      id: 2,
    },
    {
      name: t('Type'),
      options: jobTypes,
      isMultiSelect: true,
      id: 3,
    },
  ]
}
