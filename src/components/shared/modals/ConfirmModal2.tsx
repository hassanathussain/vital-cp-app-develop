import { Dialog } from '@mui/material'

import Button from '../button'

import { ConfirmModalProps2 } from 'models/modals'
import {
  ConfirmWrapper,
  TitleDiv,
  MessageDiv,
  FlexButtons,
} from './modals.styled.js'
import { useTranslation } from 'react-i18next'

function ConfirmModal2(props: ConfirmModalProps2) {
  const { t } = useTranslation()
  const { open, setOpen, title, message, handleConfirmation } = props

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    handleConfirmation()
    setOpen(false)
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { borderRadius: '10px' } }}
    >
      <ConfirmWrapper>
        <TitleDiv>{t(title)}</TitleDiv>
        <MessageDiv>{t(message)}</MessageDiv>
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

export default ConfirmModal2
