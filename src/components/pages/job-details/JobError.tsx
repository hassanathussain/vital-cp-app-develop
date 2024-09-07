import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'shared/button'
import { openSupportForm } from '../../navbar/index'
import styled from 'styled-components'
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
const JobError = () => {
  const { t } = useTranslation()
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {' '}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '390px',
          height: 'auto',
          gap: '16px',
        }}
      >
        <TitleSpan>{t('Error loading details')}</TitleSpan>
        <SubTitleSpan>
          {t(
            'We were unable to load the request details. If the problem persists, please contact customer support.',
          )}
        </SubTitleSpan>
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
    </div>
  )
}

export default JobError
