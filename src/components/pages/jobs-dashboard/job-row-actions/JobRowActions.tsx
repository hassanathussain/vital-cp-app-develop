import { IconButton } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import TrashIcon from 'shared/icons/TrashIcon'

import { FlexWrapper, FlexChildrenMargin } from './actions.styled'
import EditIcon from 'shared/icons/EditIcon'
import { t } from 'i18next'
import styled from 'styled-components'
import { JobViewProps } from '../../job-details/JobView'

import NewConfirmModal from 'shared/modals/NewConfirmModal'
import deleteHook, { IActivity } from '../delete-hook'
import { useJob } from 'hooks/jobs/useJob'
import { useDeleteJob } from 'hooks/jobs/useDeleteJob'
import { useJobActivities } from 'hooks/jobs/useJobActivities'

const OptionDiv = styled.div`
  padding: 10px;
  &:hover {
    background-color: #f2f2f2;
  }
`

interface IEditOptionsProps {
  showModal: Dispatch<SetStateAction<boolean>>
  setJobViewOpen?: Dispatch<SetStateAction<boolean>>
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
  jobId: number
  activityId: number
  setIsDetailView?: Dispatch<SetStateAction<boolean>>
  setIsEditMode?: Dispatch<SetStateAction<boolean>>
  canDeleteSeries: boolean
}

export const EditOptionsModal = (props: IEditOptionsProps) => {
  const {
    showModal,
    setJobViewInfo,
    setJobViewOpen,
    jobId,
    activityId,
    setIsDetailView,
    setIsEditMode,
    canDeleteSeries,
  } = props

  const handleElseWhereClick = (event: any) => {
    const concernedElement = document.querySelector(
      `#edit-activity-${activityId}`,
    )
    if (concernedElement?.contains(event?.target)) {
      document.removeEventListener('mousedown', handleElseWhereClick)
    } else {
      document.removeEventListener('mousedown', handleElseWhereClick)
      showModal(false)
    }
  }
  const jobDetails = useJob(jobId)

  document.addEventListener('mousedown', handleElseWhereClick)

  return (
    <div
      id={`edit-activity-${activityId}`}
      style={{
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'white',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        right: '100px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
      }}
    >
      <OptionDiv
        onClick={(e) => {
          e.stopPropagation()
          setJobViewOpen && setJobViewOpen(true)
          setJobViewInfo({
            jobId: jobId,
            activityId: activityId,
            viewMode: 'event',
            enterInEditMode: true,
            canEdit: true,
            canCancel: true,
          })
          setIsDetailView && setIsDetailView(true)
          setIsEditMode && setIsEditMode(true)
          showModal(false)
        }}
      >
        {t('Edit job')}
      </OptionDiv>

      {canDeleteSeries && (
        <OptionDiv
          onClick={(e) => {
            e.stopPropagation()
            setJobViewOpen && setJobViewOpen(true)
            setJobViewInfo({
              jobId: jobId,
              activityId: activityId,
              viewMode: 'series',
              enterInEditMode: true,
              canEdit: true,
              canCancel: true,
            })
            setIsDetailView && setIsDetailView(true)
            setIsEditMode && setIsEditMode(true)
            showModal(false)
          }}
        >
          {t('Edit series')}
        </OptionDiv>
      )}
    </div>
  )
}
interface IRowActionProps {
  jobId: number
  activityId: number
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
  setJobViewOpen?: Dispatch<SetStateAction<boolean>>
  isRecurring: boolean
  setIsDetailView?: Dispatch<SetStateAction<boolean>>
  setIsEditMode?: Dispatch<SetStateAction<boolean>>
  status: string
  canEdit: boolean
  canCancel: boolean
  setJobNotice: Dispatch<SetStateAction<boolean>>
  setActivityList: Dispatch<SetStateAction<IActivity[] | null>>
}

function JobRowActions(props: IRowActionProps) {
  const {
    setJobViewInfo,
    setJobViewOpen,
    jobId,
    activityId,
    isRecurring,
    setIsDetailView,
    setIsEditMode,
    status,
    canEdit,
    canCancel,
    setJobNotice,
    setActivityList,
  } = props
  const [showEditOptionsModal, setShowEditOptionsModal] = React.useState(false)

  const jobDetails = useJob(jobId)
  const canDeleteSeries = jobDetails?.data?.canEditJobSeries || false

  const { handleCancel, handleConfirm, setShowCancelModal, showCancelModal } =
    deleteHook(activityId, jobId)

  const {
    mutate: mutateJob,
    isLoading: isLoadingJob,
    data: jobData,
  } = useDeleteJob()

  const activities = useJobActivities()

  const deleteJob = (id: string) => {
    mutateJob(
      {
        id,
      },
      {
        onError: () => {
          window.alert(`error deleting job ${id}`)
        },
        onSuccess: (response) => {
          activities.refetch()
          const undeletableActivities = response?.data?.filter(
            (el: IActivity) =>
              el?.hasProviders === true ||
              el?.isWithinValidCancelEditHours === false,
          )

          if (undeletableActivities?.length > 0) {
            setActivityList(undeletableActivities)
            setJobNotice(true)
          }
        },
      },
    )
  }

  const handleSeries = (e: any) => {
    e.stopPropagation()
    deleteJob(String(jobId))
    setShowCancelModal(false)
  }

  return (
    <FlexWrapper>
      {canEdit && (
        <FlexChildrenMargin>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            id={`view-job-${activityId}`}
            onClick={(e) => {
              e.stopPropagation()
              if (isRecurring) setShowEditOptionsModal(true)
              else {
                setJobViewOpen && setJobViewOpen(true)
                setJobViewInfo({
                  jobId: jobId,
                  activityId: activityId,
                  viewMode: 'single',
                  enterInEditMode: true,
                  canEdit: true,
                  canCancel: true,
                })
                setIsDetailView && setIsDetailView(true)
                setIsEditMode && setIsEditMode(true)
              }
            }}
          >
            <EditIcon />
          </IconButton>
          {showEditOptionsModal && (
            <EditOptionsModal
              setIsEditMode={setIsEditMode}
              showModal={setShowEditOptionsModal}
              setJobViewInfo={setJobViewInfo}
              setIsDetailView={setIsDetailView}
              setJobViewOpen={setJobViewOpen}
              jobId={jobId}
              activityId={activityId}
              canDeleteSeries={canDeleteSeries}
            />
          )}
        </FlexChildrenMargin>
      )}
      {canCancel && (
        <FlexChildrenMargin>
          <IconButton
            edge="start"
            color="inherit"
            onClick={(e) => {
              e.stopPropagation()
              setShowCancelModal(true)
            }}
            aria-label="close"
            id={`cancel-job-${activityId}`}
          >
            <TrashIcon />
          </IconButton>

          <NewConfirmModal
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            showModal={showCancelModal}
            type="cancel"
            handleSeries={isRecurring ? handleSeries : undefined}
          />
        </FlexChildrenMargin>
      )}
    </FlexWrapper>
  )
}

export default JobRowActions
