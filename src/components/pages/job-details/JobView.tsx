import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SlideDiv } from './jobDetails.styled'
import Backdrop from './Backdrop'
import { useJobActivity } from 'hooks/jobs/useJobActivity'
import { useJob } from 'hooks/jobs/useJob'

import JobViewFooter from './JobViewFooter'

import JobViewHeader from './JobViewHeader'

import NewConfirmModal from 'shared/modals/NewConfirmModal'
import deleteHook from '../jobs-dashboard/delete-hook'
import JobDetailsForm from './JobDetailsForm'
import ScheduleViewTable from './ScheduleViewTable'
import dayjs from 'dayjs'
import { JobSchedule } from 'shared/tables/SchedulesTable'
import { IActivity } from '../jobs-dashboard/delete-hook'
import { useDeleteJob } from 'hooks/jobs/useDeleteJob'
import { useJobActivities } from 'hooks/jobs/useJobActivities'
import PageLoader from 'shared/page-loader'
// these are the view modes for the job view
// the series is for repeating schedules. event is for a single schedule
// and single is for a single schedule that is not repeating
export type viewModes = 'series' | 'event' | 'single'

export interface JobViewProps {
  jobId: number
  activityId: number | undefined
  viewMode: viewModes
  enterInEditMode: boolean
  canEdit: boolean
  canCancel: boolean
}

interface JobView {
  jobId: number
  activityId: number | undefined
  viewMode: viewModes
  enterInEditMode: boolean
  canEdit: boolean
  canCancel: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
  setJobNotice: Dispatch<SetStateAction<boolean>>
  setActivityList: Dispatch<SetStateAction<IActivity[] | null>>
}

export interface IjobActivitySchedules {
  jobActId: number
  startDate: string
  endDate: string
  status: string
  serviceProvider: string[]
}

function JobView(props: JobView) {
  const {
    jobId,
    activityId,
    viewMode,
    enterInEditMode,
    canEdit,
    canCancel,
    setIsOpen,
    setJobViewInfo,
    setActivityList,
    setJobNotice,
  } = props

  const [isEditMode, setIsEditMode] = useState(canEdit && enterInEditMode)
  const [isDetailView, setIsDetailView] = useState(true)
  const [isFormDirty, setIsFormDirty] = useState(false)
  const [showUnsavedModal, setShowUnsavedModal] = React.useState(false)
  const [haveExDatesBeenChanged, setHaveExDatesBeenChanged] = useState(false)
  const handleClose = () => {
    if (isFormDirty && isEditMode) {
      setShowUnsavedModal(true)
    } else {
      // check to see if edites have been made. If that is the case show the confirm close modal here
      window.onscroll = () => {}
      setIsOpen(false)
    }
  }

  //query for job activity and Job level information.
  const jobDetails = useJob(jobId)

  if (!activityId) {
    if (
      jobDetails?.data?.jobActivitySchedules &&
      jobDetails.data.jobActivitySchedules.length > 0
    ) {
      const newActivityId = jobDetails?.data?.jobActivitySchedules[0]?.jobActId
      setJobViewInfo({
        jobId,
        activityId: newActivityId,
        canCancel: canCancel,
        canEdit: canEdit,
        viewMode: 'event',
        enterInEditMode: false,
      })
    }
  }
  const activityDetails = useJobActivity(activityId)

  const auditEditMode = () => {
    if (
      jobDetails.data?.canEditJobSeries &&
      activityDetails?.data?.canEditDeleteActivity
    ) {
      if (!canEdit) {
        setJobViewInfo((i: any) => {
          return {
            ...i,
            canEdit: true,
            canCancel: true,
          }
        })
      }
    } else if (
      activityDetails.data?.canEditDeleteActivity &&
      !jobDetails.data?.canEditJobSeries
    ) {
      if (!canEdit) {
        setJobViewInfo((i: any) => {
          return {
            ...i,
            canEdit: true,
            canCancel: true,
          }
        })
      }
    } else {
      setJobViewInfo((i: any) => {
        return {
          ...i,
          jobId: i?.jobId ? i.jobId : 0,
          activityId: i?.activityId ? i.activityId : undefined,
          canEdit: false,
          canCancel: false,
        }
      })
    }
  }
  useEffect(() => {
    auditEditMode()
  }, [jobDetails.data, activityDetails.data])
  //TODO:this needs to be updated to check is only one activity has been created.
  //or we need to make sure occurence is alwaus null on job requests.
  const isRecurring = jobDetails?.data?.occurrence === null ? false : true

  interface ISchedule {
    status: string
    jobId: number
    activityId: number
    serviceProviders: string[]
    startDate: string
  }

  const schedules: JobSchedule[] =
    jobDetails?.data?.jobActivitySchedules?.map((elem) => {
      return {
        status: elem?.status,
        jobId: jobDetails?.data?.id,
        activityId: elem?.jobActId,
        serviceProvider: elem?.serviceProviders,
        canEditDeleteActivity: elem?.canEditDeleteActivity,
        startDate: dayjs(elem?.startDate)?.format('MMM D, YYYY'),
      }
    }) || []

  const { handleCancel, handleConfirm, setShowCancelModal, showCancelModal } =
    deleteHook(activityId || -1, jobId)

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
            handleClose()
          }
        },
      },
    )
  }

  const handleSeries = (e: any) => {
    e.stopPropagation()
    deleteJob(String(jobId))
  }
  if (!activityId)
    return (
      <Backdrop
        onClick={(e: any) => {
          handleClose()
          handleCancel(e)
        }}
      >
        <SlideDiv
          mounted={true}
          className={'details-modal'}
          onClick={(e) => e.stopPropagation()}
        >
          <PageLoader />
        </SlideDiv>
      </Backdrop>
    )
  const isDetailsOpen = true
  return (
    <Backdrop
      onClick={(e: any) => {
        handleClose()
        handleCancel(e)
      }}
    >
      <SlideDiv
        mounted={isDetailsOpen}
        className={'details-modal'}
        onClick={(e) => e.stopPropagation()}
      >
        <>
          {jobDetails?.data && activityDetails?.data && (
            <>
              <JobViewHeader
                id={`#${activityDetails?.data?.jobActivityDisplayId}`}
                requestCreatedDate={jobDetails?.data?.requestedCreatedDate}
                handleClose={() => {
                  handleClose()
                }}
                requestTitle={jobDetails?.data?.requestTitle}
                isDetailView={isDetailView}
                setIsDetailView={setIsDetailView}
                requestedByName={jobDetails?.data?.requestedByName}
                status={activityDetails?.data?.status}
              />
              <div
                style={{
                  paddingBottom: '100px',
                }}
              >
                {isDetailView && (
                  <div
                    style={{
                      paddingBottom: '150px',
                    }}
                  >
                    <JobDetailsForm
                      viewMode={viewMode}
                      isEditMode={isEditMode}
                      setIsEditMode={setIsEditMode}
                      jobId={jobId}
                      setHaveExDatesBeenChanged={setHaveExDatesBeenChanged}
                      activityId={activityId}
                      setIsFormDirty={setIsFormDirty}
                      handleClose={setIsOpen}
                      setJobViewInfo={setJobViewInfo}
                    >
                      <JobViewFooter
                        isRecurring={isRecurring}
                        canDelete={canCancel}
                        canEdit={canEdit}
                        haveExDatesBeenChanged={haveExDatesBeenChanged}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        setShowCancelModal={setShowCancelModal}
                        setShowUnsavedModal={setShowUnsavedModal}
                        setJobViewInfo={setJobViewInfo}
                        setIsDetailView={setIsDetailView}
                        jobId={jobId}
                        activityId={activityId}
                        setJobViewOpen={() => {}}
                        canDeleteSeries={
                          jobDetails?.data?.canEditJobSeries || false
                        }
                      />
                    </JobDetailsForm>
                  </div>
                )}
                {!isDetailView && (
                  <div
                    style={{
                      paddingBottom: '200px',
                    }}
                  >
                    <ScheduleViewTable
                      setIsEditMode={setIsEditMode}
                      setIsDetailView={setIsDetailView}
                      schedules={schedules}
                      setJobViewInfo={setJobViewInfo}
                      setActivityList={setActivityList}
                      setJobNotice={setJobNotice}
                    />
                  </div>
                )}
              </div>
              <NewConfirmModal
                handleCancel={handleCancel}
                handleConfirm={handleConfirm}
                showModal={showCancelModal}
                type="cancel"
                handleSeries={
                  jobDetails?.data?.jobActivitySchedules.length > 1
                    ? handleSeries
                    : undefined
                }
              />
              <NewConfirmModal
                handleCancel={(e) => {
                  setShowUnsavedModal(false)
                }}
                handleConfirm={(e) => {
                  setIsOpen(false)
                  window.onscroll = () => {}
                }}
                showModal={showUnsavedModal}
                type="unsaved"
                viewMode={viewMode}
              />
            </>
          )}
        </>
      </SlideDiv>
    </Backdrop>
  )
}

export default JobView
