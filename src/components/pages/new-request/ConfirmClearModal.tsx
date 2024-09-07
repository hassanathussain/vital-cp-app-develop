import Button from 'shared/button'
import React, { Dispatch, SetStateAction } from 'react'
import { Dialog } from '@mui/material'
import {
  ConfirmWrapper,
  FlexButtons,
  MessageDiv,
  TitleDiv,
} from 'shared/modals/modals.styled'
import { t } from 'i18next'
interface IConfirmClearModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  callback: any
}

const ConfirmClearModal = (props: IConfirmClearModalProps) => {
  const { open, setOpen, callback } = props

  const handleClear = () => {
    callback()
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { borderRadius: '10px' } }}
    >
      <ConfirmWrapper>
        <TitleDiv>{t('Clear Form?')}</TitleDiv>
        <MessageDiv>
          {t(
            'Are you sure you want to clear this form? This action cannot be undone',
          )}
        </MessageDiv>
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
            onClick={handleClear}
            size="sm"
            overrideHeight="44px"
            overrideWidth="160px"
          >
            {t('Clear')}
          </Button>
        </FlexButtons>
      </ConfirmWrapper>
    </Dialog>
  )
}

export default ConfirmClearModal
