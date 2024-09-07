import React from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyledContainer,
  StyledBar,
  StyledInfoContainer,
  StyledStepLength,
  StyledLabel,
  StyledFlex,
  StyledMainContainer,
} from './progress.styled'

interface ProgressProps {
  stepsLength: number
  currentStep: number
}
const StepTitles = ['Information', 'Location', 'Time']

function ProgressBar(props: ProgressProps) {
  const { t } = useTranslation()
  const bar = Array(props.stepsLength).fill(0)

  const getTitle = useMemo(() => {
    switch (props.currentStep) {
      case 0:
        return t('Information')
      case 1:
        return t('Location')
      case 2:
        return t('Time')
      default:
        return ''
    }
  }, [props.currentStep])

  return (
    <StyledMainContainer>
      <StyledInfoContainer>
        <StyledLabel>{getTitle}</StyledLabel>
        <StyledContainer>
          <div>{props.currentStep + 1}</div>
          <StyledStepLength>/{props.stepsLength}</StyledStepLength>
        </StyledContainer>
      </StyledInfoContainer>
      <StyledFlex>
        {bar.map((el, index) => (
          <StyledBar key={index} isActive={index <= props.currentStep} />
        ))}
      </StyledFlex>
    </StyledMainContainer>
  )
}
export default ProgressBar
