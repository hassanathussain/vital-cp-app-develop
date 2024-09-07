import { t } from 'i18next'
import { ICardRowProps, IDataCard } from 'models/jobDashboard'
import { IOption } from 'shared/select/BasicSelect'
import { viewModes } from 'src/components/pages/job-details/JobView'

export const getFormData = (
  viewMode: viewModes,
  isEditMode: boolean,
  jobTypes: IOption[] | undefined,
  languages: IOption[] | undefined,
  serviceTypes: IOption[] | undefined,
  serviceSubTypes: IOption[] | undefined,
  timezones: IOption[] | undefined,
  vidoServiceOptions: IOption[] | undefined,
  stateOptions: IOption[] | undefined,
  countryOptions: IOption[] | undefined,
  isRemote: boolean,
  companyLocationsOptions: IOption[] | undefined,
) => {
  const getCanEdit = (field: string) => {
    switch (field) {
      case 'event':
        return isEditMode
      case 'series':
      case 'single':
        return (viewMode === 'series' || viewMode === 'single') && isEditMode
      default:
        return false
    }
  }

  const getSelectValue = (id: number, data: IOption[] | undefined) => {
    const selected = data?.find((option) => option?.value === id)
    return selected ? selected.text : ''
  }
  //TODO: update dataCard Rows to have new jobExtended data fields
  const dataCardRows: IDataCard[] = [
    {
      title: t('Request Details'),
      rows: [
        {
          label: t('Service Requested'),
          forms: [
            {
              name: 'requestedService',
              type: 'select',
              placeholder: 'Select Service',
              options: jobTypes ? jobTypes : [],
              selectValue: (id: number) => getSelectValue(id, jobTypes),
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: 'Request Title',
          forms: [
            {
              name: 'requestTitle',
              type: 'text',
              placeholder: 'Enter Request Title',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: 'Service For',
          forms: [
            {
              name: 'serviceFor',
              type: 'inputList',
              placeholder: 'Who are the services for?',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: 'Language',
          forms: [
            {
              name: 'language',
              type: 'select',
              placeholder: 'Select language',
              options: languages ? languages : [],
              selectValue: (id: number) => getSelectValue(id, languages),
              isEdit: false,
            },
          ],
        },
        {
          label: 'Service Type',
          forms: [
            {
              name: 'serviceType',
              type: 'select',
              placeholder: 'Select type',
              label: 'Service type',
              options: serviceTypes ? serviceTypes : [],
              selectValue: (id: number) => getSelectValue(id, serviceTypes),
              isEdit: getCanEdit('series'),
            },
            {
              name: 'serviceSubType',
              type: 'select',
              placeholder: 'Select Sub type',
              label: 'Service Sub type',
              options: serviceSubTypes ? serviceSubTypes : [],
              selectValue: (id: number) => getSelectValue(id, serviceSubTypes),
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: 'dynamic',
          forms: [
            {
              type: 'dynamicFields',
              isEdit: getCanEdit('series'),
              name: 'jobExtendedData',
            },
          ],
        },

        {
          label: 'Notes',
          forms: [
            {
              name: 'requestNotes',
              type: 'textarea',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: 'Provider(s)',
          forms: [
            {
              name: 'providers',
              type: 'inputListProviders',
              isEdit: false,
            },
          ],
        },
      ],
    },
    {
      title: t('Time'),
      rows: [
        {
          label: 'Timezone',
          forms: [
            {
              name: 'timezone',
              type: 'select',
              placeholder: 'Select timezone',
              options: timezones ? timezones : [],
              selectValue: (id: number) => getSelectValue(id, timezones),
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: 'Start date',
          forms: [
            {
              name: 'startDate',
              type: 'dayjs',
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: 'End date',
          forms: [
            {
              name: 'endDate',
              type: 'dayjs',
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: 'Time',
          forms: [
            {
              name: 'startTime',
              type: 'time',
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: 'Details',
          forms: [
            {
              name: 'recurrenceDetails',
              type: 'text',
              isEdit: false,
            },
          ],
        },
        {
          label: 'Repeats',
          forms: [
            {
              name: 'repeats',
              type: 'select',
              isEdit: getCanEdit('series'),
              options: [
                { text: t('Daily'), value: 1 },
                { text: t('Weekly'), value: 2 },
                { text: t('Monthly'), value: 3 },
              ],
            },
          ],
        },
        {
          label: 'Every',
          forms: [
            {
              name: 'interval',
              type: 'select',
              isEdit: getCanEdit('series'),
              options: [],
            },
          ],
        },
        {
          label: 'On',
          forms: [
            {
              name: 'dayOfWeek',
              type: 'dayOfWeek',
              isEdit: getCanEdit('series'),
            },
          ],
        },
      ],
    },
    {
      title: t('Location Details'),
      rows: !isRemote
        ? [
            {
              label: 'Address',
              forms: [
                {
                  name: 'locationId',
                  type: 'locationAutocomplete',
                  placeholder: 'Select',
                  options: companyLocationsOptions,
                  isEdit: getCanEdit('event'),
                  label: 'Location',
                  selectValue: (id: number) =>
                    getSelectValue(id, companyLocationsOptions),
                },
                {
                  label: 'Add new location',
                  name: 'isNewLocation',
                  type: 'checkbox',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: 'Address 1',
                  name: 'address1',
                  type: 'autocomplete',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: 'Address 2',
                  name: 'address2',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: 'City',
                  name: 'city',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  name: 'state',
                  type: 'select',
                  placeholder: 'State',
                  label: 'State',
                  options: stateOptions ? stateOptions : [],
                  selectValue: (id: number) => getSelectValue(id, stateOptions),
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  label: 'Postal code',
                  name: 'zipCode',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  name: 'country',
                  type: 'select',
                  placeholder: 'Country',
                  label: 'Country',
                  options: countryOptions ? countryOptions : [],
                  selectValue: (id: number) =>
                    getSelectValue(id, countryOptions),
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
              ],
            },
            {
              label: 'Meeting info',
              forms: [
                {
                  name: 'locationNotes',
                  type: 'textarea',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
          ]
        : [
            {
              label: 'Video service',
              forms: [
                {
                  type: 'select',
                  name: 'locationVideoServiceType',
                  isEdit: getCanEdit('event'),
                  options: vidoServiceOptions ? vidoServiceOptions : [],
                  selectValue: (id: number) =>
                    getSelectValue(id, vidoServiceOptions),
                },
              ],
            },
            {
              label: 'Meeting link',
              forms: [
                {
                  name: 'locationAssociatedURL',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
            {
              label: 'state',
              forms: [
                {
                  name: 'state',
                  type: 'select',
                  placeholder: 'State',
                  options: stateOptions ? stateOptions : [],
                  selectValue: (id: number) => getSelectValue(id, stateOptions),
                  isEdit: getCanEdit('event'),
                  disabled: false,
                },
              ],
            },
            {
              label: 'Meeting info',
              forms: [
                {
                  name: 'locationNotes',
                  type: 'textarea',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
          ],
    },
    {
      title: t('Point of Contact'),
      rows: [
        {
          label: t('Full name'),
          forms: [
            {
              name: 'pocFullName',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Preferred name'),
          forms: [
            {
              name: 'pocPrefName',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Email address'),
          forms: [
            {
              name: 'pocEmail',
              type: 'contactEmail',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Phone number'),
          forms: [
            {
              name: 'pocPhone',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: 'Informed',
          forms: [
            {
              name: 'attendees',
              type: 'attendeeList',
              isEdit: getCanEdit('series'),
            },
          ],
        },
      ],
    },
    {
      title: t('Documents'),
      rows: [
        {
          label: t('Documents'),
          forms: [
            {
              name: 'uploadedFile',
              type: 'file',
              isEdit: getCanEdit('event'),
            },
          ],
        },
      ],
    },
  ]
  const singleEventDataCardRows: IDataCard[] = [
    {
      title: t('Request Details'),
      rows: [
        {
          label: t('Service Requested'),
          forms: [
            {
              name: 'requestedService',
              type: 'select',
              placeholder: 'Select Service',
              options: jobTypes ? jobTypes : [],
              selectValue: (id: number) => getSelectValue(id, jobTypes),
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: t('Request Title'),
          forms: [
            {
              name: 'requestTitle',
              type: 'text',
              placeholder: 'Enter Request Title',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Service For'),
          forms: [
            {
              name: 'serviceFor',
              type: 'inputList',
              placeholder: 'Who are the services for?',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Language'),
          forms: [
            {
              name: 'language',
              type: 'select',
              placeholder: 'Select language',
              options: languages ? languages : [],
              selectValue: (id: number) => getSelectValue(id, languages),
              isEdit: false,
            },
          ],
        },
        {
          label: t('Service Type'),
          forms: [
            {
              name: 'serviceType',
              type: 'select',
              placeholder: t('Select type'),
              label: t('Service type'),
              options: serviceTypes ? serviceTypes : [],
              selectValue: (id: number) => getSelectValue(id, serviceTypes),
              isEdit: getCanEdit('series'),
            },
            {
              name: 'serviceSubType',
              type: 'select',
              placeholder: t('Select Sub type'),
              label: t('Service Sub type'),
              options: serviceSubTypes ? serviceSubTypes : [],
              selectValue: (id: number) => getSelectValue(id, serviceSubTypes),
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: 'dynamic',
          forms: [
            {
              type: 'dynamicFields',
              isEdit: getCanEdit('series'),
              name: 'jobExtendedData',
            },
          ],
        },
        {
          label: t('Notes'),
          forms: [
            {
              name: 'requestNotes',
              type: 'textarea',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Provider(s)'),
          forms: [
            {
              name: 'providers',
              type: 'inputListProviders',
              isEdit: false,
            },
          ],
        },
      ],
    },
    {
      title: t('Time'),
      rows: [
        {
          label: t('Timezone'),
          forms: [
            {
              name: 'timezone',
              type: 'select',
              placeholder: t('Select timezone'),
              options: timezones ? timezones : [],
              selectValue: (id: number) => getSelectValue(id, timezones),
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Appointment date'),
          forms: [
            {
              name: 'startDate',
              type: 'dayjs',
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: t('End date'),
          forms: [
            {
              name: 'endDate',
              type: 'dayjs',
              isEdit: getCanEdit('event'),
            },
          ],
        },

        {
          label: t('Time'),
          forms: [
            {
              name: 'startTime',
              type: 'time',
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: t('Details'),
          forms: [
            {
              name: 'recurrenceDetails',
              type: 'text',
              isEdit: false,
            },
          ],
        },
        {
          label: t('Repeats'),
          forms: [
            {
              name: 'repeats',
              type: 'select',
              isEdit: getCanEdit('series'),
              options: [
                { text: t('Does not repeat'), value: 0 },
                { text: t('Daily'), value: 1 },
                { text: t('Weekly'), value: 2 },
                { text: t('Monthly'), value: 3 },
              ],
            },
          ],
        },
        {
          label: t('Every'),
          forms: [
            {
              name: 'interval',
              type: 'select',
              isEdit: getCanEdit('series'),
              options: [],
            },
          ],
        },
        {
          label: t('On'),
          forms: [
            {
              name: 'dayOfWeek',
              type: 'dayOfWeek',
              isEdit: getCanEdit('series'),
            },
          ],
        },
      ],
    },
    {
      title: t('Location Details'),

      rows: !isRemote
        ? [
            {
              label: t('Address'),
              forms: [
                {
                  name: 'locationId',
                  type: 'locationAutocomplete',
                  placeholder: 'Select',
                  options: companyLocationsOptions,
                  selectValue: (id: number) =>
                    getSelectValue(id, companyLocationsOptions),
                  isEdit: getCanEdit('event'),
                  label: t('Location'),
                },
                {
                  label: t('Add new location'),
                  name: 'isNewLocation',
                  type: 'checkbox',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: t('Street name, city, state, and postalcode'),
                  name: 'address1',
                  type: 'autocomplete',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: t('Address 2'),
                  name: 'address2',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: t('City'),
                  name: 'city',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  name: 'state',
                  type: 'select',
                  placeholder: 'State',
                  label: t('State'),
                  options: stateOptions ? stateOptions : [],
                  selectValue: (id: number) => getSelectValue(id, stateOptions),
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  label: t('Postal code'),
                  name: 'zipCode',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  name: 'country',
                  type: 'select',
                  placeholder: 'Country',
                  label: t('Country'),
                  options: countryOptions ? countryOptions : [],
                  selectValue: (id: number) =>
                    getSelectValue(id, countryOptions),
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
              ],
            },
            {
              label: t('Meeting info'),
              forms: [
                {
                  name: 'locationNotes',
                  type: 'textarea',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
          ]
        : [
            {
              label: t('Video service'),
              forms: [
                {
                  type: 'select',
                  name: 'locationVideoServiceType',
                  isEdit: getCanEdit('event'),
                  options: vidoServiceOptions ? vidoServiceOptions : [],
                  selectValue: (id: number) =>
                    getSelectValue(id, vidoServiceOptions),
                },
              ],
            },

            {
              label: t('Meeting link'),
              forms: [
                {
                  name: 'locationAssociatedURL',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
            {
              label: t('State'),
              forms: [
                {
                  name: 'state',
                  type: 'select',
                  placeholder: 'State',
                  options: stateOptions ? stateOptions : [],
                  selectValue: (id: number) => getSelectValue(id, stateOptions),
                  isEdit: getCanEdit('event'),
                  disabled: false,
                },
              ],
            },
            {
              label: t('Meeting info'),
              forms: [
                {
                  name: 'locationNotes',
                  type: 'textarea',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
          ],
    },
    {
      title: t('Point of Contact'),
      rows: [
        {
          label: t('Full name'),
          forms: [
            {
              name: 'pocFullName',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Preferred name'),
          forms: [
            {
              name: 'pocPrefName',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Email address'),
          forms: [
            {
              name: 'pocEmail',
              type: 'contactEmail',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Phone number'),
          forms: [
            {
              name: 'pocPhone',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Informed'),
          forms: [
            {
              name: 'attendees',
              type: 'attendeeList',
              isEdit: getCanEdit('series'),
            },
          ],
        },
      ],
    },
    {
      title: t('Documents'),
      rows: [
        {
          label: t('Documents'),
          forms: [
            {
              name: 'uploadedFile',
              type: 'file',
              isEdit: getCanEdit('event'),
            },
          ],
        },
      ],
    },
  ]
  const eventDataCardRows: IDataCard[] = [
    {
      title: t('Request Details'),
      rows: [
        {
          label: t('Service Requested'),
          forms: [
            {
              name: 'requestedService',
              type: 'select',
              placeholder: 'Select Service',
              options: jobTypes ? jobTypes : [],
              selectValue: (id: number) => getSelectValue(id, jobTypes),
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: t('Request Title'),
          forms: [
            {
              name: 'requestTitle',
              type: 'text',
              placeholder: 'Enter Request Title',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Service For'),
          forms: [
            {
              name: 'serviceFor',
              type: 'inputList',
              placeholder: 'Who are the services for?',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Language'),
          forms: [
            {
              name: 'language',
              type: 'select',
              placeholder: t('Select language'),
              options: languages ? languages : [],
              selectValue: (id: number) => getSelectValue(id, languages),
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: t('Service Type'),
          forms: [
            {
              name: 'serviceType',
              type: 'select',
              placeholder: t('Select type'),
              label: t('Service type'),
              options: serviceTypes ? serviceTypes : [],
              selectValue: (id: number) => getSelectValue(id, serviceTypes),
              isEdit: getCanEdit('series'),
            },
            {
              name: 'serviceSubType',
              type: 'select',
              placeholder: t('Select Sub type'),
              label: t('Service Sub type'),
              options: serviceSubTypes ? serviceSubTypes : [],
              selectValue: (id: number) => getSelectValue(id, serviceSubTypes),
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('dynamic'),
          forms: [
            {
              type: 'dynamicFields',
              isEdit: getCanEdit('series'),
              name: 'jobExtendedData',
            },
          ],
        },
        {
          label: t('Notes'),
          forms: [
            {
              name: 'requestNotes',
              type: 'textarea',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Provider(s)'),
          forms: [
            {
              name: 'providers',
              type: 'inputListProviders',
              isEdit: false,
            },
          ],
        },
      ],
    },
    {
      title: t('Time'),
      rows: [
        {
          label: t('Timezone'),
          forms: [
            {
              name: 'timezone',
              type: 'select',
              placeholder: t('Select timezone'),
              options: timezones ? timezones : [],
              selectValue: (id: number) => getSelectValue(id, timezones),
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Appointment Date'),
          forms: [
            {
              name: 'startDate',
              type: 'dayjs',
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: t('Time'),
          forms: [
            {
              name: 'startTime',
              type: 'time',
              isEdit: getCanEdit('event'),
            },
          ],
        },
        {
          label: t('Details'),
          forms: [
            {
              name: 'recurrenceDetails',
              type: 'text',
              isEdit: false,
            },
          ],
        },
      ],
    },
    {
      title: t('Location Details'),

      rows: !isRemote
        ? [
            {
              label: t('Address'),
              forms: [
                {
                  name: 'locationId',
                  type: 'locationAutocomplete',
                  placeholder: t('Select'),
                  options: companyLocationsOptions,
                  selectValue: (id: number) =>
                    getSelectValue(id, companyLocationsOptions),
                  isEdit: getCanEdit('event'),
                  label: t('Location'),
                },
                {
                  label: t('Add new location'),
                  name: 'isNewLocation',
                  type: 'checkbox',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: t('Street name, city, state, and postalcode'),
                  name: 'address1',
                  type: 'autocomplete',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: t('Address 2'),
                  name: 'address2',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                },
                {
                  label: t('City'),
                  name: 'city',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  name: 'state',
                  type: 'select',
                  placeholder: t('State'),
                  label: t('State'),
                  options: stateOptions ? stateOptions : [],
                  selectValue: (id: number) => getSelectValue(id, stateOptions),
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  label: t('Postal code'),
                  name: 'zipCode',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
                {
                  name: 'country',
                  type: 'select',
                  placeholder: t('Country'),
                  label: t('Country'),
                  options: countryOptions ? countryOptions : [],
                  selectValue: (id: number) =>
                    getSelectValue(id, countryOptions),
                  isEdit: getCanEdit('event'),
                  disabled: true,
                },
              ],
            },
            {
              label: isRemote ? t('Meeting info') : t('Location info'),
              forms: [
                {
                  name: 'locationNotes',
                  type: 'textarea',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
          ]
        : [
            {
              label: t('Video service'),
              forms: [
                {
                  type: 'select',
                  name: 'locationVideoServiceType',
                  isEdit: getCanEdit('event'),
                  options: vidoServiceOptions ? vidoServiceOptions : [],
                  selectValue: (id: number) =>
                    getSelectValue(id, vidoServiceOptions),
                },
              ],
            },
            {
              label: t('Meeting link'),
              forms: [
                {
                  name: 'locationAssociatedURL',
                  type: 'text',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
            {
              label: t('State'),
              forms: [
                {
                  name: 'state',
                  type: 'select',
                  placeholder: 'State',
                  options: stateOptions ? stateOptions : [],
                  selectValue: (id: number) => getSelectValue(id, stateOptions),
                  isEdit: getCanEdit('event'),
                  disabled: false,
                },
              ],
            },
            {
              label: t('Meeting info'),
              forms: [
                {
                  name: 'locationNotes',
                  type: 'textarea',
                  isEdit: getCanEdit('event'),
                },
              ],
            },
          ],
    },
    {
      title: t('Point of Contact'),
      rows: [
        {
          label: t('Full name'),
          forms: [
            {
              name: 'pocFullName',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Preferred name'),
          forms: [
            {
              name: 'pocPrefName',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Email address'),
          forms: [
            {
              name: 'pocEmail',
              type: 'contactEmail',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Phone number'),
          forms: [
            {
              name: 'pocPhone',
              type: 'text',
              isEdit: getCanEdit('series'),
            },
          ],
        },
        {
          label: t('Informed'),
          forms: [
            {
              name: 'attendees',
              type: 'attendeeList',
              isEdit: getCanEdit('series'),
            },
          ],
        },
      ],
    },
    {
      title: t('Documents'),
      rows: [
        {
          label: t('Documents'),
          forms: [
            {
              name: 'uploadedFile',
              type: 'file',
              isEdit: getCanEdit('event'),
            },
          ],
        },
      ],
    },
  ]
  return { dataCardRows, eventDataCardRows, singleEventDataCardRows }
}
