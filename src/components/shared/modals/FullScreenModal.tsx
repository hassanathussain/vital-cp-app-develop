import * as React from 'react'
import { Dialog, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import BackIcon from '../icons/BackIcon'

function FullScreenModal(props: any) {
  const { isOpen } = props
  const navigate = useNavigate()

  function handleClose() {
    navigate(-1)
  }

  return (
    <Dialog fullScreen onClose={handleClose} open={isOpen}>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
      >
        <BackIcon />
        Back
      </IconButton>
    </Dialog>
  )
}

export default FullScreenModal
