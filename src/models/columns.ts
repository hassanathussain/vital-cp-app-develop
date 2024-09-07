export interface Column {
  id: string
  label: string
  align?: 'right'
}

export const columns: Column[] = [
  { id: 'requestTitle', label: 'Request Title' },
  { id: 'status', label: 'Status' },
  {
    id: 'type',
    label: 'Type',
  },
  {
    id: 'requestDate',
    label: 'Request Date',
  },
  {
    id: 'startTime',
    label: 'Start Time',
  },
  {
    id: 'endTime',
    label: 'End Time',
  },
  {
    id: 'requestedFor',
    label: 'Request For',
  },
  {
    id: 'serviceProvider',
    label: 'Service Provider',
  },
  {
    id: 'actions',
    label: '',
  },
]
