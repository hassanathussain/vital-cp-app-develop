import styled from 'styled-components'

export const StyledButton = styled.button<{
  color: string
  border?: string
  margin?: string
  backgroundColor?: string
  hovorColor?: string
  width?: string
  height?: string
  fontSize?: string
  padding?: string
  disabled?: boolean
}>`
  padding: ${({ padding }) => (padding ? padding : '12px 32px')};
  gap: 8px;
  outline: none;
  color: ${({ color, disabled }) =>
    color ? (disabled ? '#dbdbdb' : color) : 'black'};
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Inter';
  border: ${({ border }) => (border ? border : 'none')};
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'white'};
  margin: ${({ margin }) => (margin ? margin : 0)};
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'auto')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  &:hover {
    background: ${({ hovorColor, disabled }) =>
      hovorColor ? (disabled ? '' : hovorColor) : '#28bfb2'};
  }
  .material-symbols-outlined {
    align-content: center;
  }
`
