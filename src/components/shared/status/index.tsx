import React from 'react'
import { StatusDiv } from './CustomStatus.styled'
import { t } from 'i18next'

interface StatusProps {
  status: string
}

function getStatusStyleProps(status: string) {
  switch (status) {
    case 'Cancelled':
      return ['#faeded', '#ba1a1a']
    case 'Completed':
      return ['rgba(4, 8, 9, 0.08)', 'rgba(0, 0, 0, 0.84)']
    case 'Confirmed':
      return ['rgba(81, 219, 205, 0.13)', 'rgba(0, 106, 98, 1)']
    case 'In Progress':
      return ['rgba(96, 155, 240, 0.13)', 'rgba(31, 95, 166, 1)']
    case 'Needs Review':
      return ['rgba(253, 186, 74, 0.13)', 'rgba(128, 86, 0, 1)']

    default:
      return ['#9e9e9e', '#ffffff']
  }
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const [backgroundColor, color] = getStatusStyleProps(status)

  return (
    <StatusDiv backgroundColor={backgroundColor} color={color}>
      <div style={{ fontSize: '12px' }}>{t(status)}</div>
    </StatusDiv>
  )
}

export default Status
