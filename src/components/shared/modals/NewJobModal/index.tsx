import IconButton from '@mui/material/IconButton'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import React, { Dispatch } from 'react'
import Button from 'shared/button'
import XIcon from 'shared/icons/XIcon'
import { JobViewProps } from 'src/components/pages/job-details/JobView'

type Props = {
  modalProps: { show: boolean; jobId: number | null }
  setModalProps: Dispatch<
    React.SetStateAction<{ show: boolean; jobId: number | null }>
  >
  setJobViewInfo: Dispatch<React.SetStateAction<JobViewProps | null>>
  setJobViewOpen: Dispatch<React.SetStateAction<boolean>>
}

const NewJobModal = ({
  modalProps,
  setModalProps,
  setJobViewInfo,
  setJobViewOpen,
}: Props) => {
  if (modalProps.show) {
    //set a 10 second delay to close the modal
    setTimeout(() => {
      setModalProps({ show: false, jobId: null })
      window.localStorage.removeItem('recentlyCreated')
    }, 10000)
  }
  return (
    <motion.div
      style={{
        position: 'fixed',
        // backgroundColor: ' rgba(4, 8, 9, 0.88)',
        // color: 'white',
        display: 'flex',
        border: '1px solid #00a297',
        backgroundColor: 'white',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px',
        gap: '16px',
        isolation: 'isolate',
        right: '36px',
        bottom: '50px',
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
          alignItems: 'center',
        }}
      >
        <span>{t('Your request has been successfully submitted')}</span>
        <IconButton
          onClick={() => {
            setModalProps({ show: false, jobId: null })
            window.localStorage.removeItem('recentlyCreated')
          }}
        >
          <XIcon height="20px" width="20px" />
        </IconButton>
      </div>
      <Button
        variant="primary"
        onClick={() => {
          if (modalProps.jobId) {
            setJobViewInfo({
              jobId: modalProps.jobId,
              activityId: undefined,
              viewMode: 'series',
              enterInEditMode: false,
              canEdit: true,
              canCancel: true,
            })
            setJobViewOpen(true)
          }
        }}
      >
        View Job
      </Button>
    </motion.div>
  )
}

export default NewJobModal
