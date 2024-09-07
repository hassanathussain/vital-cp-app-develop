import styled from 'styled-components'

export const StyledTextarea = styled.textarea<{
  ThemeContext?: any
  rows?: number
  error?: boolean
  fontSize?: string
  width?: string
  height?: string
}>`
background: 'white';
  padding: 7px 10px;
  color: '#8d8d8d',
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Inter';
  border ${({ error, ThemeContext }) =>
    ThemeContext
      ? `1px solid ${!error ? '#d9d9d9' : ThemeContext?.colors.red}`
      : 'hidden'};
  
  rows: ${({ rows }) => (rows ? rows : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'auto')};
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  resize: none;
  :focus-visible {
    outline-width: 0px;
    border: ${({ ThemeContext, error }) =>
      ThemeContext?.colors?.brandPrimary
        ? `1px solid ${
            !error ? ThemeContext.colors.brandPrimary : ThemeContext?.colors.red
          }`
        : 'hidden'};
  }
`
