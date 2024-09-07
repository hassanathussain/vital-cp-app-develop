import React, { Dispatch, SetStateAction } from 'react'
import { Column } from 'models/columns'
import { useTranslation } from 'react-i18next'

import SchedulesTable, { JobSchedule } from 'shared/tables/SchedulesTable'
import { JobViewProps } from './JobView'
import { IActivity } from '../jobs-dashboard/delete-hook'

interface IScheduleTableProps {
  schedules: JobSchedule[]
  setIsDetailView: Dispatch<SetStateAction<boolean>>
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  setJobNotice: Dispatch<SetStateAction<boolean>>
  setActivityList: Dispatch<SetStateAction<IActivity[] | null>>
}
function ScheduleViewTable(props: IScheduleTableProps) {
  const { t } = useTranslation()
  const {
    schedules,
    setJobViewInfo,
    setIsDetailView,
    setIsEditMode,
    setActivityList,
    setJobNotice,
  } = props

  const columns: Column[] = [
    {
      id: 'startDate',
      label: t('Appointment Date'),
    },
    { id: 'status', label: t('Status') },
    {
      id: 'serviceProvider',
      label: t('Service Provider'),
    },
    {
      id: 'actions',
      label: '',
    },
  ]

  return (
    <>
      <SchedulesTable
        setIsEditMode={setIsEditMode}
        rowData={schedules}
        columnData={columns}
        setJobViewInfo={setJobViewInfo}
        setIsDetailView={setIsDetailView}
        setActivityList={setActivityList}
        setJobNotice={setJobNotice}
      />
    </>
  )
}

export default ScheduleViewTable
