import React from 'react'
import Button from 'shared/button'
import { openSupportForm } from '../../navbar'
import styled from 'styled-components'
import NoPermissions from 'shared/permissions/NoPermissions'
import { t } from 'i18next'
const TitleSpan = styled.span`
  height: 32px;

  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`
const SubTitleSpan = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  color: rgba(0, 0, 0, 0.6);

  flex: none;
  align-self: stretch;
  flex-grow: 0;
`
const UserSettingsError = (props: { statusCode: number }) => {
  return (
    <div
      style={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {props.statusCode === 403 ? (
        <NoPermissions />
      ) : (
        <>
          <TitleSpan>Error loading user settings</TitleSpan>
          <SubTitleSpan>
            We were unable to load your user details. If the problem persists,
            please contact customer support.
          </SubTitleSpan>
        </>
      )}
      <Button
        variant="grey"
        fontSize="16px"
        size="lg"
        overrideWidth="390px"
        overrideHeight="44px"
        onClick={openSupportForm}
      >
        <span>{t('Contact Support')}</span>
      </Button>
    </div>
  )
}

export default UserSettingsError
