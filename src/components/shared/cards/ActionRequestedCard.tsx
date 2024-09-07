import * as React from 'react'
import styled from 'styled-components'

import Button from '../button'
import InfoIcon from '../icons/InfoIcon'
import { openSupportForm } from '../../navbar/index'

export const ActionCard = styled.div`
  background: #ffffff;
    padding: 25px;
    color: '#8d8d8d',
    cursor: pointer;
    border-radius: 5px;
    font-family: 'Inter';
    border: 1px solid #e9e9e9;
    width: 92%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #f5f5f5;
    .material-symbols-outlined {
      height: 10px;
      align-content: center;
      font-size: 20px;
    }
  `

function ActionRequestedCard(props: any) {
  const { cancelCallback } = props
  return (
    <ActionCard>
      <div
        style={{
          fontWeight: 700,
          fontSize: '19px',
          lineHeight: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <InfoIcon width="24" height="24" /> Action Requested
      </div>
      <p
        style={{
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 400,
        }}
      >
        We are having trouble finding a service provider in your immediate area.
        Please choose from the options below to help fufill your request.
        Depending on your choice additional fees may apply.
      </p>
      <hr
        style={{
          width: '100%',
        }}
      />
      <div>
        <div
          style={{
            margin: '15px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '18px',
          }}
        >
          Contact Support
          <Button
            variant="primary"
            onClick={openSupportForm}
            size="mdwide"
            fontSize="14px"
          >
            <span style={{ fontWeight: 600 }}>Contact Support</span>
          </Button>
        </div>
        <div
          style={{
            margin: '15px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '18px',
          }}
        >
          Cancel
          <Button
            variant="warning"
            onClick={cancelCallback}
            size="mdwide"
            fontSize="14px"
          >
            <span style={{ fontWeight: 600 }}>Cancel Service Request</span>
          </Button>
        </div>
      </div>
    </ActionCard>
  )
}

export default ActionRequestedCard
