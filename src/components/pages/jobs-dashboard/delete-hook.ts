import { useDeleteJob } from '../../../hooks/jobs/useDeleteJob'
import { useDeleteJobActivity } from '../../../hooks/jobs/useDeleteJobActivity'
import React from 'react'
import { useJobActivities } from 'hooks/jobs/useJobActivities'

export interface IActivity {
  jobActivityId: number
  jobId: number
  requestTitle: string
  activityStartDate: string
  activityStartTime: string
  isWithinValidCancelEditHours: boolean
  hasProviders: boolean
  canEditDeleteActivity: boolean
  invalidHoursMesage: string | null
  hasProvidersMessage: null
  cancelEditSuccess: boolean
}

function deleteHook(activityId: number, jobId: number) {
  const [showCancelModal, setShowCancelModal] = React.useState(false)
  const [showJobNoticeModal, setShowJobNoticeModal] = React.useState(false)
  const [activityList, setActivityList] = React.useState<IActivity[] | null>(
    null,
  )
  const activities = useJobActivities()
  const {
    mutate: mutateJob,
    isLoading: isLoadingJob,
    data: jobData,
  } = useDeleteJob()
  const { mutate: mutateActivity, isLoading: isLoadingActivity } =
    useDeleteJobActivity()

  const deleteActivity = (id: string) => {
    mutateActivity(
      {
        id,
      },
      {
        onError: () => {
          window.alert(`error deleting activity job ${id}`)
        },
        onSuccess: () => {
          activities.refetch()
        },
      },
    )
  }

  const deleteJob = (id: string) => {
    mutateJob(
      {
        id,
      },
      {
        onError: () => {
          window.alert(`error deleting job ${id}`)
          setShowCancelModal(false)
        },
        onSuccess: (response) => {
          activities.refetch()
          setShowCancelModal(false)
          const undeletableActivities = response?.data?.filter(
            (el: IActivity) =>
              el?.hasProviders === true ||
              el?.isWithinValidCancelEditHours === false,
          )

          if (undeletableActivities?.length > 0) {
            setActivityList(undeletableActivities)
            setShowJobNoticeModal(true)
          }
        },
      },
    )
  }

  const handleCancel = (e: any) => {
    e.stopPropagation()
    setShowCancelModal(false)
  }

  const handleConfirm = (e: any) => {
    e.stopPropagation()
    deleteActivity(String(activityId))
    setShowCancelModal(false)
  }

  const handleSeries = (e: any) => {
    e.stopPropagation()
    deleteJob(String(jobId))
  }

  return {
    handleCancel,
    handleConfirm,
    handleSeries,
    showCancelModal,
    setShowCancelModal,
    showJobNoticeModal,
    setShowJobNoticeModal,
    activityList,
    setActivityList,
  }
}

export default deleteHook
