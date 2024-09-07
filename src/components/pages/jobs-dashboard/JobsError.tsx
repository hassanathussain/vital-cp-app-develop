import React from 'react'
import Button from 'shared/button'

import { Link } from 'react-router-dom'
import AddIcon from 'shared/icons/AddIcon'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Footer from '../../footer/Footer'
import { AbsoluteFullPageWrapper } from '../new-request/newRequest.styled'
import { openSupportForm } from '../../navbar'
import NoPermissions from 'shared/permissions/NoPermissions'

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

const JobsError = (props: { statusCode: number }) => {
  const { t } = useTranslation()
  return (
    <AbsoluteFullPageWrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '90vh',
        }}
      >
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
          {props.statusCode === 403 ? (
            <>
              <NoPermissions />
            </>
          ) : (
            <>
              <TitleSpan>{t('Error loading requests')}</TitleSpan>

              <SubTitleSpan>
                {t(
                  'We were unable to load the requests. If the problem persists, please contact customer support.',
                )}
              </SubTitleSpan>
              <Link to={'add-new-request'} style={{ textDecoration: 'none' }}>
                <Button
                  variant="primary"
                  fontSize="16px"
                  size="lg"
                  overrideHover="#00a297"
                  overrideWidth="532px"
                >
                  <AddIcon />
                  <span>{t('Create New Request')}</span>
                </Button>
              </Link>
            </>
          )}

          <Button
            variant="grey"
            fontSize="16px"
            size="lg"
            overrideWidth="532px"
            onClick={openSupportForm}
          >
            <span>{t('Contact Support')}</span>
          </Button>
        </div>
      </div>
      <div style={{ paddingTop: '100px' }}>
        <Footer />
      </div>
    </AbsoluteFullPageWrapper>
  )
}

export default JobsError
