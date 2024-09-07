import React from 'react'
import { Dialog } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import Button from '../button'

import { ConfirmModalProps } from 'models/modals'
import { Message, Title } from 'utils/helpers'
import {
  ConfirmWrapper,
  TitleDiv,
  MessageDiv,
  FlexButtons,
} from './modals.styled.js'
import { useTranslation } from 'react-i18next'

function ConfirmModal(props: ConfirmModalProps) {
  const { t } = useTranslation()
  const { type, open, setOpen, cancelId, setCancelId } = props
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    setCancelId(cancelId)
    setOpen(false)
    navigate('/')
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { borderRadius: '10px' } }}
    >
      <ConfirmWrapper>
        <TitleDiv>{Title(type)}</TitleDiv>
        <MessageDiv>{Message(type)}</MessageDiv>
        <FlexButtons>
          <Button
            onClick={handleClose}
            size="sm"
            overrideHeight="44px"
            overrideWidth="160px"
          >
            {t('Cancel')}
          </Button>
          <Button
            variant="warning"
            onClick={handleConfirm}
            size="sm"
            overrideHeight="44px"
            overrideWidth="160px"
          >
            {t('Confirm')}
          </Button>
        </FlexButtons>
      </ConfirmWrapper>
    </Dialog>
  )
}

export default ConfirmModal
