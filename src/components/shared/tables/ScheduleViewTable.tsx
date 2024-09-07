import React from 'react'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import EyeIcon from '../icons/EyeIcon'
import TrashIcon from '../icons/TrashIcon'
import DefaultTable from './DefaultTable'

import { Column } from 'models/columns'
import { useTranslation } from 'react-i18next'

function ScheduleViewTable(props: any) {
  const { t } = useTranslation()
  const { schedules } = props
  const navigate = useNavigate()

  const columns: Column[] = [
    {
      id: 'requestDate',
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

  function toggleEditModal(id: string | number) {
    navigate(`/view/${id}`)
  }
  function JobRowActions(id: string | number) {
    const handleCancelJob = (e: any) => {
      e.stopPropagation()
      navigate(`/cancel/${id}`)
    }

    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => toggleEditModal(id)}
          aria-label="close"
        >
          <EyeIcon />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleCancelJob}
          aria-label="close"
        >
          <TrashIcon />
        </IconButton>
      </div>
    )
  }
  return (
    <div>table here</div>
    // <DefaultTable
    //   // onRowClick={() => window.alert('handle row click')}
    //   rowData={schedules}
    //   columnData={columns}

    //   // cancelControl={{}} // need to update models
    //   // trackCancel={{}}  // need to update models
    // />
  )
}

export default ScheduleViewTable
