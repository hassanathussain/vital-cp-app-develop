import { t } from 'i18next'
import React from 'react'
import styled from 'styled-components'
type Props = {}

const TitleSpan = styled.span`
  height: 38px;

  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
`
const SubTitleSpan = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 24px;
  text-align: center;

  color: rgba(0, 0, 0, 0.6);

  flex: none;
  align-self: stretch;
  flex-grow: 0;
`
const NoPermissions = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '490px',
        height: 'auto',
        gap: '16px',
      }}
    >
      <TitleSpan>{t('No Permissions')}</TitleSpan>

      <SubTitleSpan>
        {t('You do not have the required permissions to view this content.')}
      </SubTitleSpan>
    </div>
  )
}

export default NoPermissions
