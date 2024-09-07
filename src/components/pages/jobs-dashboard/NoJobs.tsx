import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'shared/button'

import FolderImg from 'assets/images/folder.svg'
import { Link } from 'react-router-dom'
import AddIcon from 'shared/icons/AddIcon'
import styled from 'styled-components'
import Footer from '../../footer/Footer'
import { AbsoluteFullPageWrapper } from '../new-request/newRequest.styled'

const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: rgba(0, 0, 0, 0.87);
`
const SubTitleSpan = styled.span`
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: rgba(0, 0, 0, 0.6);
`

const NoJobs = () => {
  const { t } = useTranslation()
  return (
    <AbsoluteFullPageWrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '83vh',
          gap: '16px',
        }}
      >
        <img src={FolderImg} alt="404 plug" />
        <TitleSpan>{t('You have no requests')}</TitleSpan>
        <SubTitleSpan>
          {t(`After submitting requests, you'll find them here`)}
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
      </div>
      <div style={{ paddingTop: '100px' }}>
        <Footer />
      </div>
    </AbsoluteFullPageWrapper>
  )
}

export default NoJobs
