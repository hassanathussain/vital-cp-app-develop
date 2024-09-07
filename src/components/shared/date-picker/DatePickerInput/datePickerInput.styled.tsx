import styled from 'styled-components'

export const PickerDiv = styled.div<{
  expanded: boolean
  offset?: string
}>`
  position: absolute;

  display: ${({ expanded }) => (expanded ? 'initial' : 'none')};
  background: #fff;
  margin-top: ${({ offset }) => (offset ? offset : '6px')};
  width: fit-content;
  border: none;
  box-shadow: 0 0 10px #d9d9d9;
  border-radius: 4px;
  padding: 5px;
  cursur: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 1000;
  &label {
    display: initial;
  }
`
export const PlaceHolderDiv = styled.div<{
  expanded: boolean
  width?: string
  height?: string
  themeContext?: any
  error?: boolean
}>`
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  outline: none;
  border: ${({ themeContext, expanded, error }) =>
    themeContext?.colors?.brandPrimary && expanded
      ? `1px solid ${
          !error
            ? themeContext?.colors?.brandPrimary
            : themeContext?.colors?.red
        }`
      : `1px solid ${!error ? '#d9d9d9' : themeContext?.colors?.red}`};
  color: black;
  cursor: pointer;
  border-radius: 8px;
  background: white;
  fontweight: bold;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 16px;

  .material-symbols-outlined {
    font-size: 14px;
  }
`
