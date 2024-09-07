import { IconButton, Tooltip } from '@mui/material'
import { IUploadedFile } from 'models/jobDashboard'
import React, { useState } from 'react'
import TrashIcon from 'shared/icons/TrashIcon'
import FileInput from './FileInput'
import { useMutation } from 'react-query'
import { useDeleteFileFromJob } from 'hooks/jobs/files/useDeleteFileFromJob'
import { useJobActivity } from 'hooks/jobs/useJobActivity'
import { t } from 'i18next'
import { useFormikContext } from 'formik'
import AddIcon from 'shared/icons/AddIcon'
import CancelIcon from 'shared/icons/CancelIcon'
import { getLocaleDateString } from '../../../internationalization/getLocaleDateString'
import { IFile } from 'src/components/pages/new-request/step1/Step1'

type Props = {
  value: IUploadedFile[]
  jobId: number
  activityId: number
  isSeriesEdit: boolean
}

export default function UploadedFiles({
  value,
  jobId,
  activityId,
  isSeriesEdit,
}: Props) {
  const activityDetails = useJobActivity(activityId)
  const formattedStartDate = getLocaleDateString(
    activityDetails?.data?.startDate.toDate() || new Date(),
  )
  const formik = useFormikContext()
  const { values } = useFormikContext<{
    filesToDelete: IUploadedFile[]
  }>()
  const [files, setFiles] = useState<IFile[]>([])

  const handleDelete = async (file: IUploadedFile) => {
    if (!values.filesToDelete.some((el) => el.id === file.id)) {
      formik.setFieldValue('filesToDelete', [...values.filesToDelete, file])
    } else {
      formik.setFieldValue(
        'filesToDelete',
        values.filesToDelete.filter((el) => el.id !== file.id),
      )
    }
  }

  const seriesLevelJobs = value.filter((file) => file.owner === 'JOB')
  const activityLevelJobs = value.filter(
    (file) => file.owner === 'JOB_ACTIVITY',
  )
  const isStagedToDelete = (file: IUploadedFile) => {
    return values.filesToDelete.some((el) => el.id === file.id)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {value.length === 0 && <span> {t('No files for job')}</span>}
      {seriesLevelJobs.length > 0 && (
        <>
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            {t('Documents for job series')}
          </span>
          {seriesLevelJobs.map((file, i) => {
            const isStaged = isStagedToDelete(file)
            return (
              <div
                key={i}
                id={file.id}
                style={{
                  color: isStaged ? 'red' : 'black',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                }}
              >
                {isSeriesEdit && (
                  <Tooltip title={isStaged ? t('cancel') : t('delete file')}>
                    <IconButton onClick={() => handleDelete(file)}>
                      {isStaged ? <CancelIcon /> : <TrashIcon />}
                    </IconButton>
                  </Tooltip>
                )}
                <span
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {`${file.name.slice(0, 25)}${
                    file.name.length > 25 ? '...' : ''
                  }`}
                </span>
              </div>
            )
          })}
        </>
      )}
      {activityLevelJobs.length > 0 && (
        <>
          <span
            style={{
              fontWeight: 'bold',
            }}
          >{`${t('Documents for')}  ${formattedStartDate}`}</span>
          {activityLevelJobs.map((file, i) => {
            const isStaged = isStagedToDelete(file)
            return (
              <div
                key={i}
                id={file.id}
                style={{
                  color: isStaged ? 'red' : 'black',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                }}
              >
                <Tooltip title={isStaged ? t('cancel') : t('delete file')}>
                  <IconButton onClick={() => handleDelete(file)}>
                    {isStaged ? <CancelIcon /> : <TrashIcon />}
                  </IconButton>
                </Tooltip>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {`${file.name.slice(0, 25)}${
                    file.name.length > 25 ? '...' : ''
                  }`}
                </span>
              </div>
            )
          })}
        </>
      )}
      <FileInput files={files} setFiles={setFiles} />
    </div>
  )
}
