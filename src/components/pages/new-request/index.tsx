import React, { useContext, useMemo, useState } from 'react'

import {
  StyledBackContainer,
  StyledBackWrapper,
  StyledSpan,
} from '../user-settings/userSettings.styled'

import Step3 from './step3/Step3'
import Step2 from './step2/Step2'
import Step1 from './step1/Step1'
import ProgressBar from '../../shared/progress-bar/ProgressBar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import {
  AbsoluteFullPage,
  StyledFont,
  StyledStepInfo,
  StyledSubtitle,
  StyledTop,
} from './newRequest.styled'
import Button from 'shared/button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import { NewRequestStepsContext } from 'context/newRequestSteps'
import Footer from '../../footer/Footer'
import Navbar from '../../navbar'

function NewRequest() {
  const { t } = useTranslation()
  const { currentStep } = useContext(NewRequestStepsContext)

  function handleBackButton() {
    history.back()
  }

  const currentStepContent = useMemo(() => {
    if (currentStep === 1) {
      return <Step2 />
    }
    if (currentStep === 0) {
      return <Step1 />
    }
    if (currentStep === 2) {
      return <Step3 />
    }
    return null
  }, [currentStep])

  return (
    <AbsoluteFullPage>
      <Navbar />
      <StyledBackContainer>
        <Button onClick={handleBackButton} variant="back">
          <StyledBackWrapper>
            {' '}
            <ArrowBackIcon fontSize="small" />
            <StyledSpan>{t('Back')}</StyledSpan>
          </StyledBackWrapper>
        </Button>
      </StyledBackContainer>
      <Container>
        <StyledStepInfo>
          <StyledTop>
            <StyledFont>{t('New Request')}</StyledFont>
            <StyledSubtitle>
              {t('Complete these three simple steps')}
            </StyledSubtitle>
          </StyledTop>

          <ProgressBar currentStep={currentStep} stepsLength={3} />
        </StyledStepInfo>
        <Divider style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }} />
        <>{currentStepContent}</>
      </Container>
      <div style={{ paddingTop: '100px' }}>
        <Footer />
      </div>
    </AbsoluteFullPage>
  )
}

export default NewRequest
