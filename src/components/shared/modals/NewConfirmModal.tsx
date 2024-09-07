import React from 'react'
import { Dialog } from '@mui/material'
import Button from '../button'
import { getTemplate } from 'utils/helpers'
import {
  ConfirmWrapper,
  TitleDiv,
  MessageDiv,
  FlexButtons,
} from './modals.styled.js'
import { useTranslation } from 'react-i18next'
import { viewModes } from 'src/components/pages/job-details/JobView'

interface ICancelModalProps {
  handleConfirm: (e: any) => void
  handleCancel: (e: any) => void
  handleSeries?: (e: any) => void
  showModal: boolean
  type: string
  viewMode?: viewModes
}

function NewConfirmModal(props: ICancelModalProps) {
  const { t } = useTranslation()
  const {
    handleConfirm,
    handleCancel,
    showModal,
    type,
    handleSeries,
    viewMode,
  } = props
  const template = getTemplate(type, viewMode)

  return (
    <Dialog
      onClose={handleCancel}
      open={showModal}
      PaperProps={{ sx: { borderRadius: '10px' } }}
    >
      <ConfirmWrapper>
        <TitleDiv>{t(template.title)}</TitleDiv>
        <MessageDiv>{t(template.description)}</MessageDiv>
        <FlexButtons>
          <Button
            variant="warning"
            onClick={handleConfirm}
            size="sm"
            overrideHeight="44px"
            overrideWidth="160px"
          >
            {t(template.confirmTitle)}
          </Button>
          <Button
            onClick={handleCancel}
            size="sm"
            overrideHeight="44px"
            overrideWidth="160px"
          >
            {t(template.cancelTitle)}
          </Button>
        </FlexButtons>
        {handleSeries && (
          <Button
            variant="clear"
            onClick={handleSeries}
            size="md"
            overrideHeight="44px"
            overrideWidth="351px"
          >
            {t('Cancel entire series')}
          </Button>
        )}
      </ConfirmWrapper>
    </Dialog>
  )
}

export default NewConfirmModal
