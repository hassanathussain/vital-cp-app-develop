import { IconButton } from '@mui/material'
import { useFormikContext } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import React, { Dispatch, useState } from 'react'
import Button from 'shared/button'
import XIcon from 'shared/icons/XIcon'
import styled from 'styled-components'
import { EditOptionsModal } from '../jobs-dashboard/job-row-actions/JobRowActions'
import { JobViewProps } from './JobView'
import { useJobActivity } from 'hooks/jobs/useJobActivity'
import { t } from 'i18next'
import dayjs, { Dayjs } from 'dayjs'
import { openSupportForm } from '../../navbar/index'
interface IFooterProps {
  canEdit: boolean
  canDelete: boolean
  isEditMode: boolean
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
  setShowCancelModal: Dispatch<React.SetStateAction<boolean>>
  setShowUnsavedModal: Dispatch<React.SetStateAction<boolean>>
  setJobViewInfo: Dispatch<React.SetStateAction<JobViewProps | null>>
  setIsDetailView: Dispatch<React.SetStateAction<boolean>>
  setJobViewOpen: Dispatch<React.SetStateAction<boolean>>
  jobId: number
  activityId: number
  canDeleteSeries: boolean
  isRecurring: boolean
  haveExDatesBeenChanged: boolean
}
const ViewFooterDiv = styled.div<{
  isEditMode: boolean
}>`
  display: flex;
  justify-content: ${({ isEditMode }) =>
    isEditMode ? 'flex-end' : 'space-between'};
  align-items: center;
  gap: 24px;
  border-top: 1px solid rgba(4, 8, 9, 0.08);
  position: fixed;
  bottom: 0;
  width: 536px;
  padding: 24px 00px;
  background-color: #fafafa;
`
const JobViewFooter = (props: IFooterProps) => {
  const {
    canEdit,
    canDelete,
    isEditMode,
    setIsEditMode,
    setShowCancelModal,
    setShowUnsavedModal,
    setJobViewInfo,
    setIsDetailView,
    setJobViewOpen,
    jobId,
    activityId,
    canDeleteSeries,
    isRecurring,
    haveExDatesBeenChanged,
  } = props
  const [showEditOptionsModal, setShowEditOptionsModal] = React.useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)

  const { dirty, isSubmitting, handleSubmit, errors } = useFormikContext()

  const activityDetails = useJobActivity(activityId)
  const handleCancel = () => {
    if (dirty) {
      setShowUnsavedModal(true)
    } else setIsEditMode(false)
  }
  const disableSave = () => {
    if (isSubmitting || Object.keys(errors).length) {
      return true
    } else {
      if (!dirty) {
        if (!haveExDatesBeenChanged) {
          return true
        }
      }
      return false
    }
  }
  const printTimeMessege = () => {
    if (activityDetails.data && activityDetails.data?.startDate < dayjs()) {
      return t(
        'Sorry, but it is not possible to modify this job because it has already occurred',
      )
    } else {
      return t(
        'Sorry, but it is not possible to modify this job as it is scheduled to commence in under 48 hours',
      )
    }
  }
  return (
    <>
      <AnimatePresence>
        {showMessageModal && (
          <motion.div
            style={{
              position: 'fixed',
              width: '500px',
              backgroundColor: ' rgba(4, 8, 9, 0.88)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '20px',
              gap: '16px',
              isolation: 'isolate',
              right: '36px',
              bottom: '200px',
              borderRadius: '8px',
            }}
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                {activityDetails?.data?.hasProviders
                  ? 'Sorry, but it is not possible to cancel or edit this job as it has assigned providers'
                  : printTimeMessege()}
              </span>
              <IconButton onClick={() => setShowMessageModal(false)}>
                <XIcon height="20px" width="20px" fill="white" />
              </IconButton>
            </div>
            <ContactButton onClick={openSupportForm}>
              {t('Contact Support')}
            </ContactButton>
          </motion.div>
        )}
      </AnimatePresence>
      <ViewFooterDiv isEditMode={isEditMode}>
        {isEditMode && (
          <>
            <Button onClick={handleCancel} variant="nobg" type="button">
              {t('Cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={disableSave()}
              onClick={handleSubmit}
            >
              {isSubmitting ? t('Saving...') : t('Save')}
            </Button>
          </>
        )}
        {!isEditMode && (
          <>
            <Button
              onClick={
                canDelete
                  ? setShowCancelModal
                  : () => {
                      setShowMessageModal(true)
                      setTimeout(() => {
                        setShowMessageModal(false)
                      }, 5000)
                    }
              }
              variant={canDelete ? 'clear' : 'grey'}
              type="button"
            >
              {t('Cancel Request')}
            </Button>
            <Button
              type="button"
              variant={canEdit ? undefined : 'grey'}
              onClick={() => {
                if (isRecurring) {
                  // setShowEditOptionsModal(true)
                  if (canEdit) {
                    setShowEditOptionsModal(true)
                  } else {
                    setShowMessageModal(true)
                    setTimeout(() => {
                      setShowMessageModal(false)
                    }, 5000)
                  }
                } else {
                  if (canEdit) {
                    // setShowEditOptionsModal(true)
                    setJobViewOpen && setJobViewOpen(true)
                    setIsEditMode(true)
                    setJobViewInfo({
                      jobId: jobId,
                      activityId: activityId,
                      viewMode: 'single',
                      enterInEditMode: true,
                      canEdit: true,
                      canCancel: true,
                    })
                  } else {
                    setShowMessageModal(true)
                    setTimeout(() => {
                      setShowMessageModal(false)
                    }, 5000)
                  }
                }
              }}
            >
              {t('Edit')}
            </Button>
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
          </>
        )}
      </ViewFooterDiv>
    </>
  )
}
export default JobViewFooter

const ContactButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 32px;
  gap: 8px;
  color: #ffffff;
  width: 496px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.21);
  border-radius: 6px;
  background-color: transparent;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`
