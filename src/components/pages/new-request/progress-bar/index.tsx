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

function ProgressBar(props: ProgressProps) {
  const bar = Array(props.stepsLength).fill(0)

  return (
    <StyledMainContainer>
      <StyledInfoContainer>
        <StyledLabel>Information</StyledLabel>
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
