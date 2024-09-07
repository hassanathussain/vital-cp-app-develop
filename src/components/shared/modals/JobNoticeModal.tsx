import React from 'react'
import {
  FlexColButtons,
  Modal,
  // ModalBody,
  ModalContent,
  ModalHeader,
  //Other,
  XIconAlign,
} from './modals.styled'
import Button from 'shared/button'
import { useTranslation } from 'react-i18next'
import {
  JobViewProps,
  viewModes,
} from 'src/components/pages/job-details/JobView'
import Divider from '@mui/material/Divider'
import XIcon from 'shared/icons/XIcon'

import IconButton from '@mui/material/IconButton'
import ModalCard from '../cards/ModalCard'
import { ModalContainer } from './helper.styled'
import { Dispatch, Key, SetStateAction } from 'react'
import { IActivity } from 'src/components/pages/jobs-dashboard/delete-hook'

interface ICancelModalProps {
  handleConfirm: (e: any) => void
  handleCancel: (e: any) => void
  showModal: boolean
  setJobViewOpen: Dispatch<SetStateAction<boolean>> | undefined
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
  data: IActivity[] | null
}

function JobNoticeModal(props: ICancelModalProps) {
  const { t } = useTranslation()
  const {
    handleConfirm,
    handleCancel,
    showModal,
    setJobViewInfo,
    setJobViewOpen,
    data,
  } = props

  return (
    <>
      {showModal ? (
        <Modal>
          <ModalContent>
            <ModalHeader>
              Job Notice
              <XIconAlign>
                <IconButton onClick={handleCancel} aria-label="close">
                  <XIcon width="20px" height="20px" />
                </IconButton>
              </XIconAlign>
            </ModalHeader>
            <Divider style={{ marginTop: '1.3rem', marginBottom: '1rem' }} />
            <ModalContainer $isMultiple={data ? data.length > 1 : false}>
              {data?.map((item: IActivity) => (
                <ModalCard
                  setIsOpen={setJobViewOpen}
                  setJobViewInfo={setJobViewInfo}
                  key={item.jobActivityId}
                  activityId={item.jobActivityId}
                  jobId={item.jobId}
                  date={item.activityStartDate}
                  requestedTitle={item.requestTitle}
                  errMsj={
                    item.hasProviders
                      ? item.hasProvidersMessage
                      : item.invalidHoursMesage
                  }
                  handleClose={handleCancel}
                />
              ))}
            </ModalContainer>
            <FlexColButtons>
              <Button variant="primary" onClick={handleConfirm} size="xl">
                Got it
              </Button>
              <Button
                variant="transparentClear"
                onClick={handleCancel}
                size="xl"
              >
                {t('Contact Support')}
              </Button>
            </FlexColButtons>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  )
}

export default JobNoticeModal
