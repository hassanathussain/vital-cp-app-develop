import styled from 'styled-components'

export const StyledInput = styled.input<{
  ThemeContext?: any
  width?: string
  height?: string
  backgroundColor?: string
  borderColor?: string
  focusedBorderColor?: string
  fontSize?: string
  error?: boolean
  padding?: string
}>`
background: ${({ backgroundColor }) =>
  backgroundColor ? backgroundColor : 'white'};
  
  padding:  ${({ padding }) => (padding ? padding : '7px 10px;')};
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
  border-radius: 8px;
  font-family: 'Inter';
  border ${({ borderColor, error, ThemeContext }) =>
    borderColor && borderColor !== 'hidden'
      ? `1px solid ${!error ? borderColor : ThemeContext?.colors.red}`
      : 'hidden'};
  caret-color:${({ ThemeContext }) =>
    ThemeContext?.colors?.brandPrimary
      ? ThemeContext.colors.brandPrimary
      : 'black'};
 
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'auto')};
  color: ${({ disabled }) => (disabled ? '#00000061' : 'black')};
  :focus-visible {
    outline-width: 0px;
    border: ${({ ThemeContext, error, borderColor }) =>
      ThemeContext?.colors?.brandPrimary && borderColor !== 'hidden'
        ? `1px solid ${
            !error ? ThemeContext.colors.brandPrimary : ThemeContext?.colors.red
          }`
        : 'hidden'};
  }


`
