import Button from 'shared/button'
import InfoIcon from 'shared/icons/InfoIcon'
import React from 'react'
import {
  ActionCard,
  IconFont,
  DescriptiveParagraph,
  WidthHr,
  ActionWrapper,
} from './actionRequested.styled'
import { openSupportForm } from '../../../navbar/index'

function ActionRequestedCard({ handleCancel }) {
  return (
    <ActionCard>
      <IconFont>
        <InfoIcon width="24" height="24" /> Action Requested
      </IconFont>
      <DescriptiveParagraph>
        We are having trouble finding a service provider in your immediate area.
        Please choose from the options below to help fufil your request.
        Depending on your choice additional fees may apply
      </DescriptiveParagraph>
      <WidthHr />
      <div>
        <ActionWrapper>
          Contact Support
          <Button
            variant="primary"
            onClick={openSupportForm}
            size="mdwide"
            fontSize="14px"
          >
            Contact Support
          </Button>
        </ActionWrapper>

        <ActionWrapper>
          Cancel
          <Button
            variant="warning"
            onClick={handleCancel}
            size="mdwide"
            fontSize="14px"
          >
            Cancel Service Request
          </Button>
        </ActionWrapper>
      </div>
    </ActionCard>
  )
}

export default ActionRequestedCard
